import { createContext, useContext } from "react";

export const ModalContext = createContext({
  showModal: () => {},
  setShowModalFn: () => {},
  hideModal: () => {},
  setHideModalFn: () => {},
  isSettingsVisible: false,
  setIsSettingsVisibleExternal: () => {},
});

export const useModal = () => useContext(ModalContext);
