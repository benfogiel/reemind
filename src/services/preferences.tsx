import { Preferences } from '@capacitor/preferences';
import { Reminder, isEqual } from '../data/reminders';

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
