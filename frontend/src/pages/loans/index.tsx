// @ts-nocheck comment
import React, { useState, useEffect } from "react";
import CardComponent from "../../components/CardComponent/CardComponent";
import { CloseIcon } from "@chakra-ui/icons";
import {
  Grid,
  GridItem,
  Center,
  Button,
  Flex,
  Stack,
  useColorModeValue,
  Heading,
  FormControl,
  Box,
  FormLabel,
  Input,
  Container,
  Spinner,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import LoanManager from "../../utils/LoanManager.json";
import { ALLLOANS } from "@/utils/apollo/queries";
import { useQuery, gql } from "@apollo/client";

export default function Loans() {
  const [loans, setLoans] = useState([]);
  const { loading, error, data } = useQuery(ALLLOANS);

  return (
    <>
      {loading && (
        <Flex justifyContent="center" alignItems="center" height="85vh">
          <Spinner size="xl" />
        </Flex>
      )}
      {data && (
        <Grid
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(3, 1fr)"
          gap={4}
          mr={6}
        >
          {data?.loanCreateds.map((item) => {
            return (
              <GridItem rowSpan={1} colSpan={1}>
                <CardComponent address={item.loanContract} />
              </GridItem>
            );
          })}
        </Grid>
      )}

      {error && (
        <Box textAlign="center" py={10} px={6} mt={10}>
          <Box display="inline-block">
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              bg={"red.500"}
              rounded={"50px"}
              w={"55px"}
              h={"55px"}
              textAlign="center"
            >
              <CloseIcon boxSize={"20px"} color={"white"} />
            </Flex>
          </Box>
          <Heading as="h2" size="xl" mt={6} mb={2} mt={6}>
            Error fetching Loans : {error.name}
          </Heading>
        </Box>
      )}
    </>
  );
}
