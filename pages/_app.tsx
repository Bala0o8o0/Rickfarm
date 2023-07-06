import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Mumbai } from "@thirdweb-dev/chains";
import { ChakraProvider } from "@chakra-ui/react";
import { Orbitron } from "next/font/google";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
// const activeChain = "PolygonZkevmTestnet";

const cyber = Orbitron({
  subsets: ["latin"],
  weight: ["900"],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={Mumbai}>
      <main className={`${cyber.className}`}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </main>
    </ThirdwebProvider>
  );
}

export default MyApp;
