import React from 'react';
import useAuthenticated from '../../hooks/useAuthenticated';
import { Route, Navigate } from 'react-router-dom';

interface LoggedInRouteProps {
  path: string;
  element: React.ReactElement;
}

const LoggedInRoute = ({ element, path }: LoggedInRouteProps) => {
  const { authenticated } = useAuthenticated();

  if (authenticated) {
    return <Route element={element} path={path} />;
  }

  return <Navigate to="/login" />;
};

export default LoggedInRoute;
