import './pages.css';
import '../theme/global.css';

import React, { useState } from 'react';
import { CategoryCheckboxItem } from '../components/CategoryItem';
import { Category, getCategories } from '../data/categories';
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

interface ViewCategoriesProps {
  selectedCategories: Category[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const ViewCategories: React.FC<ViewCategoriesProps> = ({
  selectedCategories,
  setSelectedCategories,
}) => {
  const router = useIonRouter();

  const [categories, setCategories] = useState<Category[]>([]);

  useIonViewWillEnter(() => {
    const categories = getCategories();
    setCategories(categories);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  const onCategorySelect = (c: Category) => {
    if (selectedCategories.includes(c)) {
      setSelectedCategories((prev) => prev.filter((category) => category !== c));
    } else {
      setSelectedCategories((prev) => [...prev, c]);
    }
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
            <IonItem key={c.name}>
              <CategoryCheckboxItem
                category={c}
                selected={selectedCategories.includes(c)}
                onSelect={() => onCategorySelect(c)}
              />
            </IonItem>
          ))}
        </IonList>

        <IonButton
          className="bottom-button"
          color="dark"
          expand="block"
          onClick={() => router.push('/reminders-view')}
        >
          Save
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ViewCategories;
