import CategoryItem from '../components/CategoryItem';
import { useState } from 'react';
import { Category, getCategories } from '../data/categories';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  useIonViewWillEnter,
  IonButton,
  useIonRouter,
} from '@ionic/react';
import './ViewCategories.css';
import '../theme/global.css';

interface ViewCategoriesProps {
  selectedCategories: Category[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const ViewCategories: React.FC<ViewCategoriesProps> = ({ selectedCategories, setSelectedCategories }) => {
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
      setSelectedCategories(prev => prev.filter(category => category !== c));
    } else {
      setSelectedCategories(prev => [...prev, c]);
    }
  }

  return (
    <IonPage id="categories-view">
      <IonContent fullscreen className="ion-padding content-container">
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader translucent={true} className="page-header">
          Choose Your Inspiration
        </IonHeader>

        <IonList className="categories-list">
          {categories.map(c => <CategoryItem
            key={c.name}
            category={c}
            selected={selectedCategories.includes(c)}
            onSelect={() => onCategorySelect(c)}
          />)}
        </IonList>

        <IonButton
          className="save-button"
          onClick={() => router.push('/reminders-view')}
        >
          Save
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ViewCategories;
