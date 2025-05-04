import './AddReminder.css';

import React, { useState, FC, useRef } from 'react';
import {
  IonTextarea,
  IonIcon,
  IonModal,
  IonButton,
  IonList,
  IonItem,
  IonBadge,
  IonToast,
} from '@ionic/react';

import { Category, Reminder } from '../data/categories';
import { list } from 'ionicons/icons';
import { CategoryRadioItem } from './CategoryItem';

interface AddReminderProps {
  categories: Category[];
  addReminder: (reminder: Reminder) => void;
}

export const AddReminder: FC<AddReminderProps> = ({ categories, addReminder }) => {
  const selectCategoryModal = useRef<HTMLIonModalElement>(null);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [quote, setQuote] = useState<string>('');
  const [showReminderAddedToast, setShowReminderAddedToast] = useState(false);

  const onCategorySelect = (c: Category) => {
    setSelectedCategory(c);
    selectCategoryModal.current?.dismiss();
  };

  const handleAddReminder = () => {
    if (quote && selectedCategory) {
      addReminder({ quote, category: selectedCategory.name });
      setQuote('');
      setSelectedCategory(null);
      setShowReminderAddedToast(true);
    } else if (quote && !selectedCategory) {
      selectCategoryModal.current?.present();
    }
  };

  return (
    <div id="add-reminder-container">
      <div
        id="add-reminder-header"
        onClick={() => selectCategoryModal.current?.present()}
      >
        {selectedCategory ? (
          <IonBadge color="primary">{selectedCategory.name}</IonBadge>
        ) : (
          <IonIcon icon={list} id="open-select-category-modal" />
        )}
      </div>
      <IonTextarea
        label="Add your reminder"
        labelPlacement="floating"
        value={quote}
        onIonChange={(e) => setQuote(e.detail.value || '')}
        autoGrow={true}
        rows={4}
      ></IonTextarea>

      <IonButton color="dark" size="small" onClick={handleAddReminder}>
        Add
      </IonButton>
      <IonModal
        ref={selectCategoryModal}
        trigger="open-select-category-modal"
        initialBreakpoint={1}
        breakpoints={[0, 1]}
      >
        <div className="modal-content">
          <IonList lines="inset">
            {categories.map((c) => (
              <IonItem key={c.name}>
                <CategoryRadioItem
                  category={c}
                  selected={selectedCategory === c}
                  onSelect={() => onCategorySelect(c)}
                />
              </IonItem>
            ))}
          </IonList>
        </div>
      </IonModal>
      <IonToast
        isOpen={showReminderAddedToast}
        onDidDismiss={() => setShowReminderAddedToast(false)}
        message="Reminder added!"
        duration={1000}
        position="top"
      />
    </div>
  );
};

export default AddReminder;
