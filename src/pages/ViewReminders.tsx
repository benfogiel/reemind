import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonRefresher,
  IonButton,
  IonRefresherContent,
  useIonViewWillEnter,
  useIonRouter,
} from '@ionic/react';
import './ViewReminders.css';
import '../theme/global.css';

import { Category } from '../data/categories';
import { Reminder } from '../data/categories';
import AddReminder from '../components/AddReminder';
import { ReminderList } from '../components/ReminderList';

interface ViewRemindersProps {
  categories: Category[];
}

const ViewReminders: React.FC<ViewRemindersProps> = ({ categories }) => {
  const router = useIonRouter();

  const [pastNotifiedReminders, setPastNotifiedReminders] = useState<Reminder[]>([
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
  ]);

  useIonViewWillEnter(() => {});

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  const addReminder = (reminder: Reminder) => {
    if (reminder.quote && reminder.category) {
      // TODO: Add reminder to database
    }
  };

  const deleteReminder = (reminder: Reminder) => {
    // TODO: Delete reminder from database
  };

  return (
    <IonPage id="reminders-view">
      <IonContent fullscreen className="ion-padding content-container">
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonButton
          className="edit-categories-button"
          onClick={() => router.push('/categories-view')}
        >
          Edit Categories
        </IonButton>

        <AddReminder categories={categories} addReminder={addReminder} />

        <ReminderList
          reminders={pastNotifiedReminders}
          setReminders={setPastNotifiedReminders}
        />
      </IonContent>
    </IonPage>
  );
};

export default ViewReminders;
