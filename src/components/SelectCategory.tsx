import React, { useState, FC } from 'react';
import {
  IonButtons,
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonList,
} from '@ionic/react';

import { Category } from '../data/categories';
import { CategoryRadioItem } from './CategoryItem';
interface SelectCategoryProps {
  categories: Category[];
  onDismiss: () => void;
  onConfirm: (category: Category) => void;
}

export const SelectCategory: FC<SelectCategoryProps> = ({
  categories,
  onDismiss,
  onConfirm,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  return (
    <IonContent className="ion-padding">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => onDismiss()}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Select Category</IonTitle>
          <IonButtons slot="end">
            <IonButton
              strong={true}
              disabled={!selectedCategory}
              onClick={() => selectedCategory && onConfirm(selectedCategory)}
            >
              Confirm
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList className="category-list">
          {categories.map((c) => (
            <CategoryRadioItem
              key={c.name}
              category={c}
              selected={selectedCategory === c}
              onSelect={() => setSelectedCategory(c)}
            />
          ))}
        </IonList>
      </IonContent>
    </IonContent>
  );
};

export default SelectCategory;
