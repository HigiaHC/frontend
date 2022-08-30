import React, { useContext, createContext, useState } from "react";
import { Popup } from "../components/popup";

const PopupContext = createContext({
  showPopup: () => { },
})

export const PopupProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [popupContent, setPopupContent] = useState({
    text1: "",
    text2: "",
    input: "",
    onAllow: () => { },
    onReject: () => { },
  })

  const handleShow = ({ text1, text2, input, onAllow, onReject = handleHide, hasInput = false, placeholder = '', onChange = () => { }, value = '' }) => {
    setIsVisible(true)
    setPopupContent({ text1, text2, input, onAllow, onReject, hasInput, placeholder, onChange, value })
  }

  const handleHide = () => {
    setIsVisible(false)
    setPopupContent({ text1: "", text2: "", onAllow: () => { }, onReject: () => { }, hasInput: false, placeholder: '', onChange: () => { }, value: '' })
  }

  return (
    <PopupContext.Provider value={{
      showPopup: handleShow
    }}>
      {isVisible &&
        <Popup
          text1={popupContent.text1}
          text2={popupContent.text2}
          hasInput={popupContent.hasInput}
          placeholder={popupContent.placeholder}
          onChange={popupContent.onChange}
          value={popupContent.value}
          onAllow={popupContent.onAllow}
          onReject={popupContent.onReject}>
        </Popup>}
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