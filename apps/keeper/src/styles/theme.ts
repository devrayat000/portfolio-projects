import { ColorScheme } from "@mantine/core";
import { getCookie, setCookies } from "cookies-next";
import { OptionsType } from "cookies-next/lib/types";

const COLOR_SCHEME_COOKIE_KEY = "keeper.theme";

export function setTheme(scheme: ColorScheme, options?: OptionsType) {
  return setCookies(COLOR_SCHEME_COOKIE_KEY, scheme, options);
}

export function getTheme(options?: OptionsType) {
  return getCookie(COLOR_SCHEME_COOKIE_KEY, options) as
    | ColorScheme
    | undefined
    | null;
}
