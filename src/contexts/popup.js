import React, { useContext, createContext, useState } from "react";
import { Popup } from "../components/popup";

const PopupContext = createContext({
  showPopup: () => {},
})

export const PopupProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [popupContent, setPopupContent] = useState({
    text1: "",
    text2: "",
    onAllow: () => {},
  })

  const handleShow = ({ text1, text2, onAllow }) => {
    setIsVisible(true)
    setPopupContent({ text1, text2, onAllow })
  }

  const handleHide = () => {
    setIsVisible(false)
    setPopupContent({ text1: "", text2: "", onAllow: () => {} })
  }

  return (
    <PopupContext.Provider value={{
      showPopup: handleShow
    }}>
      {isVisible && <Popup text1={popupContent.text1} text2={popupContent.text2} onAllow={popupContent.onAllow} onReject={handleHide}></Popup>}
      {children}
    </PopupContext.Provider>
  )
}

export const usePopup = () => {
  const context = useContext(PopupContext)

  if (!context) {
    throw new Error('You just can access this context inside a provider')
  }

  return context
}