import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Store, { persistor } from "./redux/store.js"; 
import { PersistGate } from "redux-persist/integration/react"; 
import { GoogleOAuthProvider } from '@react-oauth/google';
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="695978598356-18ind1j88lblsb7egq7repemgsuebjtj.apps.googleusercontent.com">
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
    </GoogleOAuthProvider>
  </StrictMode>
);
