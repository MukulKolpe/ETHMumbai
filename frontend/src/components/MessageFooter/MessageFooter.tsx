// @ts-nocheck comment
import React from "react";
import { Flex, Input, Button, Textarea } from "@chakra-ui/react";

const MessageFooter = ({
  inputMessage,
  setInputMessage,
  handleSendMessage,
}) => {
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
