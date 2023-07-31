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
  Box
} from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"
import Image from 'next/image';
import hospitalPic from '../../public/hospital_cyberjaya.png';
import BlueButton from "@/components/BlueButton";
import React, { useState } from "react";

export default function Review() {
  const [sliderValue, setSliderValue] = React.useState(5);
  const [showTooltip, setShowTooltip] = React.useState(false);

    return (
      <Container px={5} py={5}>
        <Link href="/">
          <ArrowBackIcon boxSize={5} />
        </Link>
        <Heading size="md" textAlign={"center"}>
          Create a review
        </Heading>
        <Heading size="sm" mt={3} mb={5} color='gray.500' fontWeight={'semibold'} textAlign={"center"}>
          Hospital Cyberjaya
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
            1. On a scale of 1 to 5, how would you rate the overall cost of
            Hospital Cyberjaya?
          </Text>

          <Box w="full" bg="gray.100" mt={3} borderRadius="10px" boxShadow="xl" px={10} pt={4} pb={6}>
            <Slider
              id="slider"
              defaultValue={2}
              min={1}
              max={5}
              colorScheme="red"
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
              2. Leave a review on Hospital Cyberjaya below
            </Text>
            <Textarea
              placeholder="Comment here..."
              mt={5}
              px={3}
              h={275}
              borderRadius="10px"
              bg="gray.200"
            />
          </Flex>
          <BlueButton text="Confirm" size="100%" mt={5}/>
        </VStack>
      </Container>
    );
}