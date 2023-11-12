import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeWorkshop } from '../../../features/Workshops/slice/workshop.slice';
import { RootState, store } from '../../../store/store';
import useConfirmationDialog from '../../hooks/useConfirmationDialog';
import { STORE_STATUS } from '../../models';
import { ConfirmationDialog } from '../ConfirmationDialog/ConfirmationDialog';

interface MoreActionsProps {
  id: string;
  delete?: boolean;
  onEdit: () => void;
}

const MoreActions: React.FC<MoreActionsProps> = ({
  id,
  delete: deleteProp = false,
  onEdit,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { show, hide, dialogProps } = useConfirmationDialog();
  const status = useSelector((state: RootState) => state.workshops.status);
  const dispatch = useDispatch<typeof store.dispatch>();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteConfirm = () => {
    dispatch(removeWorkshop(id))
      .unwrap() // unwrap the promise to handle outcomes
      .then(() => {
        hide();
      })
      .catch((error) => {
        console.error('Failed to delete the workshop:', error);
      });
  };

  const onDelete = () => {
    show({
      title: 'Confirm Delete',
      description: 'Are you sure you want to delete this workshop?',
      confirmButtonText: 'Delete',
      onConfirm: handleDeleteConfirm,
      confirmButtonColor: 'error',
      loading: status === STORE_STATUS.LOADING,
      loadingText: 'Deleting...',
    });
  };

  return (
    <>
      <ConfirmationDialog {...dialogProps} />
      <IconButton aria-label="delete" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Box sx={{ maxWidth: '100%', backgroundColor: 'transparent' }}>
          <MenuList sx={{ py: 0 }}>
            {/* Place menu items with icons here */}
            <MenuItem onClick={onEdit}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
            {deleteProp && (
              <MenuItem onClick={onDelete}>
                <ListItemIcon>
                  <DeleteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
              </MenuItem>
            )}
          </MenuList>
        </Box>
      </Menu>
    </>
  );
};

export default MoreActions;
