import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import ViewCategories from './pages/ViewCategories';
import ViewReminders from './pages/ViewReminders';
import { Category } from './data/categories';

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
import ViewWelcome from './pages/ViewWelcome';

setupIonicReact();

const App: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

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
            <ViewCategories
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </Route>
          <Route path="/reminders-view" exact={true}>
            <ViewReminders categories={selectedCategories} />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
