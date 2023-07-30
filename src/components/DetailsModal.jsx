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
    Center
  } from "@chakra-ui/react"
import Image from 'next/image';
import hospitalPic from '../../public/hospital_cyberjaya.png';
import { Review } from "./Review";

export default function DetailsModal(){
    const tags = ['Physiotherapy', 'Pediatrics'];

    return(
        <>
        <DrawerOverlay />
        <DrawerContent height='92vh' borderRadius='10px' >
            <VStack>
                <DrawerCloseButton position='absolute' left='10px' top='15px' />
                <DrawerHeader>Hospital Putrajaya</DrawerHeader>
            </VStack>
            <DrawerBody>
                <Flex gap='24px' flexDirection='column'>
                    <Flex justifyContent='center' alignItems='center'  >
                        <Image src={hospitalPic} alt="hospital-picture" width={185} height={125} />
                    </Flex>
                    <HStack gap='15px'>
                    {
                        tags.map(
                            i =>
                            <Text
                                style={{
                                    "white-space": "nowrap",
                                }}
                                bg='white'
                                px='10px'
                                py='5px'
                                borderRadius='50px'
                                boxShadow='0px 1px 4px 0px rgba(0, 0, 0, 0.25)'
                            >
                                {i}
                            </Text>
                        )
                    }
                    </HStack>
                    <Box>
                        <Text color='#FF4040' fontWeight={800} fontFamily='Nunito' marginBottom='10px'>Busy</Text>
                        <Flex
                            width='90%'
                            boxShadow='0px 1px 4px 0px rgba(0, 0, 0, 0.25)' 
                            height='50px'
                            borderRadius='5px'
                            direction='column'
                            p='5px'
                            fontSize='14px'
                        >
                            <Text fontWeight={500}><b>Distance:</b> 30km</Text>
                            <HStack gap='10px'>
                                <Text fontWeight={500}><b>Cost Rating:</b> </Text>
                                <Progress 
                                    value={80} 
                                    width='120px' 
                                    borderRadius='50px' 
                                    colorScheme='red' 
                                    height='10px'
                                    marginTop='4px'
                                /> 
                            </HStack>
                        </Flex>
                    </Box>
                    <Flex alignItems='center' fontWeight={500}>
                        <Text>Reviews</Text>
                        <Spacer />
                        <Text color='#11E30D'>: ) Mostly Positive</Text>
                    </Flex>
                    <VStack>
                        <Divider colorScheme="blackAlpha" borderWidth='1px'/>
                        <Review />
                    </VStack>
                </Flex>
                    <HStack width='100%' gap='5px'>
                        <Button 
                            maxW='container.md' 
                            w='43%' 
                            bg='#000AFF' 
                            position='absolute'
                            bottom='15px'
                            left='20px'
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
                                <Text color='white'>
                                    More Details
                                </Text>
                            </Center>
                        </Button>
                        <Button 
                            maxW='container.md' 
                            w='43%' 
                            borderColor='#000AFF' 
                            borderWidth='3px'
                            bg='white'
                            position='absolute'
                            bottom='15px'
                            right='20px'
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
                                <Text color='#000AFF'
                                    css={{
                                        '&:hover' : {
                                            'color' : 'white'
                                        },
                                        '&:active' : {
                                            'color' : 'white'
                                        }
                                    }}
                                >
                                    Create Review
                                </Text>
                            </Center>
                        </Button>
                    </HStack>
                
            </DrawerBody>
        </DrawerContent>
        </>
    )
}