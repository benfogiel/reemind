import './pages.css';
import '../theme/global.css';

import React, { useState } from 'react';
import {
  IonContent,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  useIonViewWillEnter,
  IonButton,
  useIonRouter,
  IonItem,
  IonHeader,
  IonFooter,
} from '@ionic/react';

import { CategoryCheckboxItem } from '../components/CategoryItem';
import {
  getCategories,
  getUserSelectedCategories,
  setUserSelectedCategories,
  firstReminderSent,
} from '../services/preferences';
import { rescheduleReminders } from '../services/notifications';

const ViewCategories: React.FC = () => {
  const router = useIonRouter();

  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const loadUserSelectedCategories = async () => {
    const userSelectedCategories = await getUserSelectedCategories();
    setSelectedCategories(userSelectedCategories);
  };

  const loadCategories = async () => {
    const categories = await getCategories();
    setCategories(categories);
  };

  useIonViewWillEnter(() => {
    loadUserSelectedCategories();
    loadCategories();
  });

  const refresh = async (e: CustomEvent) => {
    await loadUserSelectedCategories();
    await loadCategories();
    e.detail.complete();
  };

  const onCategorySelect = (c: string) => {
    if (selectedCategories.includes(c)) {
      setSelectedCategories((prev) => prev.filter((category) => category !== c));
    } else {
      setSelectedCategories((prev) => [...prev, c]);
    }
  };

  const onSave = async () => {
    const sentFirstReminder = await firstReminderSent();
    if (sentFirstReminder) {
      rescheduleReminders();
    }

    setUserSelectedCategories(selectedCategories);
    router.push('/reminders-view');
  };

  return (
    <IonPage id="categories-view">
      <IonHeader translucent>
        <div className="page-header">Choose Your Inspiration</div>
      </IonHeader>

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonList lines="inset">
          {categories.map((c) => (
            <IonItem key={c}>
              <CategoryCheckboxItem
                category={c}
                selected={selectedCategories.includes(c)}
                onSelect={() => onCategorySelect(c)}
              />
            </IonItem>
          ))}
        </IonList>
      </IonContent>

      <IonFooter className="page-footer">
        <IonButton
          className="bottom-button"
          color="dark"
          expand="block"
          onClick={onSave}
          disabled={selectedCategories.length === 0}
        >
          Save
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default ViewCategories;
