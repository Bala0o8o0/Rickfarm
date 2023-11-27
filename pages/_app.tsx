import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Orbitron } from "next/font/google";

const cyber = Orbitron({
  subsets: ["latin"],
  weight: ["900"],
});

const activeChain = "mumbai";
const clientId = "996220fe5abd10da78fbd1abd64588b8";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={activeChain} clientId={clientId}>
      <main className={`${cyber.className}`}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </main>
    </ThirdwebProvider>
  );
}

export default MyApp;
