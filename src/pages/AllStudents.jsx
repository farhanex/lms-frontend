import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Spinner,
  SimpleGrid,
  useToast,
  Text,
  Heading,
  Stack,
} from '@chakra-ui/react';
import { URL } from '../App';

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`${URL}/api/student/allstudents`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch students');
        }

        const data = await res.json();
        // console.log(data);
        setStudents(data);
        setLoading(false);
      } catch (err) {
        toast({
          title: 'Error',
          description: 'Failed to load students',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
      }
    };

    fetchStudents();
  }, [toast]);

  const deleteStudent = async (id) => {
    try {
      const res = await fetch(`${URL}/api/student/deletestudent/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await res.json();

      if (res.status === 200) {
        setStudents(students.filter((student) => student._id !== id));
        toast({
          title: 'Success',
          description: data.msg,
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top',
        });
      } else {
        toast({
          title: 'Error',
          description: data.msg ,
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top',
        });
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to delete student due to server error',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="100vh" bg="gray.700" color="white" p={4} flexDirection="column">
        <Spinner size="xl" mb={4}/>
        <Text>Loading all Students...</Text>
      </Flex>
    );
  }

  return (
    <Box maxW="100wh" mx="auto" py="10" px="4" bg="gray.700" minH={"100vh"} color="white">
      <Heading mb={4}>All Students</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {students.map((student) => (
          <Box
            key={student._id}
            p={4}
            borderRadius="lg"
            bg="gray.800"
            shadow="lg"
          >
            <Stack spacing={3}>
              <Text><strong>Name:</strong> {student.name}</Text>
              <Text><strong>Email:</strong> {student.email}</Text>
              <Text><strong>Role:</strong> {student.role}</Text>
              <Text><strong>Phone No:</strong> {student.phoneNo}</Text>
              <Text><strong>Class Roll No:</strong> {student.classRollNo}</Text>
              <Text><strong>Department:</strong> {student.department}</Text>
              <Text><strong>Session:</strong> {student.session}</Text>
              <Text><strong>Books Holding:</strong> {student.booksHolding.length}</Text>
              <Button
                colorScheme="red"
                onClick={() => deleteStudent(student._id)}
              >
                Delete
              </Button>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AllStudents;
