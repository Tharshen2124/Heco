import { Button, Heading, Text, Box, Center, VStack, HStack, Image, Grid } from "@chakra-ui/react";
import LoginIllus from "../../public/login.svg"
import Imaged from "next/image";

export default function Login() {
  return (
    <>
    <Grid
      templateColumns={{ base: "1fr", md: "1fr 1fr" }} // For mobile (base) use 1 column, for desktop (md) use 2 columns
      gap="5"
      mt="3"
      mx="10"
    >
        <Box mt="10">
            <Heading>Welcome Back</Heading>
            <Text fontWeight="semibold" color="gray.600">Great to see you again</Text>  
            <Text fontWeight="semibold" color="gray.600">Enter your email and password below</Text>
        </Box>
        
        <Box>
            <Center my="16">
                <Imaged src={LoginIllus} alt="login svg" w={100}/>
            </Center>

            <VStack gap={3}>
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
                            color:"#ffffff",
                        },
                    }}
                >
                    <Center>
                    <HStack w="100%">
                        <Image src="./google.png" alt="locate-icon" width={4} height={4}/>
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
                            color:"#ffffff",
                        },
                    }}
                >
                    <Center>
                    <HStack w="100%">
                        <Image src="./facebook.png" alt="google-icon" width={4} height={4}/>
                        <Text>Continue with Facebook</Text>
                    </HStack>
                    </Center>
                </Button>    
            </VStack>
        </Box>
    </Grid>
    </>
  )
}
