import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Spinner

} from '@chakra-ui/react';
import { URL } from "../App";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${URL}/api/issuebooks/myhistory`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch history');
        }
        const historyData = await response.json();
        setHistory(historyData);
        // console.log(historyData);
      } catch (error) {
        // console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, []);


  if (!history) {
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
        <Text>Loading all history...</Text>
      </Box>
    );
  }

 

  return (
    <Box className="container mx-auto" bg="gray.700" color="white" p={2} minH={"100vh"}>
      <Heading as="h2" size="xl" fontWeight="bold" mb={8} mx={5}>
        Book History
      </Heading>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={6}>
        {history.map((item, index) => (
          <Box key={index} bg="gray.800" rounded="lg" shadow="md" p={4}>
            <Text color="green.300" fontWeight="semibold">
              Issue ID :  {item.issueId}
            </Text>
            <Heading as="h3" size="s"  fontWeight="semibold" mt={3}>
              Book Name :  {item.book.name.toUpperCase()}
            </Heading>
            <Text color="yellow.500" fontWeight="semibold" mt={3}>
              Author Name :  {item.book.author}
            </Text>
            <Text mt={3}>
              <strong>Issued Date : </strong> {item.issuedDate}
            </Text>
            <Text mt={3}>
              <strong>Return Date : </strong> {item.returnDate}
            </Text>
            <Text mt={3} >
              <strong>Days Left : </strong> {item.daysLeft}
            </Text>
            <Text mt={3} color="red.600">
              <strong>Late Fine : </strong> {item.lateFine}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default HistoryPage;
