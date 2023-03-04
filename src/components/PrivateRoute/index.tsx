import React, { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { ROUTES } from '../../constants';

interface IPrivateRouteProps {
  isAuthorized: boolean;
  navigateTo?: keyof typeof ROUTES;
}

const PrivateRoute: FC<PropsWithChildren<IPrivateRouteProps>> = ({
  isAuthorized,
  navigateTo = ROUTES.home,
  children,
}) => {
  if (!isAuthorized) {
    return <Navigate to={navigateTo} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
