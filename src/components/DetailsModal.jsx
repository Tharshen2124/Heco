import {
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  HStack,
  Text,
  Flex,
  Box,
  Progress,
  Divider,
  Button,
  Center,
  Tag,
  Spinner,
  Image as ChakraImage,
} from "@chakra-ui/react";
import { v4 } from "uuid";
import { Review } from "./Review";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { apiHandler } from "@/util/apiHandler";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SearchIcon } from "@chakra-ui/icons";
import SentimentIcon from "./SentimentIcon";

export default function DetailsModal({ facility_id, facilities }) {
  const router = useRouter();
  const [review, setReview] = useState([]);
  const [images, setImages] = useState();
  const [cost, setCost] = useState(0);
  const [sentiment, setSentiment] = useState("");
  const facility = facilities.filter((i) => i.id === facility_id)[0];

  useEffect(() => {
    let temp = 0;
    for (let i = 0; i < 5; i++) {
      temp += facility.cost_rating[i] * (i + 1);
    }
    temp /= facility.reviews.length;
    setCost(temp);

    const mx = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
      if (facility.sentiment[i] > mx[0]) {
        mx[0] = facility.sentiment[i];
        mx[1] = i;
        mx[2] = 0;
      }
      if (facility.sentiment[i] === mx[0]) {
        mx[2] += 1;
      }
    }

    if (mx[2] === 3) {
      setSentiment("Neutral");
    } else if (mx[2] === 2) {
      if (sentiment[2] === mx[0]) {
        setSentiment(sentiment[1] === mx[0] ? "Mostly Positive" : "Neutral");
      } else {
        setSentiment("Neutral");
      }
    } else {
      setSentiment(["Mostly Negative", "Neutral", "Mostly Positive"][mx[1]]);
    }

    const loadReview = async () => {
      const review = await apiHandler.getReviewOfFacility(facility_id);
      const images = await apiHandler.getFacilityImage(facility_id);
      setReview(review);
      setImages(images);
    };

    loadReview();
  }, []);

  const changePage = () => {
    router.push(`/review/${facility_id}`);
  };

  return (
    <>
      <DrawerOverlay />
      <DrawerContent height="92vh" borderRadius="10px">
        <VStack>
          <DrawerCloseButton position="absolute" left="10px" top="15px" />
          <DrawerHeader>{facility.name}</DrawerHeader>
        </VStack>
        <DrawerBody>
          <Flex justifyContent="center" alignItems="center">
            {images ? (
              <ChakraImage
                key={v4()}
                src={images[0]}
                alt="hospital-picture"
                width={250}
                height={175}
              />
            ) : (
              <Spinner />
            )}
          </Flex>
          <Flex
            gap={{ base: "10px", lg: "30px" }}
            direction={{ base: "column", lg: "row" }}
            mb="20"
            justifyContent={"center"}
            alignItems={{ base: "center", lg: "start" }}
            w="100%"
          >
            <Flex
              gap="10px"
              direction="column"
              maxW="container.md"
              w={{ base: "100%", lg: "50%" }}
            >
              <HStack pt={3}>
                <Text fontWeight="bold">Specialisation </Text>
                <SearchIcon />
              </HStack>
              <Divider bg="gray.800" borderWidth="1px" />
              <HStack overflowX="hidden" mt={2}>
                <Swiper
                  slidesPerView="auto"
                  freeMode={true}
                  modules={[FreeMode]}
                  spaceBetween={10}
                >
                  {facility.tags.map((i, index) => (
                    <SwiperSlide style={{ width: "auto" }} key={v4()}>
                      <Tag
                        px="20px"
                        py="10px"
                        borderRadius="10px"
                        userSelect="none"
                        fontSize="md"
                        transition={"all 0.2s"}
                        _hover={{
                          cursor: "pointer",
                          backgroundColor: "blue",
                          color: "white",
                        }}
                        marginLeft={index === 0 ? "10px" : 0}
                        marginRight={
                          index === facility.tags.length - 1 ? "10px" : 0
                        }
                      >
                        {i}
                      </Tag>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </HStack>
              <Box
                bg="gray.200"
                borderRadius="10px"
                boxShadow="xl"
                mt={3}
                px={5}
                py={4}
              >
                <Text fontSize="md" fontWeight="semibold" color="black">
                  Distance: {facility.distance.toFixed(2)} km
                </Text>
                <HStack w="100%" justifyContent="space-between">
                  <Text
                    mt={2}
                    fontSize="md"
                    fontWeight="semibold"
                    color="black"
                  >
                    Cost Rating:
                  </Text>
                  <Progress
                    colorScheme={
                      cost >= 4 ? "green" : cost >= 3 ? "yellow" : "red"
                    }
                    width="170px"
                    mt={3}
                    borderRadius={20}
                    value={(cost / 5) * 100}
                  />
                </HStack>
              </Box>
            </Flex>
            <Flex
              direction="column"
              gap="10px"
              w={{ base: "100%", lg: "50%" }}
              maxW="container.md"
            >
              <HStack justifyContent="space-between" w="100%" pt={3}>
                <Text fontWeight="bold">Reviews</Text>
                <HStack
                  alignItems="center"
                  color={
                    sentiment === "Mostly Positive"
                      ? "#2DFF00"
                      : sentiment === "Neutral"
                      ? "black"
                      : "red"
                  }
                  gap={1}
                >
                  <SentimentIcon sentiment={sentiment}/>
                  <Text fontWeight="bold">{sentiment}</Text>
                </HStack>
              </HStack>
              <Divider bg="gray.800" borderWidth="1px" />
              <VStack mt={3} px={-5} gap={5}>
                {review.map((review, i) => {
                  if (i < 3) {
                    return <Review review={review} facility={facility} key={v4()} />;
                  } else {
                    return (
                      <Center key={v4()}>
                        <Text
                          color="blue"
                          fontWeight="bold"
                          onClick={changePage}
                          mt={5}
                        >
                          Click view details to view more reviews
                        </Text>
                      </Center>
                    );
                  }
                })}
              </VStack>
              <HStack width="100%">
                <Link
                  href="/details/[facility_id]"
                  as={`/details/${facility.id}`}
                >
                  <Center>
                    <Button
                      maxW="container.md"
                      w="43%"
                      bg="#000AFF"
                      position="absolute"
                      bottom="15px"
                      left={["20px", "40px"]}
                      css={{
                        "&:hover": {
                          backgroundColor: "#020ad4",
                        },
                        "&:active": {
                          backgroundColor: "#020ad4",
                        },
                      }}
                    >
                      <Center>
                        <Text color="white">View Details</Text>
                      </Center>
                    </Button>
                  </Center>
                </Link>
                <Link
                  href="/review/[facility_id]"
                  as={`/review/${facility.id}`}
                >
                  <Center>
                    <Button
                      maxW="container.md"
                      w="43%"
                      borderColor="#000AFF"
                      borderWidth="3px"
                      bg="blue"
                      position="absolute"
                      bottom="15px"
                      right={["20px", "40px"]}
                      color={"white"}
                      _hover={{
                        backgroundColor: "#020ad4",
                      }}
                      _active={{
                        backgroundColor: "#020ad4",
                      }}
                    >
                      <Center>
                        <Text>Create Review</Text>
                      </Center>
                    </Button>
                  </Center>
                </Link>
              </HStack>
            </Flex>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </>
  );
}
