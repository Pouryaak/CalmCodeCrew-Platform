// useConfirmationDialog.ts
import React, { useState, useCallback } from 'react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmButtonText: string;
  onConfirm: () => void;
  onClose: () => void;
  loading?: boolean;
  loadingText?: string;
  confirmButtonColor?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
}

const useConfirmationDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const defaultOnClose = useCallback(() => setIsOpen(false), []);

  const [dialogProps, setDialogProps] = useState<ConfirmationDialogProps>({
    isOpen: isOpen,
    title: '',
    description: '',
    confirmButtonText: 'Confirm',
    onConfirm: () => {},
    onClose: defaultOnClose,
    confirmButtonColor: 'primary',
    loading: false,
    loadingText: 'Loading...',
  });

  const showDialog = useCallback(
    (props: Omit<ConfirmationDialogProps, 'isOpen' | 'onClose'>) => {
      setDialogProps({ ...props, isOpen: true, onClose: hideDialog });
    },
    [defaultOnClose],
  );

  const hideDialog = useCallback(() => {
    setDialogProps((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return {
    show: showDialog,
    hide: hideDialog,
    dialogProps,
  };
};

export default useConfirmationDialog;
