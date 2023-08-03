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
  Spinner,
} from "@chakra-ui/react";
import Back from '../../public/back.svg';
import LoginIllus from "../../public/login.svg";
import Image from "next/image";
import { auth } from "../../firebaseConfig";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import router from "next/router";

export default function Login() {
  const googleAuth = new GoogleAuthProvider();
  const [user, loading, error] = useAuthState(auth);
  const googleLogin = async () => {
    try {
      await signInWithRedirect(auth, googleAuth);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user]);

  return (
    <>
      {loading ? (
        <Center mt="300px">
          <Spinner
            thickness="8px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#3e3bf5"
            boxSize={20}
          />
        </Center>
      ) : (
        <Box m={[5, 10]}>
          <Image
            src={Back}
            alt="back"
            width="30px"
            height="30px"
            style={{
              cursor: "pointer",
            }}
            onClick={() => router.push("/")}
          />
          <Center>
            <VStack gap={10}>
              <Flex direction="column" mt={[10, 0]}>
                <Flex direction="column" gap="15px">
                  <Heading size="2xl">Welcome Back,</Heading>
                  <Text fontSize="lg" fontWeight="semibold" color="gray.600">
                    Great to see you again
                  </Text>
                </Flex>
              </Flex>
              <VStack gap="30px">
                <Center>
                  <Image
                    src={LoginIllus}
                    alt="login svg"
                    width={400}
                    height={400}
                  />
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
                      <HStack w="100%" onClick={googleLogin}>
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
                </VStack>
              </VStack>
            </VStack>
          </Center>
        </Box>
      )}
    </>
  );
}
