import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useColorScheme, useHotkeys, useLocalStorage } from "@mantine/hooks";
import { useCallback } from "react";

export interface MantineThemeProviderProps {
  children: React.ReactChild;
  themeKey: string;
}

const MantineThemeProvider: React.FC<MantineThemeProviderProps> = ({
  children,
  themeKey,
}) => {
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
      >
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default MantineThemeProvider;
