import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../../../store/store';
import { ROUTES } from '../../../routes/default_routes';

const PrivateRoute: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const initializing = useSelector(
    (state: RootState) => state.auth.initializing,
  );

  if (initializing) {
    // TODO: show a spinner
    return null;
  }
  console.log(user);

  if (!user) {
    return <Navigate to={ROUTES.AUTHENTICATION} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
