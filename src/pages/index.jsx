import { Flex, Spacer, VStack, Text, Heading, InputGroup, InputLeftElement, Input, Button, HStack, Image as ChakraImage, Box, Center } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react'
import { useState, useRef } from "react";
import Search from '../../public/search.svg';
import Customize from '../../public/customize.svg';
import Locate from '../../public/locate.svg';
import Info from '../../public/info.svg';
import Image from "next/image";
import MapAndMarkers from '@/components/Map';
import NumberStepper from "@/components/NumberStepper";
import InfoModal from "@/components/InfoModal";


export default function Home() {
    const user = {
        image : 'https://lh3.googleusercontent.com/ogw/AGvuzYa4OMQLnolXOBOumOzowan6axmJHyDwyn-gNUND=s32-c-mo',
        longitude: 101.6146214,
        latitude: 3.064785,
    }
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
        "Family Medicine"

    ]
    const markers = [
            {
                longitude: 101.617,
                latitude: 3.064785,
                status: "suitable"
            },
            {
                longitude: 101.62,
                latitude: 3.06,
                status: "less_suitable"
            },
            {
                longitude: 101.61462,
                latitude: 3.07,
                status: "mod_suitable"
            }
    ]

    const { isOpen: isOpenWeight, onOpen: onOpenWeight, onClose: onCloseWeight } = useDisclosure()
    const { isOpen: isOpenInfo, onOpen: onOpenInfo, onClose: onCloseInfo } = useDisclosure()
    const [weights, setWeights] = useState({
        'distance' : 3,
        'availability': 2,
        'cost': 1,
        'sentiment': 1
    })
    const updateWeight = (key, value) => {
        const temp = {...weights};
        temp[key] = value;
        setWeights({...temp});
    }
    
    // Methods for dealing with drag and scroll
    
    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);

        setStartX(e.clientX || e.touches[0].clientX);
        setScrollLeft(containerRef.current.scrollLeft);
    };
    
    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const clientX = e.clientX || e.touches[0].clientX;
        const dx = clientX - startX;
        containerRef.current.scrollLeft = scrollLeft - dx;
    };


    return (
        <>
        <Modal isOpen={isOpenInfo} onClose={onCloseInfo} isCentered size={'sm'}>
            <InfoModal/>
        </Modal>
        <Modal isOpen={isOpenWeight} onClose={onCloseWeight} isCentered size={'sm'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Priority</ModalHeader>
                <ModalCloseButton />
                <ModalBody p='20px'>
                    {
                        Object.keys(weights).map(
                            i => 
                            <Flex direction='row' w='100%'>
                                <Text>
                                    {i.charAt(0).toUpperCase() + i.slice(1)}
                                </Text>
                                <Spacer/>
                                <NumberStepper value={weights[i]} update={(value) => updateWeight(i, value)}/>
                            </Flex>
                        )
                    }
                </ModalBody>
            </ModalContent>
        </Modal>
        <Flex direction='column' w='100vw' h='100vh' justifyContent={'space-between'} alignItems={'center'}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
            onTouchMove={handleMouseMove}
        >
            <VStack w='100%' position={'relative'}>
                <VStack maxW='container.md' w='100%' p='20px' gap='20px'>
                    <Flex direction='row' w='100%' alignItems='center' gap='20px'>
                        <VStack gap='5px'>
                            <Heading size='md' w='100%'>
                                Welcome To Heco
                            </Heading>
                            <Text>
                                We are your healthcare facility recommender.
                            </Text>
                        </VStack>
                        <Spacer/>
                        <ChakraImage src={user.image} alt='user-avatar' w='40px' h='40px' style={{borderRadius: '100%'}}/>
                    </Flex>
                    <InputGroup>
                        <InputLeftElement>
                            <Image src={Search} alt='search-icon'/>
                        </InputLeftElement>
                        <Input type='tel' placeholder='Search...' borderRadius={'20px'} boxShadow={'md'}/>
                    </InputGroup>
                </VStack>
                <Flex
                    direction={'row'}
                    position='absolute'
                    bottom='-40px'
                    w='100vw'
                    zIndex={1}
                    overflowX={'hidden'}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleMouseDown}
                    css={{
                      cursor: isDragging ? "grabbing" : null,
                      WebkitOverflowScrolling: "touch",
                      overscrollBehaviorX: "contain",
                      scrollBehavior: "smooth"
                    }}
                    ref={containerRef}
                >
                    <Spacer/>
                    <Flex
                        gap='20px'
                        p='0 10px'
                    >
                        {
                            tags.map(
                                i =>
                                <Text
                                    style={{
                                        "white-space": "nowrap",
                                    }}
                                    bg='white'
                                    p='5px'
                                    borderRadius='20px'
                                    cursor={isDragging ? 'grabbing' : 'pointer'}
                                    userSelect={'none'}
                                >
                                    {i}
                                </Text>
                            )
                        }
                    </Flex>
                    <Spacer/>
                </Flex>
            </VStack>
            
            <MapAndMarkers user={user} markers={markers}/>

            <VStack p='20px 20px' w='100%' gap='15px' position={'relative'}>
                <Button borderRadius={'100%'} position={'absolute'} top='-70px' right='10px' zIndex={2}
                    w='50px'
                    h='50px'
                    bg='white' 
                    css={{
                        '&:hover' : {
                            'backgroundColor' : '#eee' 
                        },
                        '&:active' : {
                            'backgroundColor' : '#eee' 
                        }
                    }}
                    p='2px'
                    onClick={onOpenInfo}
                >
                    <Image src={Info} alt='info-icon' borderRadius={'100%'}/>
                </Button>
                <Button 
                    maxW='container.md' 
                    w='100%' 
                    bg='#848484' 
                    onClick={onOpenWeight}
                    css={{
                        '&:hover' : {
                            'backgroundColor' : '#6b6b6b' 
                        },
                        '&:active' : {
                            'backgroundColor' : '#6b6b6b' 
                        }
                    }}
                >
                    <Center>
                        <HStack w='100%'>
                            <Image src={Customize} alt='customize-icon'/>
                            <Text color='white'>
                                Customize Priority
                            </Text>
                        </HStack>
                    </Center>
                </Button>
                <Button maxW='container.md' w='100%' bg='#000AFF'
                    css={{
                        '&:hover' : {
                            'backgroundColor' : '#020ad4' 
                        },
                        '&:active' : {
                            'backgroundColor' : '#020ad4' 
                        }
                    }}
                >
                    <Center>
                        <HStack w='100%'>
                            <Image src={Locate} alt='locate-icon'/>
                            <Text color='white'>
                                Locate
                            </Text>
                        </HStack>
                    </Center>
                </Button>
            </VStack>
        </Flex>
        </>
    )
}
