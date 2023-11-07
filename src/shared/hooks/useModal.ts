import { useState } from 'react';

// Define the return type for the useModal hook
type UseModalReturnType = {
  isOpen: boolean;
  isLoading: boolean;
  showModal: () => void;
  hideModal: () => void;
  showLoading: () => void;
  hideLoading: () => void;
};

const useModal = (): UseModalReturnType => {
  // State to manage modal visibility
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // State to manage modal loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Functions to control modal state
  const showModal = (): void => setIsOpen(true);
  const hideModal = (): void => setIsOpen(false);

  // Functions to control modal loading state
  const showLoading = (): void => setIsLoading(true);
  const hideLoading = (): void => setIsLoading(false);

  return {
    isOpen,
    isLoading,
    showModal,
    hideModal,
    showLoading,
    hideLoading,
  };
};

export default useModal;
