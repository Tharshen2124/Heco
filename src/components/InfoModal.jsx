import {
    Flex,
    HStack,
    Text,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    VStack,
} from '@chakra-ui/react'
import Image from 'next/image';
import GreenMarker from '../../public/green_marker.svg'; 
import YellowMarker from '../../public/yellow_marker.svg'; 
import RedMarker from '../../public/red_marker.svg'; 

export default function InfoModal(){
    return(
        <>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Info</ModalHeader>
                <ModalCloseButton />
                <ModalBody p='20px'>
                    <VStack>
                        <HStack w='200px' gap='20px'>
                            <Image src={GreenMarker} alt='green-marker'/>
                            <Text>
                                Suitable
                            </Text>
                        </HStack>
                        <HStack w='200px' gap='20px'>
                            <Image src={YellowMarker} alt='yellow-marker'/>
                            <Text>
                                Moderately Suitable
                            </Text>
                        </HStack>
                        <HStack w='200px' gap='20px'>
                            <Image src={RedMarker} alt='red-marker'/>
                            <Text>
                                Less Suitable
                            </Text>
                        </HStack>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </>
    )
}