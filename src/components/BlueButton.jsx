import { Button } from '@chakra-ui/react'

export default function BlueButton({text, size, maxW=null, mt=null}) {
  return (
    <Button mt={mt} bg="#000AFF" w={size}  color="white" maxW={maxW}>
        {text}
    </Button>
  )
}
