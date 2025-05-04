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
  getPastReminders,
} from '../services/preferences';

const ViewReminders: React.FC = () => {
  const router = useIonRouter();

  const [categories, setCategories] = useState<string[]>([]);
  const [firstName, setFirstName] = useState<string>('');
  const [pastReminders, setPastReminders] = useState<Reminder[]>([]);

  useIonViewWillEnter(() => {
    const loadSelectedCategories = async () => {
      const selectedCategories = await getUserSelectedCategories();
      setCategories(selectedCategories);
    };

    const loadFirstName = async () => {
      const firstName = await getFirstName();
      setFirstName(firstName);
    };

    const loadPastReminders = async () => {
      const pastReminders = await getPastReminders();
      setPastReminders(pastReminders);
    };

    loadSelectedCategories();
    loadFirstName();
    loadPastReminders();
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

          <ReminderList reminders={pastReminders} deleteReminder={deleteReminder} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ViewReminders;
