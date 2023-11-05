import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MoreActions from '../MoreActions/MoreActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../../../../store/store';
import { useEffect } from 'react';
import { fetchAllWorkshops } from '../../slice/workshop.slice';
import { STORE_STATUS } from '../../../../shared/models';
import Loader from '../../../../shared/components/Loader/Loader';
import { formatDateAndTime } from '../../../../utils';
import StatusChip from '../StatusChip/StatusChip';

const WorkshopList = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const workshops = useSelector(
    (state: RootState) => state.workshops.workshops,
  );
  const status = useSelector((state: RootState) => state.workshops.status);
  const error = useSelector((state: RootState) => state.workshops.error);

  useEffect(() => {
    if (status === STORE_STATUS.IDLE) {
      dispatch(fetchAllWorkshops());
    }
  }, [status, dispatch]);

  if (status === STORE_STATUS.LOADING) {
    return <Loader />;
  }

  if (status === STORE_STATUS.FAILED) {
    // Render error message if status is 'failed'
    return <div>Error: {error}</div>;
  }

  return (
    <Box my={2}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Date & Time</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Mentor</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workshops.map((workshop) => (
              <TableRow
                key={workshop.uid} // Replace 'uid' with your actual unique identifier
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell width={'50px'}>
                  <MoreActions />
                </TableCell>
                <TableCell>{workshop.name}</TableCell>
                <TableCell>
                  {formatDateAndTime(workshop.date, workshop.time)}
                </TableCell>
                <TableCell>{workshop.location}</TableCell>
                <TableCell>{workshop.mentor}</TableCell>
                <TableCell>
                  <StatusChip status={workshop.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default WorkshopList;
