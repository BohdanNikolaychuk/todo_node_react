import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { loginUser } from '../../redux/Auth/asyncActions';
import { selectAuthData } from '../../redux/Auth/selector';
import { _routes } from '../../router/_Routes';
const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAppSelector(selectAuthData);

  const [Name, setName] = useState('');
  const [Pass, setPass] = useState('');

  const ChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const ChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  };

  const Submit = async () => {
    const newUser = {
      username: Name,
      password: Pass,
    };
    dispatch(loginUser(newUser));
  };

  if (isAuth) {
    navigate('/Dashboard');
  }
  return (
    <>
      <Flex align={'center'} justify={'center'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Login in to your account</Heading>
          </Stack>
          <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
            <Stack spacing={4}>
              <FormControl id='email'>
                <FormLabel>User Name</FormLabel>
                <Input onChange={ChangeName} value={Name} type='text' />
              </FormControl>
              <FormControl id='password'>
                <FormLabel>Password</FormLabel>
                <Input onChange={ChangePass} value={Pass} type='password' />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Button as={NavLink} to={_routes.REGISTER}>
                    Register your account
                  </Button>
                </Stack>
                <Button onClick={Submit} colorScheme='teal' variant='outline'>
                  Login
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Login;
