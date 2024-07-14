import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useParams,useNavigate } from "react-router-dom";

import { URL } from "../App";


const ResetPassword = () => {
  const navigate =  useNavigate()
  const { token } = useParams(); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        status: "error",
        duration: 5000,
        isClosable: true,
        position:"top"
      });
      return;
    }
    try {
      const response = await fetch(`${URL}/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: data.msg,
          status: "success",
          duration: 5000,
          isClosable: true,
          position:'top'
        });
        navigate('/login')
      } else {
        toast({
          title: "Error",
          description: data.msg ,
          status: "error",
          duration: 5000,
          isClosable: true,
          position:'top'
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error",
        status: "error",
        duration: 5000,
        isClosable: true,
        position:'top'
      });
    }
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
        <Heading as="h2" size="xl" mb={4} color="white">Reset Password</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="password">
              <FormLabel>New Password</FormLabel>
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
            <FormControl id="confirmPassword">
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                bg="gray.800"
                color="white"
                _placeholder={{ color: "gray.400" }}
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="full">
              Reset Password
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default ResetPassword;
