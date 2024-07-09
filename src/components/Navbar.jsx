import { useState, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import AuthContext from '../context/AuthContext';

const Navbar = ({ title = 'LMS' }) => {
  const { user, logoutUser } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();



  return (
    <Box bg="gray.800" color="white" px={4} position="sticky" top={0} zIndex={50}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <Box as={RouterLink} to="/" fontWeight="bold" fontSize="xl">
            {title}
          </Box>
        </HStack>
        <Flex alignItems="center">
          <HStack
            as="nav"
            spacing={4}
            display={{ base: 'none', md: 'flex' }}
          >
            {user ? (
              <>
                <Link as={RouterLink} to="/" onClick={onClose}>My Profile</Link>
                {user === 'student' && (
                  <Link as={RouterLink} to="/myhistory" onClick={onClose}>My History</Link>
                )}
                {user === 'admin' && (
                  <>
                    <Link as={RouterLink} to="/allbooks" onClick={onClose}>All Books</Link>
                    <Link as={RouterLink} to="/issuebook" onClick={onClose}>Issue Book</Link>
                    <Link as={RouterLink} to="/bookholders" onClick={onClose}>Book Holders</Link>
                  </>
                )}
                <Button colorScheme='red'  variant="solid" size="md" onClick={logoutUser}>Logout</Button>
                </>
            ) : (
              <>
                <Link as={RouterLink} to="/login">Login</Link>
                <Link as={RouterLink} to="/register">Register</Link>
              </>
            )}
          </HStack>
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>
      </Flex>

      {isOpen && (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            {user ? (
              <>
                <Link as={RouterLink} to="/" onClick={onClose}>My Profile</Link>
                {user === 'student' && (
                  <Link as={RouterLink} to="/myhistory" onClick={onClose}>My History</Link>
                )}
                {user === 'admin' && (
                  <>
                    <Link as={RouterLink} to="/allbooks" onClick={onClose}>All Books</Link>
                    <Link as={RouterLink} to="/issuebook" onClick={onClose}>Issue Book</Link>
                    <Link as={RouterLink} to="/bookholders" onClick={onClose}>Book Holders</Link>
                  </>
                )}
                <Button colorScheme='red'  variant="solid" size="md" onClick={logoutUser}>Logout</Button>
              </>
            ) : (
              <>
                <Link as={RouterLink} to="/login" onClick={onClose}>Login</Link>
                <Link as={RouterLink} to="/register" onClick={onClose}>Register</Link>
              </>
            )}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
