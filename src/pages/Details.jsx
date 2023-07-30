import { ArrowBackIcon, SearchIcon } from '@chakra-ui/icons'
import {
  Container,
  Heading,
  Text,
  Image,
  Box,
  HStack,
  Progress,
  Button,
  Divider,
  VStack,
  Tag,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from 'swiper/react'
import {FreeMode} from 'swiper/modules';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Review } from '@/components/Review';
import Link from "next/link";

export default function Details() {
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

    const assets = [
      "https://www.utusan.com.my/wp-content/uploads/UTU_HOSPITAL9797-scaled.jpg",
      "https://assets.bharian.com.my/images/articles/HOSPITAL_CYBERJAYA_spital_cyberjaya_1668155209.jpg",
      "https://www.utusan.com.my/wp-content/uploads/UTU_HOSPITAL9797-scaled.jpg",
      "https://assets.bharian.com.my/images/articles/HOSPITAL_CYBERJAYA_spital_cyberjaya_1668155209.jpg",
      "https://assets.hmetro.com.my/images/articles/0724rsputj_1627109876.jpg",
      "https://www.utusan.com.my/wp-content/uploads/UTU_HOSPITAL9797-scaled.jpg",
    ];

    return (
      <Container px={5} py={5}>
        <Link href="/">
          <ArrowBackIcon boxSize={5} />
        </Link>
        <Heading size="md" pt={5}>
          Hospital Putrajaya
        </Heading>
        <Text size="sm" pt={2} color="gray.500">
          Pusat Perubatan Putrajaya
        </Text>
        <HStack pt={5} overflowX="scroll">
          <Swiper
            slidesPerView="auto"
            freeMode={true}
            modules={[FreeMode]}
            spaceBetween={10}
          >
            {assets.map((i) => {
              return (
                <SwiperSlide>
                  <Image
                    src={i}
                    width={300}
                    height={220}
                    borderRadius="20px"
                    alt=""
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </HStack>
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
            5, Jalan Lagoon Selatan, Bandar Sunway, 47500 Subang Jaya, Selangor
          </Text>
        </Box>
        <HStack justifyContent="space-between" w="100%" pt={5}>
          <Text w={40} fontWeight="bold">
            Opening Time
          </Text>
          <HStack alignItems="center" gap={1}>
            <AccessTimeIcon style={{ color: "blue" }} />
            <Text color="blue" fontWeight="bold">
              07:00 AM
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
              01:00 AM
            </Text>
          </HStack>
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
          <Text mt={2} fontSize="md" fontWeight="semibold" color="black">
            Distance: 30km
          </Text>

          <HStack w="100%" justifyContent="space-between">
            <Text mt={2} fontSize="md" fontWeight="semibold" color="black">
              Cost Rating:
            </Text>
            <Progress
              colorScheme="red"
              width="180px"
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
        <HStack overflowX="scroll" mt={2}>
          <Swiper
            slidesPerView="auto"
            freeMode={true}
            modules={[FreeMode]}
            spaceBetween={10}
          >
            {tags.map((i) => (
              <SwiperSlide style={{ width: "auto" }} key={i}>
                <Button
                  bg="gray.100"
                  px="10px"
                  py="5px"
                  borderRadius="10px"
                  userSelect="none"
                >
                  {i}
                </Button>
              </SwiperSlide>
            ))}
          </Swiper>
        </HStack>
        <HStack justifyContent="space-between" w="100%" pt={5}>
          <Text fontWeight="bold">Reviews</Text>
          <HStack alignItems="center" color="#2DFF00" gap={1}>
            <TagFacesIcon />
            <Text fontWeight="bold">Mostly Positive</Text>
          </HStack>
        </HStack>
        <Divider mt={2} bg="gray.800" borderWidth="1px" />
        <VStack mt={3} px={-5} gap={5}>
          <Review />
          <Review />
          <Review />
        </VStack>
      </Container>
    );
}