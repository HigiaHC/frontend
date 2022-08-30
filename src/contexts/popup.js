import React, { useContext, createContext, useState, useCallback } from "react";
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
    // onReject: handleHide,
    hasInput: false,
    onChange: () => { },
    placeholder: ""
  })

  const handleShow = ({ text1, text2, input, onAllow, onReject = handleHide, hasInput = false, onChange = () => { }, placeholder = '' }) => {
    setIsVisible(true)
    setPopupContent({ text1, text2, input, onAllow, onReject, hasInput, onChange, placeholder })
  }

  const handleHide = () => {
    setIsVisible(false)
    setPopupContent({ text1: "", text2: "", onAllow: () => { }, onReject: handleHide, hasInput: false, onChange: () => { }, placeholder: '' })
  }

  return (
    <PopupContext.Provider value={{
      showPopup: handleShow, handleHide
    }}>
      {isVisible &&
        <Popup
          text1={popupContent.text1}
          text2={popupContent.text2}
          onAllow={popupContent.onAllow}
          onReject={popupContent.onReject}
          hasInput={popupContent.hasInput}
          onChange={popupContent.onChange}
          placeholder={popupContent.placeholder}>
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