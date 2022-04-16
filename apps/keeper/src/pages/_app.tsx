import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import {
  useLocalStorageValue,
  useHotkeys,
  useColorScheme,
} from "@mantine/hooks";
import { QueryClientProvider } from "react-query";
import { useState } from "react";

import { createQueryClient } from "$lib/modules/react-query";
import { AuthProvider } from "$lib/context/auth";
import { NextPage } from "next";
import { getTheme, setTheme } from "styles/theme";

interface MyAppProps extends AppProps {
  theme?: ColorScheme | null;
}

const MyApp: NextPage<MyAppProps> = ({ Component, pageProps }) => {
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
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
};

export default MyApp;
