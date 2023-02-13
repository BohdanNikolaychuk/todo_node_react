import { Button, Container, Heading, Stack } from '@chakra-ui/react';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { selectAuthData } from '../../redux/Auth/selector';
import { _routes } from '../../router/_Routes';
const Home = () => {
  const { isAuth } = useAppSelector(selectAuthData);

  return (
    <>
      <Container maxW={'5xl'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            Task scheduling
          </Heading>

          <Stack spacing={6} direction={'row'}>
            {isAuth ? (
              <>
                <Button as={NavLink} to={_routes.TASK} colorScheme='teal' variant='outline'>
                  To Tasks
                </Button>
              </>
            ) : (
              <>
                <Button as={Link} to='/login' colorScheme='teal' variant='solid'>
                  Login
                </Button>
                <Button as={Link} to='/register' colorScheme='teal' variant='outline'>
                  Register
                </Button>
              </>
            )}
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default Home;
