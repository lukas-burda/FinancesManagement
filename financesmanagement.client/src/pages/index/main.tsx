import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "../app/App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // 
  // React StrictMode renders components twice on dev server
  //
  /* 
  <React.StrictMode>
     <App />
   </React.StrictMode> 
   */
  <App />
);
