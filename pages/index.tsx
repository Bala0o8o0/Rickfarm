import {
  ConnectWallet,
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import {
  FARMER_ADDRESS,
  REWARDS_ADDRESS,
  STAKING_ADDRESS,
  TOOLS_ADDRESS,
} from "../const/addresses";
import { ClaimFarmer } from "../components/ClaimFarmer";
import { Inventory } from "../components/Inventory";
import { Equipped } from "../components/Equipped";
import NavBar from "../components/NavBar";
import { BigNumber, ethers } from "ethers";
import {
  Text,
  Box,
  Card,
  Container,
  Flex,
  SimpleGrid,
  Spinner,
  Skeleton,
  Divider,
  Image,
} from "@chakra-ui/react";

import { Orbitron, Press_Start_2P } from "next/font/google";

const cyber = Orbitron({
  subsets: ["latin"],
  weight: ["900"],
});

const pixel = Orbitron({
  subsets: ["latin"],
  weight: ["900"],
});

const Home: NextPage = () => {
  const address = useAddress();

  const { contract: farmercontract } = useContract(FARMER_ADDRESS);
  const { contract: toolsContract } = useContract(TOOLS_ADDRESS);
  const { contract: stakingContract } = useContract(STAKING_ADDRESS);
  const { contract: rewardContract } = useContract(REWARDS_ADDRESS);

  const { data: ownedFarmers, isLoading: loadingOwnedFarmers } = useOwnedNFTs(
    farmercontract,
    address
  );
  const { data: ownedTools, isLoading: loadingOwnedTools } = useOwnedNFTs(
    toolsContract,
    address
  );

  const { data: equippedTools } = useContractRead(
    stakingContract,
    "getStakeInfo",
    [address]
  );

  const { data: rewardBalance } = useContractRead(rewardContract, "balanceOf", [
    address,
  ]);

  if (!address) {
    return (
      <div className={`${cyber.className}   `}>
        <Container
          maxW={"1200px"}
          // backgroundImage="url('/alienbg.webp')"
          backgroundImage="url('https://cdn.dribbble.com/users/2350550/screenshots/10856228/ezgif.com-optimize.gif')"
          backgroundImage="url('https://raw.githubusercontent.com/Bala0o8o0/Rickfarm/main/public/alienbg.webp')"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          minHeight="100vh"
          minWidth="100vw"
        >
          <Box
            as="div"
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            backgroundColor="rgba(0, 0, 0, 0.5)"
          />
          <Flex
            direction={"column"}
            h={"100vh"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {/* <Text
            my={"40px"}
            backdropFilter="blur(30px)"
            boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
            backdropBlur="xl"
            borderRadius={"md"}
            p={"5"}
            textColor={"green"}
            textAlign={"center"}
            fontSize={"30px"}
            fontWeight={"bold"}
          >
            Welcome to Rick Farm
          </Text> */}

            <Image
              backdropFilter="blur(0px)"
              my={"30px"}
              p={"1"}
              borderRadius={"60px"}
              // boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
              // backdropBlur="xl"
              src="/Welcome_Text.png"
            />

            <ConnectWallet
              style={{
                backgroundColor: "#346cb1",
                backdropFilter: "blur(20px)",
                color: " white",
                fontSize: "20px",
                alignItems: "center",
                margin: "15px",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
              }}
              btnTitle="ENTER🦠FARM"
            />
          </Flex>
        </Container>
      </div>
    );
  }

  if (loadingOwnedFarmers) {
    return (
      <Container>
        <Flex h={"100vh"} justifyContent={"center"} alignItems={"center"}>
          <Spinner />
        </Flex>
      </Container>
    );
  }
  //----------------CLAIM FARMER
  if (ownedFarmers?.length === 0) {
    return (
      <div className={`${cyber.className} overflow-hidden  `}>
        <Box
          top={0}
          left={0}
          width="100vw"
          height="100vh"
          backgroundImage="url('https://images4.alphacoders.com/133/1335396.png')"
          // backgroundImage="url('/alienbg.webp')"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          overflow="auto"
        >
          <Box
            as="div"
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            backgroundColor="rgba(0, 0, 0, 0.3)"
          />
          <ClaimFarmer />
        </Box>
      </div>
    );
  }

  return (
    <div className={`${pixel.className}  `}>
      <Box
        // backgroundImage="url('https://i.pinimg.com/originals/f8/46/ff/f846ff732d55b7ac19d34009ab4a3606.gif')"
        backgroundImage="url('https://wallpapercave.com/wp/wp4518902.jpg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        width="100vw"
        height="100vh"
        overflow={"auto"}
        p={4}
        py={4}
      >
        <Box
          as="div"
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          backgroundColor="rgba(0, 0, 0, 0.5)"
        />
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

        <Container px={4} py={16}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={20}>
            {/* Farmer component 1 -----------------------------------------*/}
            <Card
              p={5}
              backdropFilter="blur(30px)"
              backgroundColor="rgba(255, 255, 255, 0.25)"
              boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
              backdropBlur="xl"
              borderRadius="3xl"
            >
              <Text textAlign={"center"} textColor={"black"} fontSize={"35px"}>
                Claimed NFT
                <Divider />
              </Text>
              <SimpleGrid columns={1} spacing={30} my={5}>
                <Box
                  backdropFilter="blur(30px)"
                  boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
                  backdropBlur="xl"
                  borderRadius="3xl"
                >
                  {ownedFarmers?.map((nft) => (
                    <div key={nft.metadata.id}>
                      <MediaRenderer
                        src={nft.metadata.image}
                        height="10%"
                        width="100%"
                        style={{
                          borderRadius: "20px",
                        }}
                      />
                    </div>
                  ))}
                </Box>
                <Box fontSize={"40px"} textAlign={"center"}>
                  <Text
                    fontSize={"large"}
                    textColor={"black"}
                    fontWeight={"bold"}
                  >
                    $SEED Balance:
                  </Text>
                  {rewardBalance && (
                    <Text textColor={"#ffdb3c"}>
                      {ethers.utils.formatUnits(rewardBalance, 18)}
                    </Text>
                  )}
                </Box>
              </SimpleGrid>
            </Card>

            {/* Inventory card -------------------------------------------*/}
            <Card
              p={4}
              backdropFilter="blur(30px)"
              backgroundColor="rgba(255, 255, 255, 0.25)"
              boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
              backdropBlur="xl"
              borderRadius="3xl"
            >
              <Text textColor={"black"} textAlign={"center"} fontSize={"37px"}>
                Inventory
                <Divider background={"yellow"} />
              </Text>

              <Skeleton isLoaded={!loadingOwnedTools}>
                <Inventory nft={ownedTools} />
              </Skeleton>
            </Card>
          </SimpleGrid>

          {/* EQUIPPED MINER  SECTION--------------------------------  */}
          <Card
            p={5}
            my={10}
            backdropFilter="blur(30px)"
            backgroundColor="rgba(255, 255, 255, 0.25)"
            boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
            backdropBlur="xl"
            borderRadius="3xl"
          >
            <Text
              textColor={"black"}
              textAlign={"center"}
              fontSize={"36px"}
              my={2}
            >
              Miners
              <Divider background={"yellow"} />
            </Text>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} my={6} spacing={10}>
              {equippedTools &&
                equippedTools[0].map((nft: BigNumber) => (
                  <Equipped key={nft.toNumber()} tokenId={nft.toNumber()} />
                ))}
            </SimpleGrid>
          </Card>
        </Container>
        <Text
          color={"whiteAlpha.500"}
          fontSize={{ base: "10px", md: "15px" }}
          align={"center"}
          m={"20px"}
        >
          {" "}
          @ Rick ⛏️ Farm. All Rights reserved 2023{" "}
        </Text>
      </Box>
    </div>
  );
};

export default Home;
