import { Button, Snackbar as MuiSnackbar, SnackbarProps as MuiSnackbarProps } from "@react-native-material/core";
import { useMemo } from "react";

interface SnackbarProps extends MuiSnackbarProps {
  position?: "absolute" | "relative";
  type?: "info" | "success" | "error";
  actionTitle?: string;
  onPress?: () => void;
}

export const Snackbar = ({ type, position = "absolute", actionTitle, onPress, style, ...rest }: SnackbarProps) => {
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
        position,
        ...(position === "absolute" ? { top: 15, left: 15, right: 15 } : { marginRight: 10, marginBottom: 20 }),
        ...colorStyles,
        ...(typeof style === "object" ? style : {}),
      }}
      {...(onPress && actionTitle
        ? {
            action: (
              <Button
                title={actionTitle}
                color="secondary"
                onPress={onPress}
                compact
                style={{ shadowOffset: { width: 2, height: 2 } }}
              />
            ),
          }
        : {})}
      {...rest}
    />
  );
};
