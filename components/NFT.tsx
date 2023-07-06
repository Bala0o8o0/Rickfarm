import { Text, Card, Box } from "@chakra-ui/react";
import {
  MediaRenderer,
  Web3Button,
  useActiveClaimCondition,
  useContract,
} from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import { TOOLS_ADDRESS } from "../const/addresses";
import { ethers } from "ethers";

type Props = {
  nft: NFT;
};

export default function NFTComponent({ nft }: Props) {
  const { contract } = useContract(TOOLS_ADDRESS);
  const { data, isLoading } = useActiveClaimCondition(
    contract,
    nft.metadata.id // Token ID required for ERC1155 contracts here.
  );

  return (
    <Card
      key={nft.metadata.id}
      overflow={"hidden"}
      backdropFilter="blur(30px)"
      backgroundColor="rgba(255, 255, 255, 0.25)"
      boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
      backdropBlur="xl"
      borderRadius="md"
    >
      <Card
        backdropFilter="blur(30px)"
        backgroundColor={"blackAlpha.500"}
        boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
        backdropBlur="xl"
        borderRadius="md"
      >
        <MediaRenderer
          src={nft.metadata.image}
          height="100%"
          width="100%"
          style={{
            borderRadius: "1px",
            overflow: "hidden",
            backgroundColor: "black",
          }}
        />
        <Text
          fontSize={"2xl"}
          fontWeight={"bold"}
          textColor={"blackAlpha.900"}
          mx={2}
          my={2}
          textAlign={"center"}
        >
          {nft.metadata.name}
        </Text>
      </Card>
      {/* NFT TEXT DISPLAY */}
      {!isLoading && data ? (
        <Text textAlign={"center"} mt={6}>
          Cost: {ethers.utils.formatEther(data?.price)}
          {" " + data?.currencyMetadata.symbol}
        </Text>
      ) : (
        <Text>Loading...</Text>
      )}

      <Web3Button
        contractAddress={TOOLS_ADDRESS}
        action={(contract) => contract.erc1155.claim(nft.metadata.id, 1)}
        theme="dark"
        style={{
          backgroundColor: "rgba(72, 76, 73, 0.32)",
          color: "#4ba7c3",
          fontSize: "20px",
          alignItems: "center",
          margin: "15px",
          backdropFilter: "blur(30px)",
        }}
      >
        Buy
      </Web3Button>
    </Card>
  );
}
