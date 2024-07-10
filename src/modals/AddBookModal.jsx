// import React, { useState } from 'react';
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   FormControl,
//   FormLabel,
//   Input,
//   Button,
//   useToast,
// } from '@chakra-ui/react';
// import { URL } from "../App";

// const AddBookModal = ({ isOpen, onClose, onAddBook }) => {
//   const [name, setName] = useState('');
//   const [author, setAuthor] = useState('');
//   const [qty, setQty] = useState('');
//   const [imageURL, setImageURL] = useState('');
//   const toast = useToast();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newBook = { name, author, qty, image: imageURL };

//     try {
//       const res = await fetch(`${URL}/api/book/addbook`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify(newBook),
//       });

//       const data = await res.json();
      
//       if (res.ok) {
//         onAddBook(data.book);
//         toast({
//           title: 'Success',
//           description: data.msg,
//           status: 'success',
//           duration: 5000,
//           isClosable: true,
//           position:"top"
//         });
//         onClose();
//         setName('');
//         setAuthor('');
//         setQty('');
//         setImageURL('');
//       } else {
//         toast({
//           title: 'Error',
//           description: data.msg,
//           status: 'error',
//           duration: 5000,
//           isClosable: true,
//           position:"top"
//         });
//       }
//     } catch (err) {
//       // console.error(err);
//       toast({
//         title: 'Server error.',
//         description: '',
//         status: 'error',
//         duration: 5000,
//         isClosable: true,
//         position:"top"
//       });
//     }
//   };

//   const handleClose = () => {
//     setName('');
//     setAuthor('');
//     setQty('');
//     setImageURL('');
//     onClose();
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={handleClose} isCentered>
//       <ModalOverlay />
//       <ModalContent rounded="lg" boxShadow="lg" bg="gray.700" mx="2">
//         <ModalHeader color="white">Add Book</ModalHeader>
//         <ModalCloseButton color="white" />
//         <ModalBody>
//           <form onSubmit={handleSubmit}>
//             <FormControl mb="4">
//               <FormLabel color="white">Book Name</FormLabel>
//               <Input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//                 bg="gray.800"
//                 color="white"
//                 _placeholder={{ color: "gray.400" }}
//               />
//             </FormControl>
//             <FormControl mb="4">
//               <FormLabel color="white">Author</FormLabel>
//               <Input
//                 type="text"
//                 value={author}
//                 onChange={(e) => setAuthor(e.target.value)}
//                 required
//                 bg="gray.800"
//                 color="white"
//                 _placeholder={{ color: "gray.400" }}
//               />
//             </FormControl>
//             <FormControl mb="4">
//               <FormLabel color="white">Quantity</FormLabel>
//               <Input
//                 type="number"
//                 value={qty}
//                 onChange={(e) => setQty(e.target.value)}
//                 required
//                 bg="gray.800"
//                 color="white"
//                 _placeholder={{ color: "gray.400" }}
//               />
//             </FormControl>
//             <FormControl mb="4">
//               <FormLabel color="white">Image URL</FormLabel>
//               <Input
//                 type="text"
//                 value={imageURL}
//                 onChange={(e) => setImageURL(e.target.value)}
//                 bg="gray.800"
//                 color="white"
//                 _placeholder={{ color: "gray.400" }}
//               />
//             </FormControl>
//             <Button type="submit" colorScheme="blue" width="full">
//               Add Book
//             </Button>
//           </form>
//         </ModalBody>
//         <ModalFooter />
//       </ModalContent>
//     </Modal>
//   );
// };

// export default AddBookModal;

import React, { useState } from 'react';
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

const AddBookModal = ({ isOpen, onClose, onAddBook }) => {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [qty, setQty] = useState('');
  const [image, setImage] = useState(null);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('author', author);
    formData.append('qty', qty);
    if (image) {
      formData.append('image', image);
    }

    try {
      const res = await fetch(`${URL}/api/book/addbook`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      const data = await res.json();
      
      if (res.ok) {
        onAddBook(data.book);
        toast({
          title: 'Success',
          description: data.msg,
          status: 'success',
          duration: 5000,
          isClosable: true,
          position:"top"
        });
        onClose();
        setName('');
        setAuthor('');
        setQty('');
        setImage(null);
      } else {
        toast({
          title: 'Error',
          description: data.msg,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position:"top"
        });
      }
    } catch (err) {
      // console.error(err);
      toast({
        title: 'Server error.',
        description: '',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position:"top"
      });
    }
  };

  const handleClose = () => {
    setName('');
    setAuthor('');
    setQty('');
    setImage(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay />
      <ModalContent rounded="lg" boxShadow="lg" bg="gray.700" mx="2">
        <ModalHeader color="white">Add Book</ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl mb="4">
              <FormLabel color="white">Book Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                bg="gray.800"
                color="white"
                _placeholder={{ color: "gray.400" }}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel color="white">Author</FormLabel>
              <Input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                bg="gray.800"
                color="white"
                _placeholder={{ color: "gray.400" }}
              />
            </FormControl>
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
            <FormControl mb="4">
              <FormLabel color="white">Image</FormLabel>
              <Input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                bg="gray.800"
                color="white"
                pt={1}
                
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="full">
              Add Book
            </Button>
          </form>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default AddBookModal; 
