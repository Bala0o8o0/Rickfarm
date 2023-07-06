import { useState, useEffect } from "react";
import {
  Container,
  Flex,
  Heading,
  Link,
  IconButton,
  useDisclosure,
  Box,
  Text,
} from "@chakra-ui/react";
import { ConnectWallet } from "@thirdweb-dev/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Image from "next/image";
// import Link from "next/link";

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile, setIsMobile] = useState(false);

  const checkIsMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const renderDesktopLinks = () => (
    <Flex alignItems={"center"}>
      <Link href={"/"} textColor={"black"} fontSize={"xl"} mx={"auto"}>
        Mine
      </Link>
      <Link href={"/shop"} textColor={"black"} fontSize={"xl"} mx={12}>
        Shop
      </Link>
      <ConnectWallet />
    </Flex>
  );

  return (
    <Box>
      <Container maxW={"1200px"} py={4}>
        <Flex direction={"row"} justifyContent={"space-between"}>
          <Image
            src="/Logo.svg"
            alt="Crypto Farm Logo"
            width={65}
            height={80}
          />
          {isMobile ? (
            <IconButton
              icon={<HamburgerIcon />}
              aria-label="Menu"
              variant="outline"
              onClick={onOpen}
            />
          ) : (
            renderDesktopLinks()
          )}
        </Flex>
      </Container>
      {isMobile && (
        <Flex
          direction="column"
          alignItems="flex-end"
          top={0}
          right={0}
          bottom={0}
          width="100%"
          maxH={"600px"}
          p={4}
          boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
          backdropFilter="blur(10px)"
          backgroundColor="rgba(255, 255, 255, 0.25)"
          backdropBlur="sm"
          borderRadius="md"
          zIndex={999}
          display={isOpen ? "flex" : "none"}
        >
          <IconButton
            icon={<CloseIcon />}
            aria-label="Close"
            variant="outline"
            outlineColor={"black"}
            onClick={onClose}
            alignSelf="center"
          />

          <Link
            href={"/"}
            fontWeight={"black"}
            mx={2}
            alignSelf="center"
            my={5}
          >
            MINE
          </Link>

          <Link
            href={"/shop"}
            fontWeight={"black"}
            alignSelf="center"
            mx={2}
            my={5}
          >
            SHOP
          </Link>
          <Flex alignSelf="center" my={5}>
            <ConnectWallet />
          </Flex>
        </Flex>
      )}
    </Box>
  );
};

export default NavBar;
