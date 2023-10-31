import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

enum WorkshopModalType {
  ADD = 'ADD',
  UPDATE = 'UPDATE',
}

interface WorkshopModalProps {
  open: boolean;
  handleClose: () => void;
  type: WorkshopModalType;
}

const WorkshopModal = ({ open, handleClose, type }: WorkshopModalProps) => {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {type === WorkshopModalType.ADD
            ? 'Add New Workshop'
            : 'Update Workshop'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleClose}>
            {type === WorkshopModalType.ADD ? 'Add' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WorkshopModal;
