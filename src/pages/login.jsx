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
import { auth } from "../../firebaseConfig";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import router from "next/router";

export default function Login() {
  const googleAuth = new GoogleAuthProvider();
  const [user, setuser] = useAuthState(auth);
  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, googleAuth);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      router.push({
        pathname: "/",
        query: { image: user.photoURL },
      });
    }
  }, [user]);

  return (
    <>
      <Center>
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }} // For mobile (base) use 1 column, for desktop (md) use 2 columns
          justifyContent={"center"}
          alignItems={"center"}
          gap={{ sm: 5, md: 200 }}
          w="100%"
          h="100vh"
          maxW="container.xl"
          p="20px"
        >
          <Flex direction="column" alignItems={{ base: "start", md: "center" }}>
            <Flex direction="column" gap="15px">
              <Heading size="2xl">Welcome Back,</Heading>
              <Text fontSize="lg" fontWeight="semibold" color="gray.600">
                Great to see you again
              </Text>
            </Flex>
          </Flex>
          <VStack gap="30px">
            <Center>
              <Image src={LoginIllus} alt="login svg" width={400} height={400} />
            </Center>
            <VStack gap={3} w="100%">
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
