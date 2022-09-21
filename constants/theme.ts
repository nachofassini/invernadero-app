import { defaultTheme, Theme } from "@react-native-material/core";

export const theme: Theme = {
  ...defaultTheme,
  palette: {
    ...defaultTheme.palette,
    // override the primary color
    primary: { main: "#f2f2f2", on: "black" },
  },
};
