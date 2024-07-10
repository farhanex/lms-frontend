import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import AuthContext from "../context/AuthContext";

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); 
  const [secretKey, setSecretKey] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, password, role, secretKey };
    await registerUser(userData);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      bg="gray.600" 
      color="white" 
      overflow="hidden"
      px={4} 
    >
      <Box
        bg="gray.700"
        p={{ base: 4, md: 8 }} 
        rounded="md"
        shadow="md"
        w={{ base: "full", sm: "sm", md: "md" }} 
        overflow="hidden" 
      >
        <Heading as="h2" size="xl" mb={4} color="white">
          Register
        </Heading>
        <form onSubmit={onSubmit}>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              bg="gray.800"
              color="white"
            />
          </FormControl>
          <FormControl id="email" mt={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              bg="gray.800"
              color="white"
            />
          </FormControl>
          <FormControl id="password" mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              bg="gray.800"
              color="white"
            />
          </FormControl>
          <FormControl id="role" mt={4}>
            <FormLabel>Role</FormLabel>
            <Input
              type="text"
              value={role}
              readOnly
              bg="gray.800"
              color="white"
              disabled
            />
          </FormControl>
          <FormControl id="secretKey" mt={4}>
            <FormLabel>Secret Key</FormLabel>
            <Input
              type="text"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              required
              bg="gray.800"
              color="white"
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" mt={4} width="full">
            Register
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
