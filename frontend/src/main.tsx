import ReactDOM from "react-dom/client";
import "./index.css";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import routes from "./routes";
import { RouterProvider } from "react-router-dom";
import UserApi from "./Api/UserApi.ts";
import { Provider } from "react-redux";
import store from "./Stores/store.ts";
import { AppStateProvider } from "./Stores/AppStateContext.tsx";
import "./i18n";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const userApi = new UserApi();

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <AppStateProvider>
      <RouterProvider router={routes} />
    </AppStateProvider>
  </Provider>,
  // </React.StrictMode>,
);
