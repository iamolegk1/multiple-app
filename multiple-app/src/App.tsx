import { FC, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAppSelector } from './redux/hooks';
import { getIsAuthorized } from './redux/slices/user/selectors';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import News from './pages/News';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import { ROUTES } from './constants';

const App: FC = () => {
  const isAuthorized = useAppSelector(getIsAuthorized);

  return (
    <Routes>
      <Route path={ROUTES.home} element={<Layout />}>
        <Route path='' element={<Home />} />
        <Route
          path={ROUTES.news}
          element={
            <Suspense fallback={<p>Loading News page...</p>}>
              <News />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.login}
          element={
            <Suspense fallback={<p>Loading Login page...</p>}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.profile}
          element={
            <PrivateRoute isAuthorized={isAuthorized}>
              <Suspense fallback={<p>Loading Profile page...</p>}>
                <Profile />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path='*'
          element={
            <Suspense fallback={<p>Loading...</p>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
