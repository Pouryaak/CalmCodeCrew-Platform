import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';
import { RootState } from '../../../store/store';
import { ROUTES } from '../../../routes/default_routes';

interface PrivateWrapperProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateWrapperProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const initializing = useSelector(
    (state: RootState) => state.auth.initializing,
  );

  if (initializing) {
    // TODO: show a spinner
    return null;
  }

  if (!user) {
    return <Navigate to={ROUTES.AUTHENTICATION} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
