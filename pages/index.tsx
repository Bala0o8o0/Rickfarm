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
} from "@chakra-ui/react";

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
      <Container
        maxW={"1200px"}
        backgroundImage="url('/alienbg.webp')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        minHeight="100vh"
        minWidth="100vw"
      >
        <Flex
          direction={"column"}
          h={"100vh"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text
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
          </Text>
          <ConnectWallet
            style={{
              backgroundColor: "rgba(255, 355, 255, 0.25)",
              backdropFilter: "blur(20px)",
              color: "solid black",
              fontSize: "20px",
              alignItems: "center",
              margin: "15px",
            }}
          />
        </Flex>
      </Container>
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

  if (ownedFarmers?.length === 0) {
    return (
      <Box
        top={0}
        left={0}
        width="100vw"
        height="100vh"
        backgroundImage="url('/bg2.gif')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        overflow="auto"
      >
        <ClaimFarmer />
      </Box>
    );
  }

  return (
    <Box
      backgroundImage="url('/alienbg.webp')"
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
  );
};

export default Home;
