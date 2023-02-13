import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useAppDispatch } from './hooks/redux';
import { fetchAuthMe } from './redux/Auth/asyncActions';
import { router } from './router/Router';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      dispatch(fetchAuthMe());
    }
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
