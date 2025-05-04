import './pages.css';
import '../theme/global.css';

import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  useIonViewWillEnter,
  useIonRouter,
  IonIcon,
  IonText,
} from '@ionic/react';

import { Reminder } from '../data/reminders';
import AddReminder from '../components/AddReminder';
import { ReminderList } from '../components/ReminderList';
import { settingsOutline } from 'ionicons/icons';
import {
  addReminder,
  deleteReminder,
  getFirstName,
  getUserSelectedCategories,
} from '../services/preferences';

const ViewReminders: React.FC = () => {
  const router = useIonRouter();

  const [categories, setCategories] = useState<string[]>([]);
  const [firstName, setFirstName] = useState<string>('');

  // TODO: Get first name and past notified reminders from dynamic source
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

  useIonViewWillEnter(() => {
    const loadSelectedCategories = async () => {
      const selectedCategories = await getUserSelectedCategories();
      setCategories(selectedCategories);
    };

    const loadFirstName = async () => {
      const firstName = await getFirstName();
      console.log('firstName', firstName);
      setFirstName(firstName);
    };

    loadSelectedCategories();
    loadFirstName();
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  const handleAddReminder = (reminder: Reminder) => {
    if (reminder.quote && reminder.category) {
      addReminder(reminder);
    }
  };

  return (
    <IonPage id="reminders-view">
      <IonContent fullscreen className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <div className="page-header view-reminders-header">
          <IonText>
            <p style={{ fontSize: '10px', marginBottom: '0px', marginTop: '0px' }}>
              Welcome Back!
            </p>
            <p style={{ fontSize: '25px', marginTop: '0px' }}>{firstName}</p>
          </IonText>
          <IonIcon
            icon={settingsOutline}
            onClick={() => router.push('/categories-view')}
            style={{ fontSize: '22px' }}
          />
        </div>

        <div className="reminder-container">
          <AddReminder categories={categories} addReminder={handleAddReminder} />

          <IonText>
            <h5>Past Reminders</h5>
          </IonText>

          <ReminderList
            reminders={pastNotifiedReminders}
            deleteReminder={deleteReminder}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ViewReminders;
