// @ts-nocheck comment
import React, { useEffect, useState } from "react";
import {
  AnonAadhaarProof,
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  useProver,
} from "@anon-aadhaar/react";
import { AnonAadhaarCore, packGroth16Proof } from "@anon-aadhaar/core";
import { useAccount } from "wagmi";
import {
  SimpleGrid,
  FormHelperText,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Textarea,
  Heading,
  useToast,
  Avatar,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Box,
  Link,
  useColorModeValue,
  FormControl,
  FormLabel,
  Icon,
  Input,
  VisuallyHidden,
  chakra,
  Grid,
  GridItem,
  Tooltip,
  VStack,
  Divider,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  TabPanels,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Radio,
  RadioGroup,
  Select,
} from "@chakra-ui/react";

const AadharLogin = () => {
  const [anonAadhaar] = useAnonAadhaar();
  const [, latestProof] = useProver();
  const { isConnected, address } = useAccount();
  const [size, setSize] = useState("md");
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  const handleSizeClick = (newSize) => {
    setSize(newSize);
    onAddOpen();
  };

  useEffect(() => {
    if (anonAadhaar.status === "logged-in") {
      console.log(anonAadhaar.status);
    }
  }, [anonAadhaar]);

  let nullifierSeedString = "19566981402436238301701121519446139147227";
  let nullifierBigInt = BigInt(nullifierSeedString);

  const getIdentityParams = async () => {
    let proofObj = JSON.parse(latestProof);
    console.log(proofObj);
    console.log(proofObj.proof.groth16Proof);
    const PackedGroth16Proof = packGroth16Proof(proofObj.proof.groth16Proof);
    console.log(PackedGroth16Proof);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-evenly"
      alignItems="center"
      height="80vh"
      flexDir={{ base: "column", md: "row" }}
    >
      <Box textDecoration="none" _hover={{ textDecoration: "none" }}>
        <Image
          borderRadius="lg"
          src="/assets/anonAadhar.png"
          alt="Anon Aadhaar Logo"
          objectFit="contain"
          width={{ base: 300, md: 375 }}
          // width={275}
        />
      </Box>
      <Box
        width={{ base: "100%", md: "50%" }}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={{ base: "column", md: "row" }}
        gap={4}
        overflow-y={"auto"}
      >
        {isConnected && (
          <Flex
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <LogInWithAnonAadhaar
              nullifierSeed={nullifierBigInt}
              signer={address}
            />
            <p>{anonAadhaar?.status}</p>
            {anonAadhaar.status === "logged-in" && (
              <>
                <Text mt={4}>✅ Proof is valid</Text>
                <Text>Got your Aadhaar Identity Proof</Text>

                <Flex mt={6} justifyContent={"center"} alignItems={"center"}>
                  <Button
                    mt="2%"
                    m={2}
                    onClick={() => handleSizeClick("xl")}
                    colorScheme="teal"
                  >
                    Show proof
                  </Button>
                  <Modal
                    isOpen={isAddOpen}
                    onClose={onAddClose}
                    width={"500px"}
                  >
                    <ModalOverlay backdropFilter="blur(4px)" />
                    <ModalContent maxW={"700px"} minW={"600px"}>
                      <ModalHeader>Anon Aadhaar Proof</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        {latestProof && (
                          <AnonAadhaarProof
                            code={JSON.stringify(
                              JSON.parse(latestProof),
                              null,
                              2
                            )}
                            overflowY={"auto"}
                          />
                        )}
                      </ModalBody>
                    </ModalContent>
                  </Modal>

                  <Button
                    onClick={() => {
                      getIdentityParams();
                    }}
                    ml={4}
                  >
                    Get Identity Params
                  </Button>
                </Flex>
              </>
            )}
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default AadharLogin;
