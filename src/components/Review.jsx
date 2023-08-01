import { Avatar, HStack, VStack, Text, Box, Spacer } from "@chakra-ui/react";
import { Image } from "@chakra-ui/image";

import { timeAgo } from "@/util/timeAgo";
export const Review = ({ name, review, timestamp, image, maxW = null }) => {
  return (
    <Box
      bg="gray.100"
      borderRadius="10px"
      boxShadow="xl"
      pb="5"
      px="5"
      w="100%"
      maxW={maxW}
      display="flex"
      alignItems="center"
    >
      <Image src={image} alt="" w="5%" h="5%" borderRadius="100%" />
      <VStack alignItems="left" w="100%" pl={5}>
        <HStack
          justifyContent="space-between"
          w="100%"
          pt={5}
          alignItems={"left"}
        >
          <Text fontWeight="bold">{name}</Text>
          <HStack alignItems="center" color="gray.600">
            <Text fontSize="sm">{timeAgo(timestamp)}</Text>
          </HStack>
        </HStack>
        <Text fontSize="md">{review}</Text>
      </VStack>
    </Box>
  );
};
