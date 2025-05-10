import { LocalNotifications } from '@capacitor/local-notifications';
import {
  getReminders,
  getUserSelectedCategories,
  getRecentReminders,
  setScheduledReminders,
  getScheduledReminders,
  addRecentReminder,
} from './preferences';
import { Reminder } from '../data/reminders';

export interface ScheduledReminder {
  notificationId: number;
  reminder: Reminder;
  date: Date;
}

export const requestNotificationPermissions = async () => {
  const { display } = await LocalNotifications.requestPermissions();
  if (display !== 'granted') {
    console.warn('Notification permissions denied');
    return false;
  }
  return true;
};

export const rescheduleReminders = async (quantity: number = 30) => {
  const now = new Date();
  const startDate = now;

  // Get previously scheduled reminders that have already been sent
  // and add to the past reminders list
  const previouslyScheduledReminders = await getScheduledReminders();
  for (const scheduledReminder of previouslyScheduledReminders) {
    if (scheduledReminder.date < now) {
      addRecentReminder(scheduledReminder.reminder);
    }
    // if a reminder has already been sent today, start scheduling tomorrow
    if (
      getDaysSinceEpoch(scheduledReminder.date) === getDaysSinceEpoch(now) &&
      scheduledReminder.date < now
    ) {
      startDate.setDate(startDate.getDate() + 1);
    }
  }

  // Replace all scheduled reminders with new ones
  await cancelAllScheduledNotifications();
  const scheduledReminders = [];
  const date = startDate;
  for (let i = 0; i < quantity; i++) {
    const scheduledReminder = await scheduleReminder(getRandomFutureTime(date));
    if (scheduledReminder) {
      scheduledReminders.push(scheduledReminder);
    }
    date.setDate(date.getDate() + 1);
  }

  await setScheduledReminders(scheduledReminders);
};

export const cancelAllScheduledNotifications = async () => {
  const pendingNotifications = await LocalNotifications.getPending();
  if (pendingNotifications.notifications.length > 0) {
    await LocalNotifications.cancel(pendingNotifications);
  }
};

export const scheduleReminder = async (
  date?: Date
): Promise<ScheduledReminder | null> => {
  // don't schedule a reminder if it's already scheduled
  const pendingNotifications = await LocalNotifications.getPending();
  const pendingReminderIds = pendingNotifications.notifications.map(
    (n) => n.extra?.reminderId
  );
  // don't schedule a reminder if it's a recently sent reminder
  const pastReminders = await getRecentReminders();
  const pastReminderIds = pastReminders.map((r) => r.id);

  const excludeIds = pendingReminderIds.concat(pastReminderIds);
  const reminder = await getRandomReminder(excludeIds);
  if (!reminder) {
    console.warn('No reminders available');
    return null;
  }

  const reminderTime = date || new Date(new Date().getTime() + 100);
  if (!reminderTime) {
    console.warn('invalid reminder time: ', reminderTime);
    return null;
  }

  const notificationId = Date.now() * 1000 + Math.floor(Math.random() * 1000);
  await LocalNotifications.schedule({
    notifications: [
      {
        title: 'Reemind',
        body: reminder.quote,
        id: notificationId,
        schedule: {
          at: reminderTime,
          repeats: false,
        },
        sound: undefined,
        attachments: undefined,
        actionTypeId: '',
        extra: {
          reminderId: reminder.id,
        },
      },
    ],
  });

  return { notificationId, reminder, date: reminderTime };
};

const getDaysSinceEpoch = (date: Date): number => {
  return Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
};

const getRandomFutureTime = (date: Date = new Date()) => {
  const now = new Date();
  const nowDays = getDaysSinceEpoch(now);
  const dateDays = getDaysSinceEpoch(date);

  let startHour = parseInt(import.meta.env.REACT_APP_NOTIFICATION_START_HOUR || '8');
  const endHour = parseInt(import.meta.env.REACT_APP_NOTIFICATION_END_HOUR || '17');
  if (nowDays > dateDays) {
    return;
  } else if (nowDays === dateDays) {
    startHour = now.getHours();
    if (startHour > endHour) {
      return;
    }
  }

  const randomHour = Math.floor(Math.random() * (endHour - startHour)) + startHour;
  const randomMinute = Math.floor(Math.random() * 60);
  const randomTime = new Date(date);
  randomTime.setHours(randomHour, randomMinute, 0, 0);

  return randomTime;
};

// Select random reminder
const getRandomReminder = async (excludeIds: string[] = []) => {
  let reminders = await getReminders();
  const userSelectedCategories = await getUserSelectedCategories();
  reminders = reminders.filter(
    (reminder) =>
      userSelectedCategories.includes(reminder.category) &&
      !excludeIds.includes(reminder.id)
  );
  if (reminders.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * reminders.length);
  return reminders[randomIndex];
};
