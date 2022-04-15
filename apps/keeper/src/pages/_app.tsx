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

function MyApp({ Component, pageProps }: AppProps) {
  const [client] = useState(createQueryClient);
  return (
    <ThemeProvider>
      <QueryClientProvider client={client}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const preferredColorScheme = useColorScheme();
  const [scheme, setScheme] = useLocalStorageValue<ColorScheme>({
    key: "keeper.theme",
    defaultValue: preferredColorScheme,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setScheme(value || (scheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={scheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: scheme,
        }}
      >
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
