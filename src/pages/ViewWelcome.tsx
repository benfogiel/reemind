import './pages.css';
import '../theme/global.css';

import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonButton,
  useIonRouter,
  IonInput,
  IonText,
  IonFooter,
} from '@ionic/react';

import { setFirstName } from '../services/preferences';

const ViewWelcome: React.FC = () => {
  const router = useIonRouter();

  const [inputtedFirstName, setInputtedFirstName] = useState<string>('');

  const onContinue = () => {
    if (inputtedFirstName.length > 0) {
      setFirstName(inputtedFirstName);
      router.push('/categories-view');
    }
  };

  return (
    <IonPage id="welcome-view">
      <IonHeader>
        <div className="page-header">Welcome!</div>
      </IonHeader>

      <IonContent fullscreen scrollY={false}>
        <div className="name-input-container">
          <IonText>
            <p>Enter your first name</p>
          </IonText>
          <IonInput
            placeholder="first name"
            value={inputtedFirstName}
            onIonInput={(e: CustomEvent) => setInputtedFirstName(e.detail.value)}
          />
        </div>
      </IonContent>

      <IonFooter className="page-footer">
        <IonButton
          className="bottom-button"
          color="dark"
          expand="block"
          onClick={onContinue}
        >
          Continue
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default ViewWelcome;
