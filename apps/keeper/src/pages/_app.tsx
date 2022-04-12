import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "react-query";
import { useState } from "react";

import { createQueryClient } from "$lib/modules/react-query";

function MyApp({ Component, pageProps }: AppProps) {
  const [client] = useState(createQueryClient);
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "light",
      }}
    >
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default MyApp;
