import React, { useState, FC, useRef } from 'react';
import { IonContent, IonItem, IonTextarea, IonIcon, IonModal } from '@ionic/react';

import { Category, Reminder } from '../data/categories';
import { send } from 'ionicons/icons';
import SelectCategory from './SelectCategory';

interface AddReminderProps {
  categories: Category[];
  addReminder: (reminder: Reminder) => void;
}

export const AddReminder: FC<AddReminderProps> = ({ categories, addReminder }) => {
  const selectCategoryModal = useRef<HTMLIonModalElement>(null);

  const [reminder, setReminder] = useState<Reminder>({
    quote: '',
    category: '',
  });

  const handleAddReminder = () => {
    if (reminder.quote && reminder.category) {
      addReminder(reminder);
      setReminder({ quote: '', category: '' });
    }
  };

  return (
    <>
      <IonContent>
        <IonItem>
          <IonTextarea
            label="Add your reminder"
            labelPlacement="floating"
            value={reminder.quote}
            onIonChange={(e) => setReminder({ ...reminder, quote: e.detail.value || '' })}
          ></IonTextarea>
        </IonItem>

        <IonIcon icon={send} id="open-select-category-modal" />
      </IonContent>
      <IonModal ref={selectCategoryModal} trigger="open-select-category-modal">
        <SelectCategory
          categories={categories}
          onDismiss={() => selectCategoryModal.current?.dismiss()}
          onConfirm={(category) => {
            setReminder({ ...reminder, category: category.name });
            selectCategoryModal.current?.dismiss();
            handleAddReminder();
          }}
        />
      </IonModal>
    </>
  );
};

export default AddReminder;
