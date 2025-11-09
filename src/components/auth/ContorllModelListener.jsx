// src/components/auth/ModalController.jsx
import modalEmitter from "@utils/modalEmitter";

export const ModalController = {
  openModal: (type, data = null) => {
    modalEmitter.emit("openModal", { type, data });
  },

  closeModal: () => {
    modalEmitter.emit("closeModal");
  },
};
