import React from 'react';

import Container from '@mui/material/Container';
import Header from './components/Header/Header';
import Home from './page/Home/Home';
import Registration from './page/Register/Registration';
import Login from './page/Login/Login';

import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { fetchAuthMe } from './redux/slice/auth';
import AddTodo from './page/AddTodo/AddTodo';
function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/add" element={<AddTodo />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
