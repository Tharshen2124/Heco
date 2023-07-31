import {
  Flex,
  Spacer,
  VStack,
  Text,
  Heading,
  Button,
  HStack,
  Image as ChakraImage,
  Center,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Tag,
  Drawer,
} from "@chakra-ui/react";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import Customize from "../../public/customize.svg";
import Locate from "../../public/locate.svg";
import Info from "../../public/info.svg";
import Image from "next/image";
import MapAndMarkers from "@/components/Map";
import NumberStepper from "@/components/NumberStepper";
import InfoModal from "@/components/InfoModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { v4 } from "uuid";
import DetailsModal from "@/components/DetailsModal";

export default function Home() {
  const user = {
    image:
      "https://lh3.googleusercontent.com/ogw/AGvuzYa4OMQLnolXOBOumOzowan6axmJHyDwyn-gNUND=s32-c-mo",
    longitude: 101.6146214,
    latitude: 3.064785,
  };
  const tags = [
    "General",
    "Physiotherapy",
    "Paramedic",
    "Internal Medicine",
    "Pediatrics",
    "Obstetrics and Gynecology (OB/GYN)",
    "Surgery",
    "Psychiatry",
    "Surgery",
    "Psychiatry",
    "Anesthesiology",
    "Cardiology",
    "Orthopedics",
    "Radiology",
    "Family Medicine",
    "Anesthesiology",
    "Cardiology",
    "Orthopedics",
    "Radiology",
    "Family Medicine",
  ];
  const markers = [
    {
      longitude: 101.617,
      latitude: 3.064785,
      status: "suitable",
    },
    {
      longitude: 101.62,
      latitude: 3.06,
      status: "less_suitable",
    },
    {
      longitude: 101.61462,
      latitude: 3.07,
      status: "mod_suitable",
    },
  ];

  const facilities = [{ "title": "Hope General Hospital" },{ "title": "Mercy Medical Center" },{ "title": "Saint Luke's Hospital" },{ "title": "Grace Memorial Hospital" },{ "title": "Unity Health Center" },{ "title": "Royal Oak Medical Center" },{ "title": "Sunset Valley Hospital" },{ "title": "Maplewood Community Hospital" },{ "title": "Riverdale Regional Medical Center" },{ "title": "Oakridge General Hospital" },{ "title": "Lakeview Health Services" },{ "title": "Greenfield Medical Clinic" },{ "title": "Pinecrest Hospital" },{ "title": "Briarwood Healthcare Center" },{ "title": "Meadowbrook General Hospital" },{ "title": "Cedar Grove Medical Center" },{ "title": "Sunnydale Surgical Hospital" },{ "title": "Hillside Children's Hospital" },{ "title": "Springfield Women's Clinic" },{ "title": "Westside Cardiac Care" }];

  const {
    isOpen: isOpenWeight,
    onOpen: onOpenWeight,
    onClose: onCloseWeight,
  } = useDisclosure();
  const {
    isOpen: isOpenInfo,
    onOpen: onOpenInfo,
    onClose: onCloseInfo,
  } = useDisclosure();
  const {
    isOpen: isOpenDetails,
    onOpen: onOpenDetails,
    onClose: onCloseDetails,
  } = useDisclosure();
  const [weights, setWeights] = useState({
    distance: 3,
    availability: 2,
    cost: 1,
    sentiment: 1,
  });
  const updateWeight = (key, value) => {
    const temp = { ...weights };
    temp[key] = value;
    setWeights({ ...temp });
  };

  return (
    <>
      <Modal isOpen={isOpenInfo} onClose={onCloseInfo} isCentered size={"sm"}>
        <InfoModal />
      </Modal>
      <Drawer
        isOpen={isOpenDetails}
        onClose={onCloseDetails}
        placement="bottom"
      >
        <DetailsModal />
      </Drawer>
      <Modal
        isOpen={isOpenWeight}
        onClose={onCloseWeight}
        isCentered
        size={"sm"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Priority</ModalHeader>
          <ModalCloseButton />
          <ModalBody p="20px">
            {Object.keys(weights).map((i) => (
              <Flex direction="row" w="100%" key={v4()}>
                <Text>{i.charAt(0).toUpperCase() + i.slice(1)}</Text>
                <Spacer />
                <NumberStepper
                  value={weights[i]}
                  update={(value) => updateWeight(i, value)}
                />
              </Flex>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
      <Flex
        direction="column"
        w="100vw"
        h="100vh"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <VStack w="100%" position={"relative"}>
          <VStack maxW="container.md" w="100%" p="20px">
            <Flex direction="row" w="100%" alignItems="center" gap="20px">
              <VStack gap="5px">
                <Heading size="md" w="100%">
                  Welcome To Heco
                </Heading>
                <Text>We are your healthcare facility recommender.</Text>
              </VStack>
              <Spacer />
              <ChakraImage
                src={user.image}
                alt="user-avatar"
                w="40px"
                h="40px"
                style={{ borderRadius: "100%" }}
              />
            </Flex>
            <SearchBar facilities={facilities}/>
          </VStack>

          <Flex
            direction="row"
            position="absolute"
            bottom={["-50px", "-60px", "-70px"]}
            w="100vw"
            gap={2}
          >
            <Spacer />
            <HStack overflowX="scroll">
              <Swiper
                slidesPerView="auto"
                freeMode={true}
                modules={[FreeMode]}
                spaceBetween={10}
              >
                {tags.map((i) => (
                  <SwiperSlide style={{ width: "auto" }} key={v4()}>
                    <Tag
                      bg="white"
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
            <Spacer />
          </Flex>
        </VStack>

        <MapAndMarkers user={user} markers={markers} />

        <VStack p="20px 20px" w="100%" gap="15px" position={"relative"}>
          <Button
            borderRadius={"100%"}
            position={"absolute"}
            top="-70px"
            right="10px"
            zIndex={2}
            w="50px"
            h="50px"
            bg="white"
            css={{
              "&:hover": {
                backgroundColor: "#eee",
              },
              "&:active": {
                backgroundColor: "#eee",
              },
            }}
            p="2px"
            onClick={onOpenInfo}
          >
            <Image src={Info} alt="info-icon" borderRadius={"100%"} />
          </Button>
          <Button
            maxW="container.md"
            w="100%"
            bg="#848484"
            onClick={onOpenWeight}
            css={{
              "&:hover": {
                backgroundColor: "#6b6b6b",
              },
              "&:active": {
                backgroundColor: "#6b6b6b",
              },
            }}
          >
            <Center>
              <HStack w="100%">
                <Image src={Customize} alt="customize-icon" />
                <Text color="white">Customize Priority</Text>
              </HStack>
            </Center>
          </Button>
          <Button
            maxW="container.md"
            w="100%"
            bg="#000AFF"
            onClick={onOpenDetails}
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
              <HStack w="100%">
                <Image src={Locate} alt="locate-icon" />
                <Text color="white">Locate</Text>
              </HStack>
            </Center>
          </Button>
        </VStack>
      </Flex>
    </>
  );
}