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
      return <Icon name="fan-plus" color="#4fdeee" style={{ ...styles.icon, ...extraStyles }} />;
    case Device.Irrigation:
      return <Icon name="watering-can" color="#5eb5c7" style={{ ...styles.icon, ...extraStyles }} />;
    case Device.Light:
      return <FoIcon name="lightbulb" color="#f57b65" style={{ ...styles.icon, ...extraStyles }} />;
    case Device.Extractor:
      return <Icon name="fan-minus" color="#c75e71" style={{ ...styles.icon, ...extraStyles }} />;

    default:
      return null;
  }
};
