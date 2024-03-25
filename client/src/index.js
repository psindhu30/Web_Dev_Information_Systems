import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./context/authContext";
import SearchProvider from "./context/searchContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <SearchProvider>
      <App />
    </SearchProvider>
  </AuthProvider>
);
