// ConfirmationDialog.tsx
import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

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

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  title,
  description,
  confirmButtonText,
  onConfirm,
  onClose,
  loading,
  loadingText,
  confirmButtonColor = 'primary',
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirmation-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color={confirmButtonColor}
          autoFocus
          disabled={loading}
        >
          {loading ? loadingText : confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
