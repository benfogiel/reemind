import { Category } from '../data/categories';
import CategoryItem from '../components/CategoryItem';
import { Reminder } from '../data/categories';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonRefresher,
  IonButton,
  IonTextarea,
  IonRefresherContent,
  useIonViewWillEnter,
  useIonRouter,
  IonItem,
  IonRadio,
  IonRadioGroup,
  IonIcon,
  IonList,
  IonLabel,
  IonAlert,
} from '@ionic/react';
import './ViewReminders.css';
import '../theme/global.css';
import { useState } from 'react';
import { send, close } from 'ionicons/icons';
interface ViewRemindersProps {
  categories: Category[];
}

const ViewReminders: React.FC<ViewRemindersProps> = ({ categories }) => {
  const router = useIonRouter();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [reminderToAdd, setReminderToAdd] = useState<string>("");
  const [reminderToDelete, setReminderToDelete] = useState<Reminder | null>(null);
  const [openDeleteReminderAlert, setOpenDeleteReminderAlert] = useState<boolean>(false);
  const [pastNotifiedReminders, setPastNotifiedReminders] = useState<Reminder[]>([
    {
      quote: "The only way to do great work is to love what you do.",
      category: "Motivational",
    },
    {
      quote: "Believe you can and you're halfway there.",
      category: "Motivational",
    },
    {
      quote: "The future belongs to those who believe in the beauty of their dreams.",
      category: "Motivational",
    },
    {
      quote: "Do what you can, with what you have, where you are.",
      category: "Motivational",
    },
  ]);

  useIonViewWillEnter(() => {
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  const addReminder = () => {
    if (reminderToAdd) {
      // TODO: Add reminder to database
      setReminderToAdd("");
      setSelectedCategory(null);
    }
  };

  const deleteReminder = (reminder: Reminder) => {
    // TODO: Delete reminder from database
  };

  return (
    <IonPage id="reminders-view">
      <IonContent fullscreen className="ion-padding content-container">
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader translucent={true} className="page-header">
          Your Reminders
        </IonHeader>

        <IonButton
          className="edit-categories-button"
          onClick={() => router.push('/categories-view')}
        >
          Edit Categories
        </IonButton>

        <IonItem>
            <IonTextarea
              label="Add your reminder"
              labelPlacement="floating"
              value={reminderToAdd}
              onIonChange={e => setReminderToAdd(e.detail.value || "")}
            >
            </IonTextarea>
        </IonItem>

        <div className="add-reminder-options-container">
          <IonRadioGroup
            value={selectedCategory}
            onIonChange={e => setSelectedCategory(e.detail.value)}
            className="category-selector"
          >
            {categories.map(category => (
              <CategoryItem
                key={category.name} 
                category={category}
                selected={selectedCategory === category.name}
                onSelect={() => setSelectedCategory(category.name)}
                style={{
                  width: '100px',
                  margin: '0px',
                }}
              >
                <IonRadio value={category.name} style={{ display: 'none' }} />
              </CategoryItem>
            ))}
          </IonRadioGroup>

          <IonIcon icon={send} onClick={addReminder} />
        </div>

        <IonList>
          {pastNotifiedReminders.map(reminder => (
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

      </IonContent>

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
            handler: () => {
              if (reminderToDelete) {
                deleteReminder(reminderToDelete);
              }
            }
          },
        ]}
        onDidDismiss={() => {
          setOpenDeleteReminderAlert(false);
        }}
      ></IonAlert>
    </IonPage>
  );
};

export default ViewReminders;
