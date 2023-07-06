import {
  MediaRenderer,
  Web3Button,
  useContract,
  useContractMetadata,
} from "@thirdweb-dev/react";
import { FARMER_ADDRESS } from "../const/addresses";
import { Box, Container, Divider, Flex, Heading, Text } from "@chakra-ui/react";

export function ClaimFarmer() {
  const { contract } = useContract(FARMER_ADDRESS);
  const { data: metadata } = useContractMetadata(contract);

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
          textColor={"green"}
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
          boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
          backdropBlur="xl"
          border={"4px solid green"}
        >
          <MediaRenderer src={metadata?.image} height="300px" width="300px" />
        </Box>

        <Web3Button
          contractAddress={FARMER_ADDRESS}
          action={(contract) => contract.erc1155.claim(0, 1)}
          style={{
            backgroundColor: "black",
            backdropFilter: "blur(20px)",
            color: "green",
            fontSize: "20px",
            alignItems: "center",
            marginBottom: "60px",
          }}
        >
          Claim Farmer
        </Web3Button>
      </Flex>

      <Text
        backdropFilter="blur(30px)"
        boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
        backdropBlur="xl"
        borderRadius={"lg"}
        p={"5"}
        // textColor={"purple.300"}
        textColor={"green"}
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
      </Text>
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
