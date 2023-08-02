import { ArrowBackIcon, SearchIcon } from '@chakra-ui/icons'
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
import { Swiper, SwiperSlide } from 'swiper/react'
import {FreeMode} from 'swiper/modules';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { v4 } from 'uuid';
import { Review } from '@/components/Review';
import { useRouter } from 'next/router';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebaseConfig";
import { apiHandler } from "@/util/apiHandler";
import { useEffect, useState } from 'react';
import Back from "../../../public/back.svg";
import Image from "next/image";

export default function Details({ facility, review, images }) {
    const router = useRouter();
    const facility_id = router.query.facility_id;
    const [user, loading, error] = useAuthState(auth);
    const [tags, setTags] = useState({});

    useEffect(() => {
      if (!user && !loading){
          router.push('/login');
      }
    },[user, loading, error, router])

    useEffect(() => {
      const temp = {};
      for (const i of facility.tags) {
        temp[i] = true;
      }
      setTags({ ...temp });
    }, []);    

    return (
      <>
        {loading ? (
          <Center mt="300px">
            <Spinner
              thickness="8px"
              speed="0.65s"
              emptyColor="gray.200"
              color="#3e3bf5"
              boxSize={20}
            />
          </Center>
        ) : (
          <Container px={[5, 0]} py={5} maxW={["100vw", "90vw"]} w={["100vw"]}>
            <Box
              _hover={{
                cursor: "pointer",
              }}
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

            <Flex justifyContent="center" alignItems="center">
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
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </HStack>
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
                          {facility.open_hour
                            ? facility.open_hour + " AM"
                            : "N/A"}
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
                  <Text
                    mt={2}
                    fontSize="md"
                    fontWeight="semibold"
                    color="black"
                  >
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
                      width={["180px", "350px", "450px"]}
                      mt={2}
                      borderRadius={20}
                      value={60}
                    />
                  </HStack>
                </Box>
                <Button
                  bg="gray.800"
                  mt={8}
                  w="full"
                  color="white"
                  _hover={{
                    background: "blue",
                  }}
                >
                  <LocationOnIcon /> Direction
                </Button>
                <HStack pt={5}>
                  <Text fontWeight="bold">Specialisation </Text>
                  <SearchIcon />
                </HStack>
                <HStack mt={2}>
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
              </Flex>

              <Flex direction="column" gap="10px" w="100%" maxW="container.md">
                <HStack justifyContent="space-between" w="100%" pt={5}>
                  <Text fontWeight="bold">Reviews</Text>
                  <HStack alignItems="center" color="#2DFF00" gap={1}>
                    <TagFacesIcon />
                    <Text fontWeight="bold">Mostly Positive</Text>
                  </HStack>
                </HStack>
                <Divider mt={2} bg="gray.800" borderWidth="1px" />
                <VStack mt={3} px={-5} gap={5}>
                  {review.map((i) => {
                    return <Review review={i} key={v4()} />;
                  })}
                </VStack>
              </Flex>
            </Flex>
          </Container>
        )}
      </>
    );
}

export async function getServerSideProps(context){
    const { params } = context;
    const facility = await apiHandler.getFacility(params.facility_id);
    const review = await apiHandler.getReviewOfFacility(params.facility_id);
    const images = await apiHandler.getFacilityImage(params.facility_id);
    return{
        props: {
            facility,
            review,
            images
        }
    }
}