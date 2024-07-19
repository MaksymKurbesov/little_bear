import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import App from "./App";
import routes from "./routes";
import { RouterProvider } from "react-router-dom";

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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
