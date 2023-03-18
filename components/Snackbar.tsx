import { Snackbar as MuiSnackbar, SnackbarProps as MuiSnackbarProps } from "@react-native-material/core";
import { useMemo } from "react";

interface SnackbarProps extends MuiSnackbarProps {
  type?: "info" | "success" | "error";
}

export const Snackbar = ({ type, style, ...rest }: SnackbarProps) => {
  const colorStyles = useMemo(() => {
    switch (type) {
      case "success":
        return { backgroundColor: "rgb(56, 142, 60)" };
      case "error":
        return { backgroundColor: "rgb(211, 47, 47)" };
      default:
        return { backgroundColor: "black" };
    }
  }, [type]);

  return (
    <MuiSnackbar
      style={{
        position: "absolute",
        top: 15,
        left: 15,
        right: 15,
        ...colorStyles,
        ...(typeof style === "object" ? style : {}),
      }}
      {...rest}
    />
  );
};
