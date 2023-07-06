import {
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
} from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import { STAKING_ADDRESS, TOOLS_ADDRESS } from "../const/addresses";
import Link from "next/link";
import {
  Text,
  Box,
  Button,
  Card,
  SimpleGrid,
  Stack,
  Flex,
  useMediaQuery,
  background,
  Divider,
} from "@chakra-ui/react";

type Props = {
  nft: NFT[] | undefined;
};

export function Inventory({ nft }: Props) {
  const address = useAddress();
  const { contract: toolContract } = useContract(TOOLS_ADDRESS);
  const { contract: stakingContract } = useContract(STAKING_ADDRESS);
  const isMobile = useMediaQuery("(max-width: 600px)");

  async function stakeNFT(id: string) {
    if (!address) {
      return;
    }

    const isApproved = await toolContract?.erc1155.isApproved(
      address,
      STAKING_ADDRESS
    );

    if (!isApproved) {
      await toolContract?.erc1155.setApprovalForAll(STAKING_ADDRESS, true);
    }
    await stakingContract?.call("stake", [id, 1]);
  }

  if (nft?.length === 0) {
    return (
      <Box alignItems={"center"}>
        <Text py={"20px"} textAlign={"center"}>
          No tools.
        </Text>

        <Link href="/shop">
          <div style={{ textAlign: "center" }}>
            <Button
              backdropFilter="blur(30px)"
              backgroundColor={"black"}
              boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
              backdropBlur="3xl"
              borderRadius="md"
              style={{ display: "inline-block" }}
              color={" violet"}
            >
              Shop Tool
            </Button>
          </div>
        </Link>
      </Box>
    );
  }

  return (
    <SimpleGrid columns={isMobile ? 1 : 3} py={10} spacing={4}>
      {nft?.map((nft) => (
        <Flex key={nft.metadata.id} alignItems={"center"}>
          <MediaRenderer
            src={nft.metadata.image}
            height="100px"
            width="100px"
            style={{
              borderRadius: "10px",
            }}
          />
          {/* <Text>{nft.metadata.name}</Text> */}
          <Divider />
          <Flex mx={"2px"}>
            <Web3Button
              contractAddress={STAKING_ADDRESS}
              action={() => stakeNFT(nft.metadata.id)}
              theme="dark"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.25)",
                color: "#ffdb3c",
                fontSize: "20px",
                alignItems: "center",
                margin: "15px",
                border: "",
              }}
            >
              Equip
            </Web3Button>
          </Flex>
        </Flex>
        // </Card>
      ))}
    </SimpleGrid>
  );
}
// <Card key={nft.metadata.id} p={5}
// backdropFilter="blur(30px)"
// backgroundColor="rgba(255, 255, 255, 0.25)"
// boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
// backdropBlur="xl"
// borderRadius="md"
// >
