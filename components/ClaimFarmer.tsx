import {
  MediaRenderer,
  Web3Button,
  useContract,
  useContractMetadata,
} from "@thirdweb-dev/react";
import { FARMER_ADDRESS } from "../const/addresses";
import { Box, Container, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import toast, { Toaster } from 'react-hot-toast';
import { useEffect  } from "react";
import React from "react";


export function ClaimFarmer() {
  const { contract } = useContract(FARMER_ADDRESS);
  const { data: metadata } = useContractMetadata(contract);


  React.useEffect(() => {
    toast(
      " 🕹️ Rick is trapped in Dimension 111, help him to boost his computer power to escape the dimension.\n\n 🫧Use the Portal Miner to generate power for the computer and help Rick to exit the dimension.",
      {
        duration: 7000,
        style: {
          borderRadius: '10px',
          background: '#eadb73',
          color: "black",
          border: '5px solid orange',
        },
      },
      
      
    );
  }, [0]);



  return (
    <Container>
      <Flex
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Text
          my={"40px"}
          backdropFilter="blur(30px)"
          boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
          backdropBlur="xl"
          borderRadius={"md"}
          p={"4"}
          textColor={"#eadb73"}
          
          textAlign={"center"}
          fontSize={{ base: "20px", md: "30px" }}
          fontWeight={"bold"}
        >
          <h1>Claim Farmer Rick to Enter the Dimension</h1>
        </Text>

        <Box
          borderRadius={"18px"}
          overflow={"hidden"}
          my={10}
          backdropFilter="blur(30px)"
          boxShadow="60 8px 32px 10 rgba(31, 38, 135, 0.37)"
          backdropBlur="xl"
          border={"4px solid #eadb73"}
        >
          <MediaRenderer src={metadata?.image} height="300px" width="300px" />
        </Box>

        <Web3Button
          contractAddress={FARMER_ADDRESS}
          action={(contract) => contract.erc1155.claim(0, 1)}
          style={{
            backgroundColor: "black",
            backdropFilter: "blur(20px)",
            color: "#eadb73",
            fontSize: "20px",
            alignItems: "center",
            marginBottom: "60px",
          }}
        >
          Claim Farmer
        </Web3Button>


        
      </Flex>

      {/* <Text
        backdropFilter="blur(80px)"
        boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
        backdropBlur="xl"
        borderRadius={"lg"}
        p={"5"}
        // textColor={"purple.300"}
        textColor={"#d56419"}
        textAlign={"center"}
        fontSize={"17px"}
        fontWeight={"black"}
      >
        <Box gap={10}>
          <h1>
            Rick is trapped in Dimension 111, help him boost his computer&apos;s
            power to escape the dimension.
            <br></br>
            <br></br>
            Use the Portal Miner&apos;s to generate power for the computer and
            help Rick to exit the dimension.
          </h1>
        </Box>
      </Text> */}
 <Toaster
  position="bottom-left"
  reverseOrder={false}
/>

      <Text
        color={"whiteAlpha.500"}
        fontSize={{ base: "10px", md: "15px" }}
        align={"center"}
        m={"40px"}
      >
        {" "}
        @ Rick ⛏️ Farm. All Rights reserved 2023{" "}
      </Text>
    </Container>
  );
}
