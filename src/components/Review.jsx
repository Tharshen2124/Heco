import { Avatar, HStack, VStack, Text, Box } from "@chakra-ui/react";

export const Review = () => {
  return (
    <Box bg="gray.100" borderRadius="10px" boxShadow="xl">
      <HStack px="5" py="5" gap="3">
        <Avatar alignSelf="flex-start" size="md" boxSize='2em'/>
        <VStack gap={2}>
          <HStack justifyContent="space-between" w="100%">
            <Text fontSize="md" fontWeight="bold" alignItems={"left"}>
              John Doe
            </Text>
            <Text
              fontSize="sm"
              fontWeight="semibold"
              color="gray.500"
              alignItems={"right"}>
              One hour ago
            </Text>
          </HStack>
          <Text fontSize="sm">
            I think the hospital is lit and really good. siodfdosdfjodsjf od
            nfosf osdfo sd sdof ds iofodjfo lsdfl jod osdf iosdjf osjd
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
}