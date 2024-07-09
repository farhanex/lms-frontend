import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  SimpleGrid,
  Heading,
  Text,
  Image,
  Flex,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import AddBookModal from '../modals/AddBookModal';
import EditBookModal from '../modals/EditBookModal'; 
import { URL } from "../App";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [bookToEdit, setBookToEdit] = useState(null);
  const toast = useToast(); 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`${URL}/api/book/books`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        setBooks(data);
        console.log(data);
      } catch (err) {
        // console.error(err);
      }
    };

    fetchBooks();
  }, []);

  const handleAddBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  const handleEditBook = (updatedBook) => {
    setBooks(books.map((book) => (book._id === updatedBook._id ? updatedBook : book)));
  };

  const handleDeleteBook = async (id) => {
    try {
      const res = await fetch(`${URL}/api/book/deletebook/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await res.json();

      if (res.status === 200) {
        setBooks(books.filter((book) => book._id !== id));
        toast({
          title: "Success",
          description: data.msg,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "Error",
          description: data.msg || "An error occurred",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (err) {
      // console.log(err);
      toast({
        title: "Error",
        description: "An error occurred while deleting the book",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const openEditModal = (book) => {
    setBookToEdit(book);
    setIsEditModalOpen(true);
  };

  if (!books) {
    return (
      <Box
        minH="100vh"
        bg="gray.600"
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={4}
        flexDirection="column"
      >
        <Spinner size="xl" mb={4} />
        <Text>Loading all books...</Text>
      </Box>
    );
  }

  return (
    <Box maxW="100wh" mx="auto" py="10" px="2" bg="gray.700" minH={"100vh"} color="white">
      <Heading as="h1" fontSize="2xl" fontWeight="bold" mb="4">All Books</Heading>
      <Button
        colorScheme="blue"
        mb="4"
        onClick={() => setIsModalOpen(true)}
      >
        Add Book
      </Button>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={6}>
        {books.map((book) => (
          <Flex key={book._id} borderWidth="1px" borderRadius="lg" p="2" boxShadow="md" bg="gray.800">
            <Image
              src={book.image}  
              alt={book.name}
              mr="3"
              h="140"
              w="100"
            />
            <Box flex={1} >
              <Text color="white" fontSize="s">Book Name : {book.name.toUpperCase()}</Text>
              <Text color="white" fontSize="s">Author:  {book.author}</Text>
              <Text color="white" fontSize="s">Quantity: {book.qty}</Text>
              <Text color="white" fontSize="xs">Date: {book.dateAdded}</Text>

              <Flex mt="2" justifyContent="flex-start" alignItems="center" flexWrap="wrap">
                <Button colorScheme="yellow" onClick={() => openEditModal(book)} mr={2} flexShrink={0} width={{ base: "45%", md: "auto" }}>Edit</Button>
                <Button colorScheme="red" onClick={() => handleDeleteBook(book._id)} flexShrink={0} width={{ base: "45%", md: "auto" }}>Delete</Button>
              </Flex>
            </Box>
          </Flex>
        ))}
      </SimpleGrid>
      <AddBookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddBook={handleAddBook}
      />
      <EditBookModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        book={bookToEdit}
        onEditBook={handleEditBook}
      />
    </Box>
  );
};

export default AllBooks;
