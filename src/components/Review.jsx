import { Avatar, HStack, VStack, Text, Box } from "@chakra-ui/react";

export const Review = () => {
  return (
    <Box bg="gray.100" borderRadius="10px" boxShadow="xl">
      <HStack px="4" py="4" gap="3">
        <Avatar alignSelf="flex-start" boxSize="1.7em" />
        <VStack gap={2}>
          <HStack justifyContent="space-between" w="100%">
            <Text fontSize="sm" fontWeight="bold" alignItems={"left"}>
              John Doe
            </Text>
            <Text
              fontSize="13px"
              fontWeight="semibold"
              color="gray.500"
              alignItems={"right"}
            >
              One hour ago
            </Text>
          </HStack>
          <Text fontSize="13px">
            I think the hospital is lit and really good. siodfdosdfjodsjf od
            nfosf osdfo sd sdof ds iofodjfo lsdfl jod osdf iosdjf osjd
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};
