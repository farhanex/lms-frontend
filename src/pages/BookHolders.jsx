import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  useToast,
  VStack,
  Divider,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Spinner
} from "@chakra-ui/react";
import { URL } from "../App";

const BookHolder = () => {
  const [holders, setHolders] = useState([]);
  const [selectedIssueId, setSelectedIssueId] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchBookHolders = async () => {
      try {
        const res = await fetch(`${URL}/api/issuebooks/bookholders`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch book holders");
        }
        const data = await res.json();
        // console.log(data);
        setHolders(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast({
          title: "Error fetching book holders",
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
      }
    };
    fetchBookHolders();
  }, [toast]);

  useEffect(() => {
    if (!isOpen) {
      setSecretKey('');
    }
  }, [isOpen, setSecretKey]);


  const handleReturnBook = async () => {
    try {
      const res = await fetch(`${URL}/api/issuebooks/returnbook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ issueId: selectedIssueId, secretKey }),
      });

      const data = await res.json();
      if (res.ok) {
        toast({
          title: 'Success',
          description: data.msg,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position:"top"
        });
        //  run every time when book deleted
        setHolders(holders.filter(holder => holder.issueId !== selectedIssueId));
      } else {
        toast({
          title: 'Error',
          description: data.msg,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position:"top"
        });
      }
      onClose();
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error',
        description: 'Server error',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position:"top"
      });
    }
  };

  if (loading)
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
          <Text>Loading Book holders...</Text>
        </VStack>
      </Box>
    );

  return (
    <Box className="container mx-auto" bg="gray.700" color="white" p="3" minH="100vh" fontFamily="sans-serif">
      <Heading as="h2" size="xl" fontWeight="bold" mb={8} mx={5}>
        Book Holders
      </Heading>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={6}>
        {holders.map((holder, index) => (
          <Box key={index} bg="gray.800" rounded="lg" shadow="md" p={4} >
            <VStack align="start" spacing={2}>
              <Text color="green.300">Issue ID: {holder.issueId}</Text>
              <Text as="h3" size="s">Book Name: {holder.book.name.toUpperCase()}</Text>
              <Text color="yellow.500">Author Name: {holder.book.author}</Text>
              <Text>Student Name: {holder.student.name}</Text>
              <Text>Email: {holder.student.email}</Text>
              <Text>Phone No: {holder.student.phoneNo}</Text>
              <Text>Class Roll No: {holder.student.classRollNo}</Text>
              <Text>Department: {holder.student.department.toUpperCase()}</Text>
              <Text>Session: {holder.student.session}</Text>
              <Text>Issued Date: {holder.issuedDate}</Text>
              <Text>Return Date: {holder.returnDate}</Text>
              <Text>Days Left: {holder.daysLeft}</Text>
              <Text color="red.600">Late Fee: {holder.lateFee}</Text>
              <Divider />
              <Button
                colorScheme="blue"
                onClick={() => {
                  setSelectedIssueId(holder.issueId);
                  onOpen();
                }}
              >
                Return Book
              </Button>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent  rounded="lg" boxShadow="lg" bg="gray.700" mx="2" color="white">
          <ModalHeader color="white">Enter Secret Key</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel color="white">Secret Key</FormLabel>
              <Input
                type="password"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                color="white"
                _placeholder={{ color: "gray.400" }}
                bg="gray.800"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleReturnBook}>
              Submit
            </Button>
            {/* <Button  onClick={onClose}>
              Cancel
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default BookHolder;
