import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WorkshopWidget from '../../features/Workshops/components/WorkshopWidget/WorkshopWidget';
import { fetchAllWorkshops } from '../../features/Workshops/slice/workshop.slice';
import { STORE_STATUS } from '../../shared/models';
import { RootState, store } from '../../store/store';

const HomePage = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const status = useSelector((state: RootState) => state.workshops.status);

  useEffect(() => {
    if (status === STORE_STATUS.IDLE) {
      dispatch(fetchAllWorkshops());
    }
  }, []);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6} md={6}>
        <WorkshopWidget />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <WorkshopWidget />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <WorkshopWidget />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <WorkshopWidget />
      </Grid>
    </Grid>
  );
};

export default HomePage;
