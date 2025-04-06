export interface Reminder {
  quote: string;
  category: string;
}

export interface Category {
  name: string;
  reminders: Reminder[];
}

const categories: Category[] = [
  {
    name: 'Motivational',
    reminders: [
      {
        quote: 'The only way to do great work is to love what you do.',
        category: 'Motivational',
      },
      {
        quote: "Believe you can and you're halfway there.",
        category: 'Motivational',
      },
      {
        quote: 'The future belongs to those who believe in the beauty of their dreams.',
        category: 'Motivational',
      },
      {
        quote: 'Do what you can, with what you have, where you are.',
        category: 'Motivational',
      },
    ],
  },
  {
    name: 'Funny',
    reminders: [
      {
        quote: "I'm not lazy. I'm just on my energy saving mode.",
        category: 'Funny',
      },
      {
        quote: "I'm not a hoarder. I'm just saving things for the future.",
        category: 'Funny',
      },
    ],
  },
];

export const getCategories = () => categories;

export const getCategory = (name: string) => categories.find((c) => c.name === name);
