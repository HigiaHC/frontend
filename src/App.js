import React from "react";
import { PopupProvider } from "./contexts/popup";
import { WalletProvider } from "./contexts/wallet";
import { Routes } from './routes'
import { ResetCss } from "./styles/reset-css";

function App() {
  return (
    <WalletProvider>
      <PopupProvider>
        <Routes />
        <ResetCss />
      </PopupProvider>
    </WalletProvider>
  );
}

export default App;
