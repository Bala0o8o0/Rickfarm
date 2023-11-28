import { useContract, useNFTs } from "@thirdweb-dev/react";
import { TOOLS_ADDRESS } from "../const/addresses";
import Link from "next/link";
import {
  Text,
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Grid,
  Box,
} from "@chakra-ui/react";
import NFT from "../components/NFT";
import NavBar from "../components/NavBar";
import { Orbitron, Press_Start_2P } from "next/font/google";

const cyber = Orbitron({
  subsets: ["latin"],
  weight: ["900"],
});

export default function Shop() {
  const { contract } = useContract(TOOLS_ADDRESS);
  const { data: nfts } = useNFTs(contract);
  console.log(nfts);

  return (
    <div className={`${cyber.className} overflow-hidden`}>
    <Box
      // backgroundImage="url('https://cdn.dribbble.com/users/2350550/screenshots/10856228/ezgif.com-optimize.gif')"
      backgroundImage="url('/alienbg.webp')"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      minHeight="100vh"
      p={4}
      py={8}
    >
      <Box
        backdropFilter="blur(30px)"
        backgroundColor="rgba(255, 255, 255, 0.25)"
        boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
        backdropBlur="xl"
        borderRadius="md"
        overflow={"hidden"}
      >
        <NavBar />
      </Box>
      {/* SHOP CONTAINER STARTS ------------------------------------ */}
      <Container maxW={"1200px"}>
        <Flex
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          my={6}
        ></Flex>
        {/* .......SHOP text CONTAINER------------------------- */}
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          backdropFilter="blur(30px)"
          boxShadow="0 1px 8px 0 rgba(14, 103, 255, 0.6)"
          backdropBlur="xl"
          borderRadius="md"
          border={"4px"}
          p={"1"}
          maxW={"56"}
          mb={10}
        >
          <Text fontSize={"4xl"} color={"blue.300"} textAlign={"center"}>
            Shop &#x26CF;
          </Text>
        </Box>
        <Text
          fontWeight={"bold"}
          py={2}
          fontSize={"x"}
          color={"green.500"}
          align={"center"}
          mb={10}
          p={"5"}
          backdropBlur="xl"
          backdropFilter="blur(30px)"
        >
          Purchase 🧪PortalMiners with $Seeds to increase your earnings 💎.
        </Text>
        {/* NFT PORT MINER CONTAINER------------------------------------------- */}
        {!nfts ? (
          <Flex h={"40vh"} justifyContent={"center"} alignItems={"center"}>
            <Spinner />
          </Flex>
        ) : (
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
            gap={8}
          >
            {nfts?.map((nftItem) => (
              <NFT key={nftItem.metadata.id} nft={nftItem} />
            ))}
          </Grid>
        )}
        {/* BACK BUTTON AND FOOTER-------------------------------------- */}

        <Link href="/">
          <Flex justifyContent="center" alignItems="center">
            <Button
              backdropFilter="blur(30px)"
              backgroundColor="rgba(255, 255, 255, 0.25)"
              boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
              backdropBlur="xl"
              borderRadius="md"
              my={20}
            >
              Back
            </Button>
          </Flex>
        </Link>

        <Text color={"cyan.400"} align={"center"} m={"20px"}>
          {" "}
          @Rick Farm All Rights reserved{" "}
        </Text>
      </Container>
    </Box>
    </div>
  );
}
