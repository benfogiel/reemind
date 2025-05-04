import './ReminderList.css';

import React, { useState } from 'react';
import { IonList, IonItem, IonLabel, IonIcon, IonAlert } from '@ionic/react';
import { close } from 'ionicons/icons';

import { Reminder } from '../data/categories';

interface ReminderListProps {
  reminders: Reminder[];
  setReminders: (reminders: Reminder[]) => void;
}

export const ReminderList: React.FC<ReminderListProps> = ({
  reminders,
  setReminders,
}) => {
  const [reminderToDelete, setReminderToDelete] = useState<Reminder | null>(null);
  const [openDeleteReminderAlert, setOpenDeleteReminderAlert] = useState(false);

  const handleDeleteReminder = () => {
    if (reminderToDelete) {
      setReminders(reminders.filter((r) => r !== reminderToDelete));
    }
  };

  return (
    <div id="reminder-list-container">
      <IonList>
        {reminders.map((reminder) => (
          <IonItem key={reminder.quote}>
            <IonLabel>{reminder.quote}</IonLabel>
            <IonIcon
              icon={close}
              onClick={() => {
                setReminderToDelete(reminder);
                setOpenDeleteReminderAlert(true);
              }}
            />
          </IonItem>
        ))}
      </IonList>

      <IonAlert
        header="Are you sure?"
        message="This will delete the reminder from your list."
        isOpen={openDeleteReminderAlert}
        buttons={[
          {
            text: 'Cancel',
          },
          {
            text: 'Yes',
            handler: () => handleDeleteReminder(),
          },
        ]}
        onDidDismiss={() => {
          setOpenDeleteReminderAlert(false);
        }}
      ></IonAlert>
    </div>
  );
};
