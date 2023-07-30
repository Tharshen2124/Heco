import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'

export default function NumberStepper({value, update}){
    return(
        <NumberInput value={value} min={1} max={100} clampValueOnBlur={false} onChange={(value) => update(value)} w='100px'>
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
    )
}