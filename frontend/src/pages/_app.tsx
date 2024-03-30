import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/utils/apollo/client";
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });

import WagmiProvider from "../utils/wagmiprovider";
import Head from "next/head";
import Footer from "@/components/Footer";

const colors = {
  brand: {
    50: "#ecefff",
    100: "#cbceeb",
    200: "#a9aed6",
    300: "#888ec5",
    400: "#666db3",
    500: "#4d5499",
    600: "#3c4178",
    700: "#2a2f57",
    800: "#181c37",
    900: "#080819",
  },
};
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ colors, config });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider>
      <ChakraProvider theme={theme}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Navbar />
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
          <Footer />
        </div>
      </ChakraProvider>
    </WagmiProvider>
  );
}
