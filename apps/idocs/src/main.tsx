import { StrictMode, useCallback } from "react";
import ReactDOM from "react-dom/client";
import { MantineThemeProvider } from "mantine";

import App from "./App";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useColorScheme, useHotkeys, useLocalStorage } from "@mantine/hooks";

const root = ReactDOM.createRoot(document.getElementById("root")!);
const themeKey = "idocs.theme";

if (import.meta.env.PROD) {
  root.render(
    <StrictMode>
      <MyApp />
    </StrictMode>
  );
} else {
  root.render(
    <StrictMode>
      <MantineThemeProvider themeKey={themeKey}>
        <App />
      </MantineThemeProvider>
    </StrictMode>
  );
}

function MyApp() {
  const preferedColorScheme = useColorScheme();

  const [colorScheme, setColorScheme] = useLocalStorage({
    key: themeKey,
    defaultValue: preferedColorScheme,
  });

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const toggleColorScheme = useCallback(
    (scheme?: ColorScheme) => {
      setColorScheme(
        scheme ?? ((prevScheme) => (prevScheme === "dark" ? "light" : "dark"))
      );
    },
    [setColorScheme]
  );
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme }}
        emotionOptions={{ key: "mantine" }}
      >
        <App />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
