import { 
  Container,
  Link,
  Heading,
  VStack,
  Flex,
  Text,
  Textarea,
  Slider,
  SliderMark,
  Tooltip,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  useToast,
  Button,
  background,
} from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"
import Image from 'next/image';
import hospitalPic from '../../../public/hospital_cyberjaya.png';
import { auth } from "../../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { apiHandler } from "@/util/apiHandler";
import React, { useState, useEffect } from "react";

export default function Review({facility}) {
  const router = useRouter();
  const facility_id = router.query.facility_id;
  const [user, loading, error] = useAuthState(auth);
  const [sliderValue, setSliderValue] = React.useState(0);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const toast = useToast();
  const [review, setReview] = React.useState("");
  
  const handleSubmit = async () => {
    await apiHandler.uploadReview(facility_id, {content: review, cost_rating: sliderValue}, {id: user.uid, name: user.displayName ,image: user.photoURL});
    setSliderValue(0);
    setReview("");
    toast({ title: "Review submitted!", status: "success" });
  };

  useEffect(() => {
    if (!user && !loading){
        router.push('/login');
    }
  },[user, loading, error])



    return (
        user ?
        <Container px={5} py={5}>
            <Link href="/">
            <ArrowBackIcon boxSize={5} />
            </Link>
            <Heading size="md" textAlign={"center"}>
            Create a review
            </Heading>
            <Heading size="sm" mt={3} mb={5} color='gray.500' fontWeight={'semibold'} textAlign={"center"}>
            {facility.name}
            </Heading>
            <VStack>
            <Image
                src={hospitalPic}
                alt="hospital-picture"
                width={310}
                height={250}
            />

            <Text
                fontSize="md"
                fontWeight="semibold"
                color="black"
                mt={5}
                textAlign="left"
            >
                1. On a scale of 1 to 5, with 1 being the highest cost and 5 being the lowest cost, how would you rate the overall cost of
                {` ${facility.name}`}?
            </Text>

            <Box w="full" bg="gray.100" mt={3} borderRadius="10px" boxShadow="xl" px={10} pt={4} pb={6}>
                <Slider
                id="slider"
                defaultValue={2}
                min={1}
                max={5}
                colorScheme="red"
                value={sliderValue}
                onChange={(v) => setSliderValue(v)}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                >
                <SliderMark value={1} mt="1" ml="-2.5" fontSize="sm">
                    1
                </SliderMark>
                <SliderMark value={2} mt="1" ml="-2.5" fontSize="sm">
                    2
                </SliderMark>
                <SliderMark value={3} mt="1" ml="-2.5" fontSize="sm">
                    3
                </SliderMark>
                <SliderMark value={4} mt="1" ml="-2.5" fontSize="sm">
                    4
                </SliderMark>
                <SliderMark value={5} mt="1" ml="-2.5" fontSize="sm">
                    5
                </SliderMark>
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <Tooltip
                    hasArrow
                    bg="red.500"
                    color="white"
                    placement="top"
                    isOpen={showTooltip}
                    label={`${sliderValue}`}
                >
                    <SliderThumb />
                </Tooltip>
                </Slider>
            </Box>

            <Flex direction="column" w="full" gap={2} mt={5}>
                <Text fontSize="md" fontWeight="semibold" color="black" >
                2. Leave a review on {` ${facility.name} `} below
                </Text>
                <Textarea
                placeholder="Comment here..."
                mt={5}
                px={3}
                h={275}
                borderRadius="10px"
                bg="gray.200"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                />
            </Flex>
            <Button
                mt={5}
                w="100%"
                bg="#000AFF"
                color="white"
                _hover={{
                    backgroundColor: "#020ad4",
                }}
                _active={{
                    backgroundColor: "#020ad4",
                }}
                onClick={() => handleSubmit()}
            >
                Confirm
            </Button>
            </VStack>
        </Container>
        :
        null
    );
}

export async function getServerSideProps(context){
    const { params } = context;
    const facility = await apiHandler.getFacility(params.facility_id);
    return{
        props: {
            facility
        }
    }
}