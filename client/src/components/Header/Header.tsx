import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

import { FiMenu } from 'react-icons/fi';
import { RiFlashlightFill } from 'react-icons/ri';
import { Outlet } from 'react-router-dom';
import SideBarContent from '../SideBarContent/SideBarContent';

export default function Index() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box as='section'>
      <SideBarContent display={{ base: 'none', md: 'unset' }} />
      <Drawer isOpen={isOpen} onClose={onClose} placement='left'>
        <DrawerOverlay />
        <DrawerContent>
          <SideBarContent w='full' borderRight='none' />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition='.3s ease'>
        <Flex
          as='header'
          align='center'
          w='full'
          px='4'
          borderBottomWidth='1px'
          borderColor={useColorModeValue('inherit', 'gray.700')}
          bg={useColorModeValue('white', 'gray.800')}
          justify={{ base: 'space-between', md: 'flex-end' }}
          boxShadow='lg'
          h='14'
        >
          <IconButton
            aria-label='Menu'
            display={{ base: 'inline-flex', md: 'none' }}
            onClick={onOpen}
            icon={<FiMenu />}
            size='md'
          />

          <Flex align='center'>
            <Icon as={RiFlashlightFill} h={8} w={8} />
          </Flex>
        </Flex>
        <Outlet />
      </Box>
    </Box>
  );
}
