import BlueButton from "@/components/BlueButton";
import { Review } from "@/components/Review";
import { Box, Center, Heading, Image, VStack, Text, useToast } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig";
import { useEffect } from "react";
import { useRouter } from "next/router";


export default function Profile() {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const toast = useToast();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast({ title: "Logout successfully", status: "success" });
      router.push("/login");
    } catch (error) {
      console.error("Error while logging out:", error);
    }
  };

  return (
    <>
      {/* Profile with the name and email section */}
      <Box>
        <Center pt="4">
          <Image src="./profile.png" alt="" w={20} />
        </Center>
        <Center pt="2">
          <Heading as="h1" size="lg">
            John Doe
          </Heading>
        </Center>
        <Center>
          <Text fontSize={14} fontWeight={"semibold"} as="h4" color="gray.400">
            johndoe@gmail.com
          </Text>
        </Center>
      </Box>

      {/* reviews and logout button section */}
      <Box as="section" mt="10" px="6">
        <VStack mt={3} px={-5} gap={5}>
          <Heading size="md" as="h5">
            My last reviews
          </Heading>
          <Review />
          <Review />
          <Review />
          <BlueButton
            text="Logout"
            size="100%"
            maxW="740px"
            mt="10"
            onClick={handleLogout}
          />
        </VStack>
      </Box>
    </>
  );
}
