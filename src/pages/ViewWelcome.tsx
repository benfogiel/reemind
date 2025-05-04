import './pages.css';
import '../theme/global.css';

import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonButton,
  useIonRouter,
  IonInput,
  IonText,
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
      <IonContent fullscreen>
        <div className="page-header">Welcome!</div>

        <div className="name-input-container">
          <IonText>
            <p>Enter your first name</p>
          </IonText>
          <IonInput
            placeholder="first name"
            value={inputtedFirstName}
            onIonChange={(e: CustomEvent) => setInputtedFirstName(e.detail.value)}
          />
        </div>

        <IonButton
          className="bottom-button"
          color="dark"
          expand="block"
          onClick={onContinue}
        >
          Continue
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ViewWelcome;
