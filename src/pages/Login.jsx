import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  VStack,
} from "@chakra-ui/react";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [secretKey, setSecretKey] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password, role, secretKey: role === "admin" ? secretKey : undefined };
    await loginUser(userData);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      bg="gray.600"
      color="white"
      overflowY="hidden"
      px={4} 
    >
      <Box
        bg="gray.700"
        p={{ base: 4, md: 8 }} 
        rounded="md"
        shadow="md"
        w={{ base: "full", sm: "sm", md: "md" }} 
      >
        <Heading as="h2" size="xl" mb={4} color="white">Login</Heading>
        <form onSubmit={onSubmit}>
          <VStack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                bg="gray.800"
                color="white"
                _placeholder={{ color: "gray.400" }} 
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                bg="gray.800"
                color="white"
                _placeholder={{ color: "gray.400" }} 
              />
            </FormControl>
            <FormControl id="role">
              <FormLabel>Role</FormLabel>
              <RadioGroup value={role} onChange={setRole}>
                <Stack direction="row">
                  <Radio value="student" colorScheme="blue">
                    Student
                  </Radio>
                  <Radio value="admin" colorScheme="blue">
                    Admin
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            {role === "admin" && (
              <FormControl id="secretKey">
                <FormLabel>Secret Key</FormLabel>
                <Input
                  type="text"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  required
                  bg="gray.800"
                  color="white"
                  _placeholder={{ color: "gray.400" }} 
                />
              </FormControl>
            )}
            <Button type="submit" colorScheme="blue" width="full">
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
