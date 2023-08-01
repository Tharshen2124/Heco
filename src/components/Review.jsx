import { Avatar, HStack, VStack, Text, Box, Spacer } from "@chakra-ui/react";
import { timeAgo } from "@/util/timeAgo";
import { Image } from "@chakra-ui/image";

export const Review = ({ review }) => {
  return (
    <Box
      bg="gray.100"
      borderRadius="10px"
      boxShadow="xl"
      pb="5"
      px="5"
      w="100%"
      maxW="70%"
      display="flex"
      alignItems="center"
    >
      <Image src={review.image} alt="" w="4%" h="4%" borderRadius="100%" />
      <VStack alignItems="left" w="100%" pl={5}>
        <HStack
          justifyContent="space-between"
          w="100%"
          pt={5}
          alignItems={"left"}
        >
          <Text fontWeight="bold">{review.author_name}</Text>
          <HStack alignItems="center" color="gray.600">
            <Text fontSize="sm">{timeAgo(review.timestamp)}</Text>
          </HStack>
        </HStack>
        <Text fontSize="md">{review.review}</Text>
      </VStack>
    </Box>
  );
};
