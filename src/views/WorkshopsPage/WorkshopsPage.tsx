import { useNavigate } from 'react-router-dom';
import PageHeader from '../../shared/components/PageHeader/PageHeader';
import AddIcon from '@mui/icons-material/Add';
import { ROUTES } from '../../routes/default_routes';
import WorkshopList from '../../features/Workshops/components/WorkshopList/WorkshopList';

const WorkshopsPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader
        title="Workshops"
        buttonOptions={{
          title: 'Add',
          onClick: () => {
            navigate(ROUTES.ADD_WORKSHOP);
          },
          Icon: AddIcon,
          loading: false,
        }}
      />
      <WorkshopList />
    </>
  );
};

export default WorkshopsPage;
