import React from 'react';
import { IonCheckbox, IonRadio } from '@ionic/react';
import { Category } from '../data/categories';
import './CategoryItem.css';

interface CategoryItemProps {
  category: Category;
  selected: boolean;
  onSelect: () => void;
  style?: React.CSSProperties;
}

export const CategoryCheckboxItem: React.FC<CategoryItemProps> = ({
  category,
  selected,
  onSelect,
  style,
}) => {
  return (
    <IonCheckbox
      color={selected ? 'primary' : 'light'}
      onClick={onSelect}
      className="category-item"
      style={style}
    >
      {category.name}
    </IonCheckbox>
  );
};

export const CategoryRadioItem: React.FC<CategoryItemProps> = ({
  category,
  selected,
  onSelect,
  style,
}) => {
  return (
    <IonRadio
      color={selected ? 'primary' : 'light'}
      onClick={onSelect}
      className="category-item"
      style={style}
    >
      {category.name}
    </IonRadio>
  );
};
