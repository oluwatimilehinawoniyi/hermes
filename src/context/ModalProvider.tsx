import { createContext, ReactNode, useState } from "react";

interface ModalContextType {
  isNSOpen: boolean;
  isNVOpen: boolean;
  toggleNVModal: () => void;
  toggleNSModal: () => void;
}

const defaultModalContext: ModalContextType = {
  isNSOpen: false,
  isNVOpen: false,
  toggleNVModal: () => {},
  toggleNSModal: () => {},
};

export const ModalContext = createContext<ModalContextType | undefined>(
  defaultModalContext
);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  // NV means New Vehicle, NS means New Shipment
  const [isNSOpen, setIsNSOpen] = useState(false);
  const [isNVOpen, setIsNVOpen] = useState(false);

  const toggleNSModal = () => {
    setIsNSOpen(!isNSOpen);
  };

  const toggleNVModal = () => {
    setIsNVOpen(!isNVOpen);
  };

  return (
    <ModalContext.Provider
      value={{ isNSOpen, isNVOpen, toggleNSModal, toggleNVModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};
