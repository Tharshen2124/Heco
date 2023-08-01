import Image from "next/image";
import {
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  VStack,
  Center,
} from "@chakra-ui/react";
import { v4 } from "uuid";
import Search from "../../public/search.svg";
import Fuse from "fuse.js";
import { useEffect, useState } from "react";

export default function SearchBar({ facilities, setFacility }) {
  const [searchResult, setSearchResult] = useState([]);
  const [input, setInput] = useState("");
  const fuseOptions = {
    keys: ["name"],
  };
  const fuse = new Fuse(facilities, fuseOptions);

  const search = () => {
    setSearchResult(fuse.search(input));
  };

  useEffect(search, [input]);

  return (
    <Box w="100%" position={"relative"}>
      <InputGroup>
        <InputLeftElement>
          <Image src={Search} alt="search-icon" />
        </InputLeftElement>
        <Input
          value={input}
          placeholder="Search..."
          borderRadius={"20px"}
          boxShadow={"md"}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </InputGroup>
      {searchResult.length > 0 && (
        <Center position={"absolute"} zIndex={2} w="100%" top="45px">
          <VStack
            bg="white"
            w="95%"
            borderRadius={"20px"}
            p="10px"
            gap="10px"
            boxShadow={"md"}
            maxH="300px"
            overflow={"auto"}
          >
            {searchResult.map((i) => (
              <Box
                key={v4()}
                w="100%"
                css={{
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: "#eee",
                  },
                }}
                p="5px 10px"
                borderRadius={"5px"}
                onClick={() => setFacility(i.id)}
              >
                {i.item.name}
              </Box>
            ))}
          </VStack>
        </Center>
      )}
    </Box>
  );
}
