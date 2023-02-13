import { Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NavItem = (props: any) => {
  const color = useColorModeValue('gray.600', 'gray.300');

  const { icon, children, to } = props;

  return (
    <Link to={to}>
      <Flex
        align='center'
        px='4'
        py='3'
        cursor='pointer'
        role='group'
        fontWeight='semibold'
        transition='.15s ease'
        color={useColorModeValue('inherit', 'gray.400')}
        _hover={{
          bg: useColorModeValue('gray.100', 'gray.900'),
          color: useColorModeValue('gray.900', 'gray.200'),
        }}
      >
        {icon && (
          <Icon
            mx='2'
            boxSize='4'
            _groupHover={{
              color: color,
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default NavItem;
