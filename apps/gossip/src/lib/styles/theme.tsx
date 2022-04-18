import {
  MantineProvider,
  ColorSchemeProvider,
  type ColorScheme,
} from "@mantine/core";
import { useLocalStorage, useHotkeys, useColorScheme } from "@mantine/hooks";

type Props = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: Props) => {
  const preferedColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "gossip.theme",
    defaultValue: preferedColorScheme,
  });
  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const toggleColorScheme = (scheme?: ColorScheme) => {
    setColorScheme(
      scheme ?? ((prevScheme) => (prevScheme === "light" ? "dark" : "light"))
    );
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        // withCSSVariables
        theme={{ colorScheme: colorScheme }}
      >
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default ThemeProvider;
