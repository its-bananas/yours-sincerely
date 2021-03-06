// the main file in our front-end app
// create-react-app expects a file in src/index.js and loads everything from here

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";

import React from "react";
import ReactDOM from "react-dom";
import { debounce } from "lodash";

// connect our app to firebase
const dbConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(dbConfig);
firebase.analytics();

// resize listeners
const onResize = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};
const debouncedResize = debounce(onResize, 100);
window.addEventListener("resize", debouncedResize);
onResize();

// render react app
const render = () => {
  const { App } = require("./features/App");
  ReactDOM.render(<App />, document.getElementById("root"));
};

render();

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./features/App", render);
}
