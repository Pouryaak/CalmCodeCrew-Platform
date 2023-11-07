import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import WorkshopList from '../../features/Workshops/components/WorkshopList/WorkshopList';
import { ROUTES } from '../../routes/default_routes';
import PageHeader from '../../shared/components/PageHeader/PageHeader';

function WorkshopsPage() {
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
}

export default WorkshopsPage;
