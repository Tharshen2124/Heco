import BlueButton from "@/components/BlueButton";
import { Review } from "@/components/Review";
import { Box, Center, Heading, Image, VStack } from "@chakra-ui/react";
import { apiHandler } from "@/util/apiHandler";

export async function getData() 
{
  const data = await apiHandler.getReviewOfUser("1");
  return data
}


const data = await getData()

export default function Profile() 
{  
  return (
    <>
      {/* Profile with the name and email section */}
      <Box>
        <Center pt="4">
          <Image src="./profile.png" alt="" w={20} />
        </Center>
        <Center pt="2">
          <Heading as="h1" size="lg">
            {data[0].author_name}
          </Heading>
        </Center>
      </Box>

      {/* reviews and logout button section */}
      <Box as="section" mt="10" px="6">
        <VStack mt={3} px={-5} gap={5} >
          <Heading size="md" as="h5">
            My last reviews
          </Heading>
          {data.map(d => {
            return (
              <Review 
                key={d.author_id} 
                name={d.author_name}  
                review={d.review} 
                timestamp={d.timestamp} 
                image={d.image}
                maxW="container.md"
              />
            )
          })}
          <BlueButton text="Logout" size="100%" maxW="container.md" mt="10" />
        </VStack>
      </Box>
    </>
  );
}