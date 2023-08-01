import BlueButton from "@/components/BlueButton";
import { Review } from "@/components/Review";
import { Box, Center, Heading, Image, VStack, useToast } from "@chakra-ui/react";
import { apiHandler } from "@/util/apiHandler";
import { auth } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

export async function getData() 
{
  const data = await apiHandler.getReviewOfUser("1");
  return data
}

const data = await getData()

export default function Profile() 
{  
  const [user, loading, error] = useAuthState(auth);
  const defaultImage =
    "https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png";

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
            {data[0].author_name}
          </Heading>
        </Center>
      </Box>

      {/* reviews and logout button section */}
      <Box as="section" mt="10" px="6">
        <VStack mt={3} px={-5} gap={5}>
          <Heading size="md" as="h5">
            My last reviews
          </Heading>
          {data.map((d) => {
            return (
              <Review
                key={d.author_id}
                name={d.author_name}
                review={d.review}
                timestamp={d.timestamp}
                image={d.image}
                maxW="container.md"
              />
            );
          })}
          <BlueButton
            text="Logout"
            size="100%"
            maxW="container.md"
            mt="10"
          />
        </VStack>
      </Box>
    </>
  );
}