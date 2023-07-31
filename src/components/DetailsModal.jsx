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
    Spacer,
    Divider,
    Button,
    Center,
    Tag,
  } from "@chakra-ui/react"
import Image from 'next/image';
import { v4 } from 'uuid';
import hospitalPic from '../../public/hospital_cyberjaya.png';
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { Review } from "./Review";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

export default function DetailsModal(){
    const tags = [
      "General",
      "Physiotherapy",
      "Paramedic",
      "Internal Medicine",
      "Pediatrics",
      "Obstetrics and Gynecology (OB/GYN)",
      "Surgery",
      "Psychiatry",
    ];

    return (
      <>
        <DrawerOverlay />
        <DrawerContent height="92vh" borderRadius="10px">
          <VStack>
            <DrawerCloseButton position="absolute" left="10px" top="15px" />
            <DrawerHeader>Hospital Putrajaya</DrawerHeader>
          </VStack>
          <DrawerBody>
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
                <Flex justifyContent="center" alignItems="center">
                  <Image
                    src={hospitalPic}
                    alt="hospital-picture"
                    width={185}
                    height={125}
                  />
                </Flex>
                <HStack overflowX="hidden" mt={2}>
                  <Swiper
                    slidesPerView="auto"
                    freeMode={true}
                    modules={[FreeMode]}
                    spaceBetween={10}
                  >
                    {tags.map((i) => (
                      <SwiperSlide style={{ width: "auto" }} key={v4()}>
                        <Tag
                          bg="gray.200"
                          px="20px"
                          py="10px"
                          borderRadius="10px"
                          userSelect="none"
                          fontSize="md"
                          _hover={{
                            cursor: "pointer",
                            backgroundColor: "blue",
                            color: "white",
                          }}
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
                  <Tag
                    fontWeight="bold"
                    px={8}
                    py={2}
                    fontSize="md"
                    bg="red"
                    color="white"
                  >
                    Busy
                  </Tag>
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
                      width="170px"
                      mt={3}
                      borderRadius={20}
                      value={60}
                    />
                  </HStack>
                </Box>
              </Flex>
              <Flex direction="column" gap="10px" w="100%" maxW="container.md">
                <HStack justifyContent="space-between" w="100%" pt={3}>
                  <Text fontWeight="bold">Reviews</Text>
                  <HStack alignItems="center" color="#2DFF00" gap={1}>
                    <TagFacesIcon />
                    <Text fontWeight="bold">Mostly Positive</Text>
                  </HStack>
                </HStack>
                <Divider bg="gray.800" borderWidth="1px" />
                <VStack mt={3} px={-5} gap={5}>
                  <Review />
                  <Review />
                </VStack>
                <HStack width="100%" gap="5px">
                  <Link href="/details">
                    <Button
                      maxW="container.md"
                      w="43%"
                      bg="#000AFF"
                      position="absolute"
                      bottom="15px"
                      left="20px"
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
                        <Text color="white">More Details</Text>
                      </Center>
                    </Button>
                  </Link>
                  <Button
                    maxW="container.md"
                    w="43%"
                    borderColor="#000AFF"
                    borderWidth="3px"
                    bg="white"
                    position="absolute"
                    bottom="15px"
                    right="20px"
                    css={{
                      "&:hover": {
                        backgroundColor: "#020ad4",
                        "& .chakra-text": {
                          color: "white"
                        }
                      },
                      "&:active": {
                        backgroundColor: "#020ad4",
                        "& .chakra-text": {
                          color: "white"
                        }
                      },
                    }}
                  >
                    <Center>
                      <Text
                        color="#000AFF"
                      >
                        
                        Create Review
                      </Text>
                    </Center>
                  </Button>
                </HStack>
              </Flex>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </>
    );
}