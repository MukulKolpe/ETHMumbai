// @ts-nocheck comment
"use client";

import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Divider,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Nftabi from "../../utils/NFT.json";
import OnChainVerifierAbi from "../../utils/OnChainVerifierAbi.json";
import Messages from "../../components/Messages/Messages";
import MessageFooter from "../../components/MessageFooter/MessageFooter";
import { ethers } from "ethers";
import {
  AnonAadhaarProof,
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  useProver,
} from "@anon-aadhaar/react";
import { AnonAadhaarCore, packGroth16Proof } from "@anon-aadhaar/core";

const IndividualNFT = () => {
  const router = useRouter();
  const [imageURI, setImageURI] = useState("");
  const [anonAadhaar] = useAnonAadhaar();
  const [, latestProof] = useProver();
  const [verifiedUser, setVerifiedUser] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi, My Name is HoneyChat" },
    { text: "Hey there" },
    { text: "Myself Ferin Patel" },
    {
      text: "Nice to meet you. You can send me message and i'll reply you with same message.",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const getIdentityParams = async () => {
    let proofObj = JSON.parse(latestProof);
    console.log(proofObj);
    console.log(proofObj.proof.groth16Proof);
    const PackedGroth16Proof = packGroth16Proof(proofObj.proof.groth16Proof);
    console.log(PackedGroth16Proof);
  };

  const checkVerification = async () => {
    if (anonAadhaar.status === "logged-in") {
      console.log("The user has connected aadhar");
      console.log(latestProof);
    }
  };

  const checkOnchainVerification = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const onchainverifierContract = new ethers.Contract(
      "0x278BD277EFBFD4647AaaCDa36A330759C1D7640f",
      OnChainVerifierAbi,
      signer
    );
    console.log(onchainverifierContract);
    const tempNullifier = JSON.parse(latestProof);
    console.log(tempNullifier);
    const resp = await onchainverifierContract.checkNullifier(
      BigInt(tempNullifier.proof.nullifier)
    );
    console.log(resp);
    if (resp) {
      setVerifiedUser(true);
      return true;
    }
    return false;
  };

  const onLoad = async () => {
    const { nftId } = router.query;
    console.log(nftId);
    if (nftId) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const nftcontract = new ethers.Contract(
        "0xa672510ccDdBa29202559b88840Bc04629B79c95",
        Nftabi,
        signer
      );
      const tokenURI = await nftcontract.tokenURI(nftId);
      setImageURI(tokenURI);
      console.log(imageURI);
      checkVerification();
      const res = await fetch(`/api/get-critics`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nftId: nftId,
        }),
      });
      const data = await res.json();
      console.log(data);
      setMessages(data);
    }
  };

  useEffect(() => {
    if (router) {
      onLoad();
    }
  }, [router]);

  const handleSendMessage = async () => {
    const { nftId } = router.query;
    if (!inputMessage.trim().length) {
      return;
    }
    const data = inputMessage;
    const res1 = await checkOnchainVerification();
    if (!res1) {
      console.log("Identity not verified");
      return;
    }
    setMessages((old) => [...old, { comment_body: data }]);
    setInputMessage("");
    const res = await fetch(`/api/send-critics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nftId: nftId,
        commentBody: data,
      }),
    });
    const dataapi = await res.json();
    console.log(dataapi);
  };

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={imageURI}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              Share your thoughts!
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
            >
              ETHMumbai NFTs
            </Text>
          </Box>
          <Flex w="90%" h="90%" flexDir="column" pb="3">
            <MessageFooter
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              handleSendMessage={handleSendMessage}
            />
            <Divider />
            <Messages messages={messages} />
          </Flex>
        </Stack>
      </SimpleGrid>
    </Container>
  );
};

export default IndividualNFT;
