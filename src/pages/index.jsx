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
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Tag,
  Drawer,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
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
import { useRouter } from "next/router";
import DetailsModal from "@/components/DetailsModal";
import { apiHandler } from "@/util/apiHandler";
import { auth } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import compute from "@/util/compute";

export default function Home({ data }) {
  const router = useRouter();
  const defaultImage =
    "https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png";
  const [bestFacility, setBestFacility] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [tags, setTags] = useState({});
  const [facility, setFacility] = useState("");
  const [facilities, setFacilities] = useState(data);
  const {
    isOpen: isOpenConfig,
    onOpen: onOpenConfig,
    onClose: onCloseConfig,
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

  const [weight, setWeight] = useState({
    distance: 3,
    cost: 2,
    sentiment: 1,
  });

  const [coordinate, setCoordinate] = useState({
    longitude: 101.61722,
    latitude: 3.064785,
  });

  const toggleTags = (key) => {
    const temp = { ...tags };
    temp[key] = !temp[key];
    setTags({ ...temp });
  };

  const updateWeight = (key, value) => {
    const temp = { ...weight };
    temp[key] = value;
    setWeight({ ...temp });
  };

  const updateCoordinate = (key, value) => {
    const temp = { ...coordinate };
    temp[key] = value;
    setCoordinate({ ...temp });
  };

  const locate = () => {
    viewFacility(bestFacility);
  };

  const viewFacility = (facility_id) => {
    setFacility(facility_id);
    onOpenDetails();
  };

  useEffect(() => {
    const res = compute(weight, facilities);
    setBestFacility(res.best_facility);
    setFacilities([...res.temp]);
  }, [weight, coordinate]);

  useEffect(() => {
    (async () => {
      const sources = [`${coordinate.longitude},${coordinate.latitude}`]
        .concat(data.map((i) => `${i.longitude},${i.latitude}`))
        .join(";");
      const url = `https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${sources}?sources=0&annotations=distance&access_token=${process.env.NEXT_PUBLIC_MAP_BOX_ACCESS_TOKEN}`;

      const response = await fetch(url);
      const res_data = await response.json();
      for (let i = 1; i < res_data.distances[0].length; i++) {
        data[i - 1].distance = res_data.distances[0][i] / 1000;
      }
      const res = compute(weight, data);
      setBestFacility(res.best_facility);
      setFacilities([...res.temp]);
    })();
  }, []);

  useEffect(() => {
    const temp = [];
    for (const i of data) {
      let ok = true;
      for (const j of Object.keys(tags)) {
        if (tags[j] === false) continue;
        let found = false;
        for (const k of i.tags) {
          if (k === j) found = true;
        }
        ok &= found;
      }
      if (ok) temp.push({ ...i });
    }
    const res = compute(weight, temp);
    setBestFacility(res.best_facility);
    setFacilities([...res.temp]);
  }, [tags]);

  useEffect(() => {
    const temp = {};
    for (const i of facilities) {
      for (const j of i.tags) {
        temp[j] = false;
      }
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
        <>
          <Modal
            isOpen={isOpenInfo}
            onClose={onCloseInfo}
            isCentered
            size={"sm"}
          >
            <InfoModal />
          </Modal>
          <Drawer
            isOpen={isOpenDetails}
            onClose={onCloseDetails}
            placement="bottom"
          >
            <DetailsModal facility={facility} facilities={facilities} />
          </Drawer>
          <Modal
            isOpen={isOpenConfig}
            onClose={onCloseConfig}
            isCentered
            size={"sm"}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Configuration</ModalHeader>
              <ModalCloseButton />
              <ModalBody p="20px">
                <Heading size={"sm"} p="10px 0px">
                  Coordinate
                </Heading>
                <VStack gap="5px">
                  <Flex direction="row" w="100%">
                    <Text>Longitude</Text>
                    <Spacer />
                    <Input
                      value={coordinate.longitude}
                      w="100px"
                      onChange={(e) =>
                        updateCoordinate("longitude", e.target.value)
                      }
                    />
                  </Flex>
                  <Flex direction="row" w="100%">
                    <Text>Latitude</Text>
                    <Spacer />
                    <Input
                      value={coordinate.latitude}
                      w="100px"
                      onChange={(e) =>
                        updateCoordinate("latitude", e.target.value)
                      }
                    />
                  </Flex>
                </VStack>
                <Heading size={"sm"} p="10px 0px">
                  Priority
                </Heading>
                <VStack gap="5px">
                  {Object.keys(weight).map((i) => (
                    <Flex direction="row" w="100%" key={v4()}>
                      <Text>{i.charAt(0).toUpperCase() + i.slice(1)}</Text>
                      <Spacer />
                      <NumberStepper
                        value={weight[i]}
                        update={(value) => updateWeight(i, value)}
                      />
                    </Flex>
                  ))}
                </VStack>
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
                  {user ? (
                    <ChakraImage
                      src={user ? user.photoURL : defaultImage}
                      alt="user-avatar"
                      w="40px"
                      h="40px"
                      style={{ borderRadius: "100%" }}
                      onClick={() => router.push("/profile")}
                      transition="all 0.3s"
                      _hover={{
                        cursor: "pointer",
                        border: "1px solid blue",
                      }}
                      boxShadow={"lg"}
                    />
                  ) : (
                    <Button
                      backgroundColor={"blue"}
                      color={"white"}
                      _hover={{
                        cursor: "pointer",
                        backgroundColor: "#020ad4",
                      }}
                      _active={{
                        backgroundColor: "#020ad4",
                      }}
                      onClick={() => router.push("/login")}
                    >
                      Login
                    </Button>
                  )}
                </Flex>
                <SearchBar facilities={facilities} setFacility={viewFacility} />
              </VStack>

              <Flex
                direction="row"
                position="absolute"
                bottom={"-50px"}
                w="100vw"
                gap={2}
              >
                <HStack w="100%">
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
            </VStack>

            <MapAndMarkers
              user={user}
              user_coord={coordinate}
              facilities={facilities}
              setFacility={viewFacility}
            />

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
                onClick={onOpenConfig}
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
                    <Text color="white">Configuration</Text>
                  </HStack>
                </Center>
              </Button>
              <Button
                maxW="container.md"
                w="100%"
                bg="#000AFF"
                onClick={locate}
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
      )}
    </>
  );
}

export async function getServerSideProps() {
  const facilities = await apiHandler.getFacilities();
  return {
    props: {
      data: facilities,
    },
  };
}
