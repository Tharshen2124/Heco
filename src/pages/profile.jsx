import { Review } from "@/components/Review";
import {
  Box,
  Button,
  Center,
  Heading,
  Spinner,
  VStack,
  Text,
  Image as ChakraImage,
} from "@chakra-ui/react";
import { apiHandler } from "@/util/apiHandler";
import { auth } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 } from "uuid";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Back from "../../public/back.svg";
import Image from "next/image";

export default function Profile({ reviewdata }) {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = useState([]);
  const defaultImage =
    "https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png";
  const [facility, setFacility] = useState("");

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast({ title: "Logout successfully", status: "success" });
    } catch (error) {
      console.error("Error while logging out:", error);
    }
  };

  const login = () => {
    router.push("/login");
  };

  useEffect(() => {
    if (user) {
      (async () => {
        const res = await apiHandler.getReviewOfUser(user.uid);
        setData(res);
        for(const i in res){
          for(const j in reviewdata){
            if(res[i].facility_id == reviewdata[j].id){
              setFacility(reviewdata[j]);
            }
          }
        }
      })();
    } else {
      setData([]);
    }
  }, [user]);

  return (
    <>
      <Box m={[5, 8]}>
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
      </Box>
      <Center mt={-10}>
        {loading ? (
          <Center mt="150px">
            <Spinner
              thickness="8px"
              speed="0.65s"
              emptyColor="gray.200"
              color="#3e3bf5"
              boxSize={20}
            />
          </Center>
        ) : (
          <Box maxW={"container.sm"} w={"100%"}>
            {/* Profile with the name and email section */}
            <VStack gap="20px">
              <Center>
                <ChakraImage
                  src={user ? user.photoURL : defaultImage}
                  style={{ borderRadius: "100%" }}
                  alt=""
                  w={"100px"}
                  boxShadow={"lg"}
                  border={"3px solid blue"}
                />
              </Center>
              <Center pt="2">
                <Heading as="h1" fontSize={"25px"}>
                  {user ? user.displayName : "User"}
                </Heading>
              </Center>
            </VStack>

            {/* reviews and logout button section */}
            <Box as="section" mt="10" px="6" mb="10">
              <VStack mt={3} px={-5} gap={5}>
                <Heading size="md" as="h5">
                  My last reviews
                </Heading>

                {user ? (
                  <>
                    {data.length > 0 ? (
                      data.map((d) => {
                        return <Review key={v4()} review={d} facility={facility} />;
                      })
                    ) : (
                      <Text>You have made no review yet!</Text>
                    )}
                    <Button
                      bg="blue"
                      color="white"
                      w={["50%", "20%"]}
                      _hover={{
                        backgroundColor: "#020ad4",
                      }}
                      _active={{
                        backgroundColor: "#020ad4",
                      }}
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    bg="blue"
                    color="white"
                    w="250px"
                    _hover={{
                      backgroundColor: "#020ad4",
                    }}
                    _active={{
                      backgroundColor: "#020ad4",
                    }}
                    onClick={login}
                  >
                    Login to see your reviews
                  </Button>
                )}
              </VStack>
            </Box>
          </Box>
        )}
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  const facilities = await apiHandler.getFacilities();
  return {
    props: {
      reviewdata: facilities,
    },
  };
}