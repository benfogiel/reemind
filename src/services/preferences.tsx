import { Preferences } from '@capacitor/preferences';
import { Reminder, isEqual } from '../data/reminders';
import { ScheduledReminder } from './notifications';

export const setFirstName = async (firstName: string) => {
  await Preferences.set({
    key: 'firstName',
    value: firstName,
  });
};

export const getFirstName = async (): Promise<string> => {
  const { value } = await Preferences.get({ key: 'firstName' });
  return value || '';
};

export const setReminders = async (reminders: Reminder[]) => {
  await Preferences.set({
    key: 'reminders',
    value: JSON.stringify(reminders),
  });
};

export const getReminders = async (): Promise<Reminder[]> => {
  const { value } = await Preferences.get({ key: 'reminders' });
  return JSON.parse(value || '[]');
};

export const getReminderById = async (id: string): Promise<Reminder | undefined> => {
  const reminders = await getReminders();
  return reminders.find((r: Reminder) => r.id === id);
};

export const addReminder = async (reminder: Reminder) => {
  const reminders = await getReminders();
  reminders.push(reminder);
  await setReminders(reminders);
};

export const deleteReminder = async (reminder: Reminder) => {
  const reminders = await getReminders();
  const index = reminders.findIndex((r: Reminder) => isEqual(r, reminder));
  if (index !== -1) {
    reminders.splice(index, 1);
    await setReminders(reminders);
  }

  const pastReminders = await getRecentReminders();
  const pastReminderIndex = pastReminders.findIndex((r: Reminder) =>
    isEqual(r, reminder)
  );
  if (pastReminderIndex !== -1) {
    pastReminders.splice(pastReminderIndex, 1);
    await setRecentReminders(pastReminders);
  }
};

export const getCategories = async (): Promise<string[]> => {
  const reminders = await getReminders();
  const categories = [...new Set(reminders.map((r: Reminder) => r.category))];
  return categories;
};

export const setUserSelectedCategories = async (categories: string[]) => {
  await Preferences.set({
    key: 'userSelectedCategories',
    value: JSON.stringify(categories),
  });
};

export const getUserSelectedCategories = async (): Promise<string[]> => {
  const { value } = await Preferences.get({ key: 'userSelectedCategories' });
  return JSON.parse(value || '[]');
};

export const getRecentReminders = async (): Promise<Reminder[]> => {
  const { value } = await Preferences.get({ key: 'pastReminders' });
  return JSON.parse(value || '[]');
};

export const setRecentReminders = async (reminders: Reminder[]) => {
  await Preferences.set({
    key: 'pastReminders',
    value: JSON.stringify(reminders),
  });
};

export const addRecentReminder = async (reminder: Reminder) => {
  const pastReminders = await getRecentReminders();
  pastReminders.push(reminder);
  if (
    pastReminders.length > parseInt(import.meta.env.REACT_APP_MAX_PAST_REMINDERS || '10')
  ) {
    pastReminders.shift();
  }
  await setRecentReminders(pastReminders);
};

export const firstReminderSent = async (): Promise<boolean> => {
  const { value } = await Preferences.get({ key: 'firstReminderSent' });
  return value === 'true';
};

export const setFirstReminderSent = async (sent: boolean) => {
  await Preferences.set({ key: 'firstReminderSent', value: sent.toString() });
};

export const setScheduledReminders = async (reminders: ScheduledReminder[]) => {
  await Preferences.set({
    key: 'scheduledReminders',
    value: JSON.stringify(reminders),
  });
};

export const getScheduledReminders = async (): Promise<ScheduledReminder[]> => {
  const { value } = await Preferences.get({ key: 'scheduledReminders' });
  const scheduledRemindersJson = JSON.parse(value || '[]');
  const scheduledReminders = scheduledRemindersJson.map((r: ScheduledReminder) => ({
    ...r,
    date: new Date(r.date),
  }));
  return scheduledReminders;
};
