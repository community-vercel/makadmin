import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./assets/scss/style.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter as Router } from "react-router-dom"; // Change HashRouter to BrowserRouter
import Loader from "./layouts/loader/Loader";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Router basename="/admin"> {/ Add basename /}
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  </Router>
);

reportWebVitals();