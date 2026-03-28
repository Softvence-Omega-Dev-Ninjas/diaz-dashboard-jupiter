import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { RouterProvider } from 'react-router-dom';
// import router from './routes.tsx';
import { Provider } from 'react-redux';
import { persistStore, type Persistor } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'sonner';
import { SocketProvider } from './contexts/SocketContext.tsx';
import store from './redux/store.ts';
import router from './routes/routes.tsx';

const persistor: Persistor = persistStore(store);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster position="top-right" richColors />
      <PersistGate loading={null} persistor={persistor}>
        <SocketProvider>
          <RouterProvider router={router} />
        </SocketProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
