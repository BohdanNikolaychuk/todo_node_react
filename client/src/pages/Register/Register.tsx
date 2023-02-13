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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { registerUser } from '../../redux/Auth/asyncActions';
const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [Name, setName] = useState('');
  const [Pass, setPass] = useState('');

  const ChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const ChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  };

  const Submit = () => {
    const newUser = {
      username: Name,
      password: Pass,
    };
    dispatch(registerUser(newUser));
    navigate('/login');
  };

  return (
    <>
      <Flex align={'center'} justify={'center'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Register your account</Heading>
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
                ></Stack>
                <Button onClick={() => Submit()} colorScheme='teal' variant='outline'>
                  Register
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Register;
