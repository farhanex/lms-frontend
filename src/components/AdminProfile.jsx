import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  Spinner,
} from "@chakra-ui/react";
// import AuthContext from "../context/AuthContext";
import { URL } from "../App";

const AdminProfile = () => {
  // const { logoutUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${URL}/api/profile/adminprofile`, {
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



  if (!profile){
    return (
      <Box
        minH="100vh"
        bg="gray.700"
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={4}
        flexDirection="column"
      >
       
          <Spinner size="xl" mb={4}/>
          <Text>Loading admin profile...</Text>

      </Box>
    );
  }

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
        Admin Profile
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
        {/* <Heading as="h2" size="lg" fontWeight="semibold" mb={4}>
          {profile.role} Profile
        </Heading> */}
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
      {/* <Button
        onClick={logoutUser}
        colorScheme="blue"
        variant="solid"
        size="md"
      >
        Logout
      </Button> */}
    </Box>
  );
};

export default AdminProfile;
