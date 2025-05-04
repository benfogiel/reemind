import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import ViewCategories from './pages/ViewCategories';
import ViewReminders from './pages/ViewReminders';

import ViewWelcome from './pages/ViewWelcome';
import { getReminders, setReminders } from './services/preferences';
import { getDefaultReminders } from './data/reminders';
import {
  requestNotificationPermissions,
  scheduleDailyReminder,
} from './services/notifications';
import { setupNotificationListener } from './services/notifications';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    const loadReminders = async () => {
      const reminders = await getReminders();
      if (reminders.length === 0) {
        const defaultReminders = getDefaultReminders();
        await setReminders(defaultReminders);
      }
    };

    loadReminders();
  }, []);

  useEffect(() => {
    const initializeNotifications = async () => {
      const hasPermission = await requestNotificationPermissions();
      if (!hasPermission) return;

      setupNotificationListener();
      await scheduleDailyReminder();
    };

    initializeNotifications();
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" exact={true}>
            <Redirect to="/welcome-view" />
          </Route>
          <Route path="/welcome-view" exact={true}>
            <ViewWelcome />
          </Route>
          <Route path="/categories-view" exact={true}>
            <ViewCategories />
          </Route>
          <Route path="/reminders-view" exact={true}>
            <ViewReminders />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
