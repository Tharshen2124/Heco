import { Avatar, HStack, VStack, Text, Box, Spacer } from "@chakra-ui/react";
import {timeAgo} from "@/util/timeAgo"
export const Review = ({ review }) => {
  
  return (
    <Box bg="gray.100" borderRadius="10px" boxShadow="xl" py="5" px="5" w="100%"> 
        <HStack>
          <Avatar alignSelf="flex-start" boxSize="1.7em" />
          <Text fontSize="md" fontWeight="bold" alignItems={"left"}>
            {review.author_name}
          </Text>
          <Spacer />
          <Text fontSize="13px" fontWeight="semibold"color="gray.500">
            {timeAgo(review.timestamp)}
          </Text>
        </HStack>
        <Text fontSize="14px" pl="10">
          {review.review}
        </Text>
    </Box>
  );
};