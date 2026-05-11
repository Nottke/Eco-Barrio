import { IonApp, setupIonicReact } from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';

import { AppRoutes } from './routes/AppRoutes';

setupIonicReact();

const App = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <AppRoutes />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
