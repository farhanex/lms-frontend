import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react';
import { URL } from "../App";

const EditBookModal = ({ isOpen, onClose, book, onEditBook }) => {
  const [qty, setQty] = useState('');
  const toast = useToast();

  useEffect(() => {
    if (isOpen && book) {
      setQty(book.qty);
    }
  }, [isOpen, book]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedBook = {
      qty,
    };

    try {
      const res = await fetch(`${URL}/api/book/updatebook/${book._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedBook),
      });

      const data = await res.json();
      // console.log(data);

      if (res.status === 200) {
        onEditBook(data.book);
        toast({
          title: "Success",
          description: data.msg,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        onClose();
      } else {
        toast({
          title: "Error",
          description: data.errors[0].msg,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (err) {
      // console.error(err);
      toast({
        title: "Error",
        description: "An error occurred while updating the book",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent rounded="lg" boxShadow="lg" bg="gray.700" mx={1}>
        <ModalHeader color="white">Edit Book Quantity</ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl mb="4">
              <FormLabel color="white">Quantity</FormLabel>
              <Input
                type="number"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                required
                bg="gray.800"
                color="white"
                _placeholder={{ color: "gray.400" }}
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="full">
              Update Quantity
            </Button>
          </form>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default EditBookModal;
