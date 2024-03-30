// @ts-nocheck comment
import React, { useState, useEffect } from "react";
import { Flex, Input, Button, Textarea } from "@chakra-ui/react";
import OnChainVerifierAbi from "../../utils/OnChainVerifierAbi.json";
import {
  AnonAadhaarProof,
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  useProver,
} from "@anon-aadhaar/react";
import { AnonAadhaarCore, packGroth16Proof } from "@anon-aadhaar/core";
import { ethers } from "ethers";

const MessageFooter = ({
  inputMessage,
  setInputMessage,
  handleSendMessage,
}) => {
  const [anonAadhaar] = useAnonAadhaar();
  const [, latestProof] = useProver();
  const [verifiedUser, setVerifiedUser] = useState(false);

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
      "0xf702449AD852Bf44A5BAc29a426c40641De5A193",
      OnChainVerifierAbi,
      signer
    );
    const tempNullifier = JSON.parse(latestProof);
    const resp = await onchainverifierContract.verifiedNullifiers(
      tempNullifier.nullifier
    );
    console.log(resp);
  };
  return (
    <Flex w="100%" mt="5" border="3px" borderColor="teal.600" mb="5">
      <Textarea
        placeholder="Do share you honest review here..."
        borderRadius="none"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <Button
        bg="teal.500"
        color="white"
        borderRadius="none"
        mt="8"
        ml="4"
        _hover={{
          bg: "teal.800",
          color: "white",
          border: "1px solid teal.200",
        }}
        disabled={inputMessage.trim().length <= 0}
        onClick={handleSendMessage}
      >
        Send
      </Button>
    </Flex>
  );
};

export default MessageFooter;
