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
} from '@ionic/react';

import { CategoryCheckboxItem } from '../components/CategoryItem';
import {
  getCategories,
  getUserSelectedCategories,
  setUserSelectedCategories,
} from '../services/preferences';

const ViewCategories: React.FC = () => {
  const router = useIonRouter();

  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useIonViewWillEnter(() => {
    const loadUserSelectedCategories = async () => {
      const userSelectedCategories = await getUserSelectedCategories();
      setSelectedCategories(userSelectedCategories);
    };

    const loadCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };

    loadUserSelectedCategories();
    loadCategories();
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  const onCategorySelect = (c: string) => {
    if (selectedCategories.includes(c)) {
      setSelectedCategories((prev) => prev.filter((category) => category !== c));
    } else {
      setSelectedCategories((prev) => [...prev, c]);
    }
  };

  const onSave = () => {
    setUserSelectedCategories(selectedCategories);
    router.push('/reminders-view');
  };

  return (
    <IonPage id="categories-view">
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <div className="page-header">Choose Your Inspiration</div>

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

        <IonButton className="bottom-button" color="dark" expand="block" onClick={onSave}>
          Save
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ViewCategories;
