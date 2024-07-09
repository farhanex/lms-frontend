import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  VStack,
  Spinner,
  useToast,
} from "@chakra-ui/react";

import { URL } from "../App";

const IssueBook = () => {
  const [books, setBooks] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [classRollNo, setClassRollNo] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [department, setDepartment] = useState("");
  const [session, setSession] = useState("");
  const [bookId, setBookId] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isExistingStudent, setIsExistingStudent] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`${URL}/api/book/books`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        // console.error(err);
        toast({
          title: "Error fetching books",
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position:"top"
        });
      }
    };
    fetchBooks();
  }, [toast]);

  const fetchStudentDetails = async (email) => {
    setIsFetching(true);
    try {
      const res = await fetch(`${URL}/api/issuebooks/student/${email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const student = await res.json();
      if (res.ok) {
        setStudentName(student.name);
        setClassRollNo(student.classRollNo);
        setPhoneNo(student.phoneNo);
        setDepartment(student.department);
        setSession(student.session);
        setIsExistingStudent(true);

      } else {
        setStudentName("");
        setClassRollNo("");
        setPhoneNo("");
        setDepartment("");
        setSession("");
        setIsExistingStudent(false);
      }
    } catch (err) {
      // console.error(err);
    }
    setIsFetching(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const issueData = {
      studentName,
      email,
      classRollNo,
      phoneNo,
      department,
      session,
      bookId,
    };
    try {
      const res = await fetch(`${URL}/api/issuebooks/issuebook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(issueData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || "Error issuing book");
      }

      toast({
        title: "Book issued successfully",
        description: "The book has been issued to the student",
        status: "success",
        duration: 2000,
        isClosable: true,
        position:"top"
      });
    } catch (err) {
      // console.error(err);
      toast({
        title: "Error issuing book",
        description: err.message,
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
      p={2}
    >
      <Box
        bg="gray.700"
        p={{ base: 4, md: 8 }}
        rounded="md"
        shadow="md"
        w={{ base: "full", sm: "sm", md: "md" }}
      >
        <Heading as="h2" size="xl" mb={4} color="white">
          Issue Book
        </Heading>
        <form onSubmit={onSubmit}>
          <VStack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => fetchStudentDetails(email)}
                bg="gray.800"
                color="white"
                _placeholder={{ color: "gray.400" }}
              />
              {isFetching && <Spinner size="sm" />}
            </FormControl>
            <FormControl id="studentName" isRequired isReadOnly={isExistingStudent}>
              <FormLabel>Student Name</FormLabel>
              <Input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                bg="gray.800"
                color="white"
                _placeholder={{ color: "gray.400" }}
              />
            </FormControl>
            <FormControl id="classRollNo" isRequired isReadOnly={isExistingStudent}>
              <FormLabel>Class Roll Number</FormLabel>
              <Input
                type="text"
                value={classRollNo}
                onChange={(e) => setClassRollNo(e.target.value)}
                bg="gray.800"
                color="white"
                _placeholder={{ color: "gray.400" }}
              />
            </FormControl>
            <FormControl id="phoneNo" isRequired isReadOnly={isExistingStudent}>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="text"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                bg="gray.800"
                color="white"
                _placeholder={{ color: "gray.400" }}
              />
            </FormControl>
            <FormControl id="department" isRequired isReadOnly={isExistingStudent}>
              <FormLabel>Department</FormLabel>
              <Input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                bg="gray.800"
                color="white"
                _placeholder={{ color: "gray.400" }}
              />
            </FormControl>
            <FormControl id="session" isRequired isReadOnly={isExistingStudent}>
              <FormLabel>Session</FormLabel>
              <Input
                type="text"
                value={session}
                onChange={(e) => setSession(e.target.value)}
                bg="gray.800"
                color="white"
                _placeholder={{ color: "gray.400" }}
              />
            </FormControl>
            <FormControl id="bookId" isRequired >
              <FormLabel>Book</FormLabel>
              <Select
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
                bg="gray.800"
                color="gray.400"
              >
                <option value="" disabled>
                  Select a book
                </option>
                {books.map((book) => (
                  <option key={book._id} value={book._id}>
                    {book.name.toUpperCase()} by {book.author}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Button type="submit" colorScheme="blue" width="full">
              Issue Book
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default IssueBook;
