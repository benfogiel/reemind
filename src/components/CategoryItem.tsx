import { IonCard, IonCardContent } from '@ionic/react';
import { Category } from '../data/categories';
import './CategoryItem.css';

interface CategoryItemProps {
  category: Category;
  selected: boolean;
  onSelect: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, selected, onSelect, children, style }) => {
  return (
    <IonCard
      color={selected ? 'primary' : 'light'}
      onClick={onSelect}
      className="category-item"
      style={style}
    >
      <IonCardContent className="category-item-content">
        {category.name}
      </IonCardContent>
      {children}
    </IonCard>
  );
};

export default CategoryItem;
