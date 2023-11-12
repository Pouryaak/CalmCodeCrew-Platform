import { useParams } from 'react-router-dom';
import UserDetailsForm from '../../features/Users/components/UserDetailsForm/UserDetailsForm';

const UserDetailsPage = () => {
  const { id } = useParams();

  return <UserDetailsForm id={id} />;
};

export default UserDetailsPage;
