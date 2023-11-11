import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../../shared/components/Loader/Loader';
import { STORE_STATUS } from '../../../../shared/models';
import { RootState, store } from '../../../../store/store';
import { fetchAllCertificates } from '../../slice/certificates.slice';

const CertificateList = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const certificates = useSelector(
    (state: RootState) => state.certificates.certificates,
  );
  const status = useSelector((state: RootState) => state.certificates.status);
  const error = useSelector((state: RootState) => state.certificates.error);

  useEffect(() => {
    if (status === STORE_STATUS.IDLE) {
      dispatch(fetchAllCertificates());
    }
  }, [status, dispatch]);

  const openCertificate = (link: string) => {
    window.open(link, '_blank');
  };

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
              <TableCell>Student Name</TableCell>
              <TableCell>Generation Date</TableCell>
              <TableCell>Workshop Name</TableCell>
              <TableCell>Download</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {certificates.map((certificate) => (
              <TableRow
                key={certificate.uid}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{certificate.userName}</TableCell>
                <TableCell>{certificate.generationDate}</TableCell>
                <TableCell>{certificate.workshopName}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    onClick={() => openCertificate(certificate.link)}
                  >
                    <CloudDownloadIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CertificateList;
