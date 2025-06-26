import Navbar from "@/components/Navbar";
import type { AppProps } from "next/app";
import "animate.css";
import ReduxProvider from "@/components/ReduxProvider";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <><Head>
        <title>ShopEase</title>
        <meta
          name="description"
          content="Welcome to ShopEase - Discover the best deals!"
        />
      </Head>
      <Navbar />
      <ReduxProvider>
        <Component {...pageProps} />;
      </ReduxProvider>
    </>
  );
}
