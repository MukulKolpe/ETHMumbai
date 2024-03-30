// @ts-nocheck comment
import React, { useEffect, useRef } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { generateRandomAvatarOptions } from "../../utils/avatar";
import Avatar from "avataaars";

const Messages = ({ messages }) => {
  return (
    <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3">
      {messages.map((item, index) => {
        return (
          <Flex key={index} w="100%" mt="6">
            <Avatar
              size={"sm"}
              style={{
                width: "40px",
                height: "40px",
              }}
              avatarStyle="Circle"
              {...generateRandomAvatarOptions()}
            />
            <Flex
              bg="teal.600"
              color="white"
              minW="100px"
              maxW="350px"
              my="1"
              p="3"
            >
              <Text>{item.comment_body}</Text>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default Messages;
