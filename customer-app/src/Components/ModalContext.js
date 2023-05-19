import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        showRegistrationModal,
        setShowRegistrationModal,
        showLoginModal,
        setShowLoginModal,
        isLoggedIn,
        setIsLoggedIn
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

