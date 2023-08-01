import { Review } from "@/components/Review";
import { Box, Button, Center, Heading, Image, VStack } from "@chakra-ui/react";
import { apiHandler } from "@/util/apiHandler";
import { auth } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 } from "uuid";
import { useEffect, useState } from "react";

export default function Profile() {
  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = useState([]);
  const defaultImage =
    "https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png";

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast({ title: "Logout successfully", status: "success" });
      router.push("/");
    } catch (error) {
      console.error("Error while logging out:", error);
    }
  };

  useEffect(() => {
    if (user) {
      (async () => {
        const res = await apiHandler.getReviewOfUser(user.uid);
        setData(res);
      })();
    }
  }, [user]);

  return (
    <>
      {/* Profile with the name and email section */}
      <Box>
        <Center pt="4">
          <Image
            src={user ? user.photoURL : defaultImage}
            style={{ borderRadius: "100%" }}
            alt=""
            w={20}
          />
        </Center>
        <Center pt="2">
          <Heading as="h1" size="lg">
            {user ? user.displayName : "User"}
          </Heading>
        </Center>
      </Box>

      {/* reviews and logout button section */}
      <Box as="section" mt="10" px="6" mb="10">
        <VStack mt={3} px={-5} gap={5}>
          <Heading size="md" as="h5">
            My last reviews
          </Heading>
          {data.map((d) => {
            return (
              <Review
                key={v4()}
                review={d}
              />
            );
          })}
          <Button
            bg="blue"
            color="white"
            w={["50%", "20%"]}
            _hover={{ bg: "gray.200", color: "blue" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </VStack>
      </Box>
    </>
  );
}
