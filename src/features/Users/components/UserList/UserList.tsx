import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getRoute } from '../../../../routes/default_routes';
import Loader from '../../../../shared/components/Loader/Loader';
import MoreActions from '../../../../shared/components/MoreActions/MoreActions';
import { STORE_STATUS } from '../../../../shared/models';
import { RootState, store } from '../../../../store/store';
import { fetchAllUsers } from '../../slice/users.slice';

const UserList = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.users.users);
  const status = useSelector((state: RootState) => state.users.status);
  const error = useSelector((state: RootState) => state.users.error);

  useEffect(() => {
    if (status === STORE_STATUS.IDLE) {
      dispatch(fetchAllUsers());
    }
  }, [status, dispatch]);

  if (status === STORE_STATUS.LOADING) {
    return <Loader />;
  }

  if (status === STORE_STATUS.FAILED) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box my={2}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Attended Workshops</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.uid}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell width="50px">
                  <MoreActions
                    id={user.uid}
                    onEdit={() => navigate(getRoute.editUser(user.uid))}
                  />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.attendedWorkshops.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserList;
