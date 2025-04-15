import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/js/bootstrap.bundle.min";
import App from "./App.tsx";
import "./index.scss";
import { store, persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "./i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
);
