import { useParams } from 'react-router-dom';
import WorkshopDetailsForm from '../../features/Workshops/components/WorkshopDetailsForm/WorkshopDetailsForm';

const WorkshopDetails = () => {
  const { id } = useParams();

  return (
    <>
      <WorkshopDetailsForm id={id} />
    </>
  );
};

export default WorkshopDetails;
