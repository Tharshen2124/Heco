import React from 'react'
import {
  Button,
  Center,
  Heading,
  VStack,
  Text,
  Flex,
  HStack,
} from "@chakra-ui/react";
import Image from 'next/image';
import ErrorIllus from "../../public/404.svg";
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

export default function Error() {
  const router = useRouter();

  return (
    <Center mx={[5, 0]}>
      <VStack gap={10}>
        <Flex direction="column" mt={10}>
          <VStack>
            <Heading size="2xl" color="blue">Sorry</Heading>
            <Text fontSize="xl" fontWeight="semibold" color="gray.600">
              This page doesn&apos;t exist
            </Text>
          </VStack>
        </Flex>
        <Center>
          <Image src={ErrorIllus} alt="error svg" width={400} height={400} />
        </Center>
        <VStack gap={3} w="100%">
          <Button
            maxW="container.md"
            w="100%"
            bg="#020ad4"
            color="white"
            _hover={{
              bg: "gray.200",
              color: "#020ad4",
            }}
          >
            <Center>
                <HStack w="100%" onClick={() => 
                  router.push("/")
                }>
                  <ArrowBackIcon boxSize={5} />
                  <Text>Back to main page</Text>
                </HStack>
            </Center>
          </Button>
        </VStack>
      </VStack>
    </Center>
  );
}