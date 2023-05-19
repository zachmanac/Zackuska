import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

const ModalContextProvider = ({ children }) => {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);


  return (
    <ModalContext.Provider
      value={{
        showRegistrationModal,
        setShowRegistrationModal,
        showLoginModal,
        setShowLoginModal,
        
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;

