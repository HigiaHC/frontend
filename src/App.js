import React from "react";
import { PopupProvider } from "./contexts/popup";
import { Routes } from './routes'
import { ResetCss } from "./styles/reset-css";

function App() {
  return (
    <PopupProvider>
      <Routes />
      <ResetCss />
    </PopupProvider>
  );
}

export default App;
