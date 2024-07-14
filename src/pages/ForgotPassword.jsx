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
import { URL } from "../App";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/api/auth/request-reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: data.msg,
          status: "success",
          duration: 2000,
          isClosable: true,
          position:"top"
        });
      } else {
        toast({
          title: "Error",
          description: data.msg || "Something went wrong",
          status: "error",
          duration: 2000,
          isClosable: true,
          position:"top"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error",
        status: "error",
        duration: 2000,
        isClosable: true,
        position:"top"
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
        <Heading as="h2" size="xl" mb={4} color="white">Forgot Password</Heading>
        <form onSubmit={handleSubmit}>
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
            <Button type="submit" colorScheme="blue" width="full">
              Reset Password
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
