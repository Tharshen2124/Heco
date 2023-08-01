import {
  Button,
  Heading,
  Text,
  Flex,
  Box,
  Center,
  VStack,
  HStack,
  Image as ChakraImage,
  Grid,
} from "@chakra-ui/react";
import Back from '../../public/back.svg';
import LoginIllus from "../../public/login.svg";
import Image from "next/image";

export default function Login() {
  return (
    <>
      <Box position={'absolute'} top='10px' left='15px'>
          <Image src={Back} alt='back-icon'/>
      </Box>
      <Center>
          <Grid
            templateColumns={{ base: "1fr", md: "1fr 1fr" }} // For mobile (base) use 1 column, for desktop (md) use 2 columns
            justifyContent={'center'}
            alignItems={'center'}
            gap="5"
            w='100%'
            h='100vh'
            maxW='container.md'
            p='20px'
          >
            <Flex direction='column' alignItems={{base: 'start', md: 'center'}}>
                <Flex direction='column' gap='15px'>
                  <Heading size={'xl'}>Welcome Back,</Heading>
                  <Text fontWeight="semibold" color="gray.600">
                    Great to see you again
                  </Text>
                </Flex>
            </Flex>
            <VStack gap='30px'>
              <Center>
                <Image src={LoginIllus} alt="login svg" w={100} />
              </Center>
              <VStack gap={3} w='100%'>
                <Button
                  maxW="container.md"
                  w="100%"
                  bg="gray.100"
                  css={{
                    "&:hover": {
                      backgroundColor: "#020ad4",
                      color: "#ffffff",
                    },
                    "&:active": {
                      backgroundColor: "#020ad4",
                      color: "#ffffff",
                    },
                  }}
                >
                  <Center>
                    <HStack w="100%">
                      <ChakraImage
                        src="./google.png"
                        alt="google-icon"
                        width={4}
                        height={4}
                      />
                      <Text>Continue with Google</Text>
                    </HStack>
                  </Center>
                </Button>
                <Button
                  maxW="container.md"
                  w="100%"
                  bg="gray.100"
                  css={{
                    "&:hover": {
                      backgroundColor: "#020ad4",
                      color: "#ffffff",
                    },
                    "&:active": {
                      backgroundColor: "#020ad4",
                      color: "#ffffff",
                    },
                  }}
                >
                  <Center>
                    <HStack w="100%">
                      <ChakraImage
                        src="./facebook.png"
                        alt="facebook-icon"
                        width={4}
                        height={4}
                      />
                      <Text>Continue with Facebook</Text>
                    </HStack>
                  </Center>
                </Button>
              </VStack>
            </VStack>
          </Grid>
      </Center>
    </>
  );
}
