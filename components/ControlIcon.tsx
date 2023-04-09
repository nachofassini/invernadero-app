import { StyleSheet } from "react-native";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import FoIcon from "@expo/vector-icons/Foundation";
import { Device } from "../gql";

const styles = StyleSheet.create({
  icon: { fontSize: 40 },
});

export const ControlIcon = ({ type, extraStyles }: { type: Device; extraStyles?: {} }) => {
  switch (type) {
    case Device.Fan:
      return <Icon name="fan-plus" style={{ ...styles.icon, ...extraStyles }} />;
    case Device.Irrigation:
      return <Icon name="watering-can" style={{ ...styles.icon, ...extraStyles }} />;
    case Device.Light:
      return <FoIcon name="lightbulb" style={{ ...styles.icon, ...extraStyles }} />;
    case Device.Extractor:
      return <Icon name="fan-minus" style={{ ...styles.icon, ...extraStyles }} />;

    default:
      return null;
  }
};
