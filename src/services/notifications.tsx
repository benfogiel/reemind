import { LocalNotifications } from '@capacitor/local-notifications';
import {
  getReminders,
  getUserSelectedCategories,
  addPastReminder,
  getReminderById,
} from './preferences';

export const requestNotificationPermissions = async () => {
  const { display } = await LocalNotifications.requestPermissions();
  if (display !== 'granted') {
    console.warn('Notification permissions denied');
    return false;
  }
  return true;
};

// Generate random time between 8 AM and 5 PM
const getRandomTime = () => {
  const now = new Date();
  const startHour = parseInt(process.env.REACT_APP_NOTIFICATION_START_HOUR || '8');
  const endHour = parseInt(process.env.REACT_APP_NOTIFICATION_END_HOUR || '17');
  const randomHour = Math.floor(Math.random() * (endHour - startHour)) + startHour;
  const randomMinute = Math.floor(Math.random() * 60);

  const randomTime = new Date(now);
  randomTime.setHours(randomHour, randomMinute, 0, 0);

  // If the time is in the past, schedule for tomorrow
  if (randomTime < now) {
    randomTime.setDate(now.getDate() + 1);
  }

  return randomTime;
};

// Select random reminder
const getRandomReminder = async () => {
  let reminders = await getReminders();
  const userSelectedCategories = await getUserSelectedCategories();
  reminders = reminders.filter((reminder) =>
    userSelectedCategories.includes(reminder.category)
  );
  if (reminders.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * reminders.length);
  return reminders[randomIndex];
};

export const scheduleDailyReminder = async () => {
  const reminder = await getRandomReminder();
  if (!reminder) {
    console.warn('No reminders available');
    return;
  }

  const randomTime = getRandomTime();

  await LocalNotifications.schedule({
    notifications: [
      {
        title: 'Reemind',
        body: reminder.quote,
        id: Math.floor(Math.random() * 1000000), // Unique ID
        schedule: {
          at: randomTime,
          repeats: false, // We'll reschedule manually
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

  console.log(
    `Scheduled notification for ${randomTime} with reminder: ${reminder.quote}`
  );
};

export const setupNotificationListener = () => {
  LocalNotifications.addListener(
    'localNotificationActionPerformed',
    async (notification) => {
      const extra = notification.notification.extra;

      if (extra?.reminderId) {
        const reminder = await getReminderById(extra.reminderId);
        if (reminder) {
          await addPastReminder(reminder);
        }
      }

      // Reschedule for the next day
      await scheduleDailyReminder();
    }
  );
};
