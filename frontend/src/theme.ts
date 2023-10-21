import { ThemeConfig, extendTheme } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const fonts = {
  body: "Roboto, sans-serif",
    heading: "Roboto, sans-serif",
};

const theme = extendTheme({
  config,
  fonts,
  styles: {
    global: {
      body: {
        fontSize: "16px", // Adjust the font size as desired
      },
    },
  },
});

export default theme;
