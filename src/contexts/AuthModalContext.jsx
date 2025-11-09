// src/context/AuthModalContext.jsx
import { createContext, useContext, useState } from "react";

const AuthModalContext = createContext();

export function AuthModalProvider({ children }) {
  const [modalType, setModalType] = useState(null);
  const [modalData, setModalData] = useState(null);

  const openAuthModal = (type, data) => {
    setModalType(type);
    setModalData(data || null);
  };

  const closeAuthModal = () => {
    setModalType(null);
    setModalData(null);
  };

  return (
    <AuthModalContext.Provider
      value={{ modalType, modalData, openAuthModal, closeAuthModal }}
    >
      {children}
    </AuthModalContext.Provider>
  );
}

export const useAuthModal = () => useContext(AuthModalContext);
