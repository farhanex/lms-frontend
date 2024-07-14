import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
 VStack,
 Spinner
} from "@chakra-ui/react";
import { URL } from "../App";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${URL}/api/profile/studentprofile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const result = await res.json();
        if (res.ok) {
          setProfile(result);
        } else {
          throw new Error(result.msg);
        }
      } catch (err) {
        // console.error(err);
      }
    };

    fetchProfile();
  }, []);

  
  if (!profile)
    return (
      <Box
        minH="100vh"
       bg="gray.700"
      color="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={4}
      >
        <VStack spacing={4}>
          <Spinner size="xl" />
          <Text>Loading Student profile...</Text>
        </VStack>
      </Box>
    );

  return (
    <Box
      minH="100vh"
      bg="gray.700"
      color="white"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Heading as="h1" size="xl" mb={8} fontWeight="bold">
        Student Profile
      </Heading>
      <Box
        bg="gray.800"
        shadow="md"
        rounded="md"
        p={8}
        w="full"
        maxW="md"
        mb={8}
        color="white" 
      >
        <Text mb={4}>
          <strong>Name:</strong> {profile.name}
        </Text>
        <Text mb={4}>
          <strong>Email:</strong> {profile.email}
        </Text>
        <Text mb={4}>
          <strong>Role:</strong> {profile.role}
        </Text>
      </Box>
    </Box>
  );
};

export default StudentProfile;
