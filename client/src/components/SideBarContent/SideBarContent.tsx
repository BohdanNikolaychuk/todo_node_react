import {
  Avatar,
  Box,
  BoxProps,
  Button,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { AiOutlineHome } from 'react-icons/ai';
import { FiTrello } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectAuthData } from '../../redux/Auth/selector';
import { logout } from '../../redux/Auth/slice';
import NavItem from '../NavItem/NavItem';

const SideBarContent = ({ ...props }: BoxProps) => {
  const { isAuth, user } = useAppSelector(selectAuthData);
  const dispatch = useAppDispatch();

  const logOut = () => {
    localStorage.clear();
    dispatch(logout());
  };

  return (
    <>
      <Box
        as='nav'
        pos='fixed'
        top='0'
        left='0'
        zIndex='sticky'
        h='full'
        overflowX='hidden'
        overflowY='auto'
        bg={useColorModeValue('white', 'gray.800')}
        borderColor={useColorModeValue('inherit', 'gray.700')}
        borderRightWidth='1px'
        w='60'
        {...props}
      >
        <VStack h='full' w='full' alignItems='flex-start' justify='space-between'>
          <Box w='full'>
            <Flex px='4' py='5' align='center'>
              <Text
                fontSize='2xl'
                ml='2'
                color={useColorModeValue('brand.500', 'white')}
                fontWeight='semibold'
              >
                Task
              </Text>
            </Flex>
            <Flex
              direction='column'
              as='nav'
              fontSize='md'
              color='gray.600'
              aria-label='Main Navigation'
            >
              <NavItem icon={AiOutlineHome} to='/'>
                Home
              </NavItem>
              <NavItem icon={FiTrello} to='Dashboard'>
                Dashboard
              </NavItem>
            </Flex>
          </Box>

          <Flex px='4' py='5' mt={10} justify='center' alignItems='center'>
            <Menu>
              <MenuButton
                as={Button}
                size={'sm'}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                _hover={{ textDecoration: 'none' }}
              >
                <Avatar
                  size={'sm'}
                  name='Ahmad'
                  src='https://avatars2.githubusercontent.com/u/37842853?v=4'
                />
              </MenuButton>
              <MenuList fontSize={17} zIndex={5555}>
                {isAuth ? (
                  <>
                    <MenuItem>Hello,{user?.username}</MenuItem>

                    <Button onClick={logOut}>Logout</Button>
                  </>
                ) : (
                  <>
                    <MenuItem as={Link} to='login'>
                      Login
                    </MenuItem>
                    <MenuItem as={Link} to='register'>
                      Register
                    </MenuItem>
                  </>
                )}
              </MenuList>
            </Menu>
          </Flex>
        </VStack>
      </Box>
    </>
  );
};

export default SideBarContent;
