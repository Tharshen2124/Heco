import { ArrowBackIcon, EditIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Container,
  Heading,
  Text,
  Box,
  HStack,
  Progress,
  Button,
  Divider,
  VStack,
  Tag,
  Flex,
  Center,
  Spinner,
  Image as ChakraImage,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { v4 } from "uuid";
import { Review } from "@/components/Review";
import { useRouter } from "next/router";
import { apiHandler } from "@/util/apiHandler";
import { useEffect, useState } from "react";
import Back from "../../../public/back.svg";
import Image from "next/image";
import SentimentIcon from "@/components/SentimentIcon";

export default function Details({
  facility_id,
  facility,
  review,
  images,
  data,
}) {
  const router = useRouter();
  const [cost, setCost] = useState(0);
  const [distance, setDistance] = useState(0);
  const [sentiment, setSentiment] = useState("");
  const [coordinate, setCoordinate] = useState({
    longitude: 101.61722,
    latitude: 3.064785,
  });

  function openGoogleMap() {
    // Create the URL with the destination
    const url =
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(facility.address);
    // Open the URL in a new tab/window
    window.open(url);
  }

  function openReview() {
    router.push(`/review/${facility_id}`);
  }

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

    navigator.geolocation.getCurrentPosition((position) => {
      setCoordinate({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      });
    });
  }, []);

  useEffect(() => {
    (async () => {
      const sources = [
        `${coordinate.longitude},${coordinate.latitude}`,
        `${facility.longitude},${facility.latitude}`,
      ].join(";");
      const url = `https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${sources}?sources=0&annotations=distance&access_token=${process.env.NEXT_PUBLIC_MAP_BOX_ACCESS_TOKEN}`;
      const response = await fetch(url);
      const res_data = await response.json();
      setDistance(res_data.distances[0][1] / 1000);
    })();
  }, [coordinate]);

  return (
    <>
      <Container px={[5, 0]} py={5} maxW={["100vw", "90vw"]} w={["100vw"]}>
        <Box
          _hover={{
            cursor: "pointer",
          }}
          w="40px"
        >
          <Image
            src={Back}
            alt="back"
            width="30px"
            height="30px"
            onClick={() => router.push("/")}
          />
        </Box>
        <Flex direction="column" alignItems="center">
          <Heading size="md" pt={5}>
            {facility.name}
          </Heading>
        </Flex>
        <VStack>
          <HStack pt={5}>
            <Swiper
              slidesPerView="auto"
              freeMode={true}
              modules={[FreeMode]}
              spaceBetween={20}
            >
              {images.map((i) => {
                return (
                  <SwiperSlide style={{ width: "auto" }} key={v4()}>
                    <ChakraImage
                      src={i}
                      width={300}
                      height={220}
                      style={{ borderRadius: "20px" }}
                      alt=""
                      objectFit={"cover"}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </HStack>
          <HStack pt={5}>
            <Text fontWeight="bold">Specialisation </Text>
            <SearchIcon />
          </HStack>
          <Flex direction="column" maxW="container.md" w="100%">
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
          </Flex>
        </VStack>

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
            <HStack pt={5}>
              <Text fontWeight="bold">Location </Text>
              <LocationOnIcon />
            </HStack>
            <Box
              bg="gray.200"
              borderRadius="10px"
              boxShadow="xl"
              mt={2}
              px={5}
              py={3}
            >
              <Text
                fontSize="sm"
                fontWeight="semibold"
                color="black"
                alignItems={"right"}
              >
                {facility.address}
              </Text>
            </Box>

            {facility.is24hour ? (
              <Tag
                fontWeight="bold"
                py={2}
                mt={5}
                fontSize="md"
                bg="blue"
                color="white"
                maxW="165px"
              >
                <HStack alignItems="flex-start">
                  <AccessTimeIcon
                    style={{
                      color: "white",
                      fontSize: "22px",
                    }}
                  />
                  <Text>Open 24 hours</Text>
                </HStack>
              </Tag>
            ) : (
              <>
                <HStack justifyContent="space-between" w="100%" pt={5}>
                  <Text w={40} fontWeight="bold">
                    Opening Time
                  </Text>
                  <HStack alignItems="center" gap={1}>
                    <AccessTimeIcon style={{ color: "blue" }} />
                    <Text color="blue" fontWeight="bold">
                      {facility.open_hour ? facility.open_hour + " AM" : "N/A"}
                    </Text>
                  </HStack>
                </HStack>
                <HStack justifyContent="space-between" w="100%" pt={5}>
                  <Text w={40} fontWeight="bold">
                    Closing Time
                  </Text>
                  <HStack alignItems="center" gap={1}>
                    <AccessTimeIcon style={{ color: "blue" }} />
                    <Text color="blue" fontWeight="bold">
                      {facility.close_hour
                        ? facility.close_hour + " PM"
                        : "Open 24 hours"}
                    </Text>
                  </HStack>
                </HStack>
              </>
            )}
            <Box
              bg="gray.200"
              borderRadius="10px"
              boxShadow="xl"
              mt={3}
              px={5}
              py={4}
            >
              <Text fontSize="md" fontWeight="semibold" color="black">
                Distance: {distance.toFixed(2)} km
              </Text>
              <HStack w="100%" justifyContent="space-between">
                <Text mt={2} fontSize="md" fontWeight="semibold" color="black">
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
            <Button
              mt={8}
              w="100%"
              maxW="container.md"
              bg="blue"
              color={"white"}
              _hover={{
                cursor: "pointer",
                backgroundColor: "#020ad4",
              }}
              _active={{
                backgroundColor: "#020ad4",
              }}
              onClick={openGoogleMap}
            >
              <LocationOnIcon /> Direction
            </Button>
          </Flex>

          <Flex
            direction="column"
            gap="10px"
            w={{ base: "100%", lg: "50%" }}
            maxW="container.md"
          >
            <HStack justifyContent="space-between" w="100%" pt={5}>
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
                <SentimentIcon sentiment={sentiment} />
                <Text fontWeight="bold">{sentiment}</Text>
              </HStack>
            </HStack>
            <Divider mt={2} bg="gray.800" borderWidth="1px" />
            <VStack mt={3} px={-5} gap={5}>
              {review.map((i) => {
                return <Review review={i} key={v4()} />;
              })}
              <Button
                mt={5}
                w="100%"
                maxW="container.md"
                bg="blue"
                color={"white"}
                _hover={{
                  cursor: "pointer",
                  backgroundColor: "#020ad4",
                }}
                _active={{
                  backgroundColor: "#020ad4",
                }}
                onClick={openReview}
              >
                <Center>
                  <EditIcon mr={2} />
                  <Text>Create Review</Text>
                </Center>
              </Button>
            </VStack>
          </Flex>
        </Flex>
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const facility = await apiHandler.getFacility(params.facility_id);
  const review = await apiHandler.getReviewOfFacility(params.facility_id);
  const images = await apiHandler.getFacilityImage(params.facility_id);
  return {
    props: {
      facility_id: params.facility_id,
      facility,
      review,
      images,
    },
  };
}
