import React, { useContext, createContext } from "react";
import { Wallet } from "../services/wallet";

const WalletContext = createContext({
    wallet: () => { }
});

export const WalletProvider = ({ children }) => {
    return (
        <WalletContext.Provider value={{
            wallet: new Wallet()
        }}>
            {children}
        </WalletContext.Provider>
    )
}

export const useWallet = () => {
    const context = useContext(WalletContext);

    if (!context)
        throw new Error('You just can access this context inside a provider');

    return context;
}

