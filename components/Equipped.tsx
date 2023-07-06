import {
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
  useNFT,
} from "@thirdweb-dev/react";
import { STAKING_ADDRESS, TOOLS_ADDRESS } from "../const/addresses";
import { ethers } from "ethers";
import styles from "../styles/Home.module.css";
import { Text, Box, Card, Stack, Flex, Divider } from "@chakra-ui/react";

interface EquippedProps {
  tokenId: number;
}

export const Equipped = (props: EquippedProps) => {
  const address = useAddress();

  const { contract: toolContract } = useContract(TOOLS_ADDRESS);
  const { data: nft } = useNFT(toolContract, props.tokenId);

  const { contract: stakingContract } = useContract(STAKING_ADDRESS);

  const { data: claimableRewards } = useContractRead(
    stakingContract,
    "getStakeInfoForToken",
    [props.tokenId, address]
  );

  return (
    <Box>
      {nft && (
        <Card
          backdropFilter="blur(1px)"
          backgroundColor={"blackAlpha.400"}
          boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
          backdropBlur="3xl"
          borderRadius="md"
          dropShadow={"3xl"}
          borderColor={"white"}
          p={4}
        >
          {/* NFT MINER box----------------------------------------- */}
          <Box
            boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
            backgroundColor={"black"}
            backdropBlur="3xl"
            borderRadius="md"
            dropShadow={"3xl"}
          >
            <MediaRenderer
              src={nft.metadata.image}
              height="100%"
              width="100%"
              style={{
                borderRadius: "10px",
              }}
            />
            <Text
              fontSize={"x"}
              textColor={"#8ec4e7"}
              textAlign={"center"}
              fontWeight={"medium"}
              p={2}
            >
              {nft.metadata.name}
            </Text>
          </Box>
          {/*EQIP BOX ----------------------------- */}
          <Stack py={2} spacing={1}>
            <Text textColor={"whiteAlpha.600"} textAlign={"center"}>
              Equipped: {ethers.utils.formatUnits(claimableRewards[0], 0)}
            </Text>
            <Flex style={{ justifyContent: "center" }} py={1}>
              <Web3Button
                contractAddress={STAKING_ADDRESS}
                action={(contract) =>
                  contract.call("withdraw", [props.tokenId, 1])
                }
                className={styles.unequipbutton}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.25)",
                  color: "#5ad5ff",
                  fontSize: "15px",
                  alignItems: "center",
                  margin: "8px",
                }}
              >
                Unequip
              </Web3Button>
            </Flex>
          </Stack>
          {/* CLAIMABLE BOX -------------------------- */}
          <Box mt={0}>
            <Text textColor={"#5ad5ff"} fontSize={"xl"} textAlign={"center"}>
              {" "}
              ⛏️
            </Text>
            <Text textAlign={"center"} textColor={"black"}>
              {ethers.utils.formatUnits(claimableRewards[1], 18)}
            </Text>
            <Flex py={1} style={{ justifyContent: "center" }}>
              <Web3Button
                contractAddress={STAKING_ADDRESS}
                action={(contract) =>
                  contract.call("claimRewards", [props.tokenId])
                }
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.25)",
                  color: "#5ad5ff",
                  fontSize: "15px",
                  margin: "8px",
                }}
              >
                Claim $SEEDS
              </Web3Button>
            </Flex>
          </Box>
        </Card>
      )}
    </Box>
  );
};
