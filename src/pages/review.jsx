import { 
  Container,
  Link,
  Heading,
  VStack,
  Flex,
  Text,
  Textarea
} from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"
import Image from 'next/image';
import hospitalPic from '../../public/hospital_cyberjaya.png';
import BlueButton from "@/components/BlueButton";

export default function Review() {
    return (
        <Container px={5} py={5}>
          <Link href="/">
            <ArrowBackIcon boxSize={5} />
          </Link>
          <Heading size="md" pt={5} mb={5}>
            Create a review
          </Heading>
          <VStack gap={25}>
            <Image
              src={hospitalPic}
              alt="hospital-picture"
              width={310}
              height={250}
            />
            <Flex direction="column" w="full" gap={2}>
              <Text
                fontSize="md"
                fontWeight="semibold"
                color="black"
              >
                Leave a review on Hospital Cyberjaya
              </Text>
              <Textarea
                placeholder="Comment here..."
                px={3}
                h={275}
                borderWidth="1px"
                bg="gray.200"
              />
            </Flex>
            <BlueButton text="Confirm" size="100%" mt={2}/>
          </VStack>
        </Container>
    )
}