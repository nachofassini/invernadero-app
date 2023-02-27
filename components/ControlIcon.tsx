import type { ControlType } from "../pages/Dashboard";
import { StyleSheet } from "react-native";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import FoIcon from "@expo/vector-icons/Foundation";

const styles = StyleSheet.create({
  icon: { fontSize: 40 },
});

export const ControlIcon = ({ type, extraStyles }: { type: ControlType; extraStyles?: {} }) => {
  switch (type) {
    case "fan":
      return <Icon name="fan-plus" style={{ ...styles.icon, ...extraStyles }} />;
    case "water":
      return <Icon name="watering-can" style={{ ...styles.icon, ...extraStyles }} />;
    case "light":
      return <FoIcon name="lightbulb" style={{ ...styles.icon, ...extraStyles }} />;
    case "extractor":
      return <Icon name="fan-minus" style={{ ...styles.icon, ...extraStyles }} />;

    default:
      return null;
  }
};
