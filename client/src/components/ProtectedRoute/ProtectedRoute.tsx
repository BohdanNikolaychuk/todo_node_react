import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { selectAuthData } from '../../redux/Auth/selector';

export const ProtectedRoute = ({ children }: any) => {
  const { isAuth } = useAppSelector(selectAuthData);

  if (!isAuth) {
    return <Navigate to='/' replace />;
  }
  return children;
};
