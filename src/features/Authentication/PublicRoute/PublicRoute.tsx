import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/default_routes';

interface PublicWrapperProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicWrapperProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const initializing = useSelector(
    (state: RootState) => state.auth.initializing,
  );

  if (initializing) {
    // TODO: show a spinner
    return null;
  }

  if (user) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
