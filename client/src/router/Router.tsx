import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { ProtectedRoute } from '../components/ProtectedRoute/ProtectedRoute';
import Dashboard from '../pages/Dashboard/Dashboard';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/Dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/Register',
        element: <Register />,
      },
    ],
  },
]);
