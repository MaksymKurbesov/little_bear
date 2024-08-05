import React from "react";
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
  apiKey: "AIzaSyCcrWcEBknR9NoXZccEBBtqE-txTVOE4wo",
  authDomain: "tg-tapper.firebaseapp.com",
  projectId: "tg-tapper",
  storageBucket: "tg-tapper.appspot.com",
  messagingSenderId: "225925639303",
  appId: "1:225925639303:web:98cccb6ab6560edc929c22",
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
