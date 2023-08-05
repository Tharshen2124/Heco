import { Avatar, HStack, VStack, Text, Box, Spacer, Flex } from "@chakra-ui/react";
import { timeAgo } from "@/util/timeAgo";
import { Image } from "@chakra-ui/image";
import { useState } from "react";

export const Review = ({ review, facility }) => {
  const defaultImage = "/default_img.png";
  const [useDefault, setUseDefault] = useState(false);
  return (
    <Flex bg="gray.100" borderRadius="10px" boxShadow="xl" p="10px" w="100%">
      <Image src={(useDefault ? defaultImage : review.image)} onError={() => setUseDefault(true)} alt="" w="40px" h="40px" borderRadius="100%" />
      <VStack alignItems="left" w="100%" pl={5}>
        <HStack justifyContent="space-between" w="100%" alignItems={"left"}>
          <Text fontWeight="bold">{review.author_name}</Text>
          <HStack alignItems="center" color="gray.600">
            <Text fontSize="sm">{timeAgo(review.timestamp)}</Text>
          </HStack>
        </HStack>
        {facility ? (
          <Text fontSize="sm" fontWeight="semibold" color="blue">
            {facility.name}
          </Text>
        ) : null}
        <Text fontSize="md">{review.review}</Text>
      </VStack>
    </Flex>
  );
};
