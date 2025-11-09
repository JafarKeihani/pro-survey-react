// src/components/auth/ModalListener.jsx
import { useEffect } from "react";
import modalEmitter from "@utils/modalEmitter";

export const ModalListener = ({ children }) => {
  useEffect(() => {
    const handleOpen = ({ type, data }) => {
      console.log("OPEN MODAL:", type, data);
    };

    const handleClose = () => {
      console.log("CLOSE MODAL");
    };

    modalEmitter.on("openModal", handleOpen);
    modalEmitter.on("closeModal", handleClose);

    return () => {
      modalEmitter.off("openModal", handleOpen);
      modalEmitter.off("closeModal", handleClose);
    };
  }, []);

  return children;
};
