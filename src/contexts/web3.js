import React, { useContext, createContext } from "react";
import { Web3Service } from "../services/web3";

const Web3Context = createContext({
    web3: () => { }
});

export const Web3Provider = ({ children }) => {
    return (
        <Web3Context.Provider value={{
            web3: new Web3Service()
        }}>
            {children}
        </Web3Context.Provider>
    )
}

export const useWeb3 = () => {
    const context = useContext(Web3Context);

    if (!context)
        throw new Error('You just can access this context inside a provider');

    return context;
}