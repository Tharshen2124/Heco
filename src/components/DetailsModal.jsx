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
import TagFacesIcon from "@mui/icons-material/TagFaces";
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

export default function DetailsModal({ facility, facilities }) {
  const router = useRouter();
  const [data, setData] = useState({})
  const [review, setReview] = useState([])
  const [images, setImages] = useState()
  const [tags, setTags] = useState({})

  useEffect(() => {
    const loadReview = async () => {
      const review = await apiHandler.getReviewOfFacility(facility);
      const images = await apiHandler.getFacilityImage(facility);
      setReview(review);
      setImages(images)
      console.log(images)
    };

    facilities.map((fac) => {
      if (fac.id === facility) {
        setData(fac);
      }
    });
    loadReview();
  }, [data, facilities, facility]);

  const changePage = () => {
    router.push(`/review/${data.id}`)
  };

  useEffect(() => {
    const temp = {};
    for (const i of facilities) {
      if( i.id == facility) {
        for(const j of i.tags) {
          temp[j] = true;
        }
      }
    }
    setTags({ ...temp });
  }, []);    

    return (
      <>
        <DrawerOverlay />
        <DrawerContent height="92vh" borderRadius="10px">
          <VStack>
            <DrawerCloseButton position="absolute" left="10px" top="15px" />
            <DrawerHeader>{data.name}</DrawerHeader>
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
                    {Object.keys(tags).map((i, index) => (
                      <SwiperSlide style={{ width: "auto" }} key={v4()}>
                        <Tag
                          bg={tags[i] ? "blue" : "white"}
                          color={tags[i] ? "white" : "black"}
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
                          marginRight={index === tags.length - 1 ? "10px" : 0}
                          onClick={() => toggleTags(i)}
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
                    Distance: 30km
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
                      colorScheme="red"
                      width="170px"
                      mt={3}
                      borderRadius={20}
                      value={60}
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
                  <HStack alignItems="center" color="#2DFF00" gap={1}>
                    <TagFacesIcon />
                    <Text fontWeight="bold">Mostly Positive</Text>
                  </HStack>
                </HStack>
                <Divider bg="gray.800" borderWidth="1px" />
                <VStack mt={3} px={-5} gap={5}>
                  {review.map((review, i) => {
                    if (i < 3) {
                      return <Review review={review} key={v4()}/>;
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
                    as={`/details/${data.id}`}
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
                  <Link href="/review/[facility_id]" as={`/review/${data.id}`}>
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
