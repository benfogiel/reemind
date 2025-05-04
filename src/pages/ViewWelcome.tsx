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

const ViewWelcome: React.FC = () => {
  const router = useIonRouter();

  const [firstName, setFirstName] = useState<string>('');

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
            value={firstName}
            onIonChange={(e: CustomEvent) => setFirstName(e.detail.value)}
          />
        </div>

        <IonButton
          className="bottom-button"
          color="dark"
          expand="block"
          onClick={() => router.push('/categories-view')}
        >
          Continue
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ViewWelcome;
