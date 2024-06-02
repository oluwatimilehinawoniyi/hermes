import { createContext, ReactNode, useState } from "react";

interface ModalContextType {
  isOpen: boolean;
  toggleModal: () => void;
}

const defaultModalContext: ModalContextType = {
  isOpen: false,
  toggleModal: () => {},
};

export const ModalContext = createContext<ModalContextType | undefined>(
  defaultModalContext
);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    console.log("is it open?" + isOpen);
  };

  return (
    <ModalContext.Provider value={{ isOpen, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
};
