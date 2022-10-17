import React from "react";
import { PopupProvider } from "./contexts/popup";
import { WalletProvider } from "./contexts/wallet";
import { Web3Provider } from "./contexts/web3";
import { Routes } from './routes'
import { ResetCss } from "./styles/reset-css";

function App() {
  return (
    <Web3Provider>
      <script type="module" src="main.js"></script>
      <WalletProvider>
        <PopupProvider>
          <Routes />
          <ResetCss />
        </PopupProvider>
      </WalletProvider>
    </Web3Provider>
  );
}

export default App;
