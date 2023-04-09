import { StyleSheet } from "react-native";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import FaIcon from "@expo/vector-icons/FontAwesome5";
import FIcon from "@expo/vector-icons/Feather";
import { SensorType } from "../gql";

const styles = StyleSheet.create({
  weatherConditionIcon: { fontSize: 60 },
});

export const SensorIcon = ({ sensor, extraStyles }: { sensor: SensorType; extraStyles?: {} }) => {
  switch (sensor) {
    case SensorType.Co2:
      return <Icon name="cloud-search" color="#2e4345" style={{ ...styles.weatherConditionIcon, ...extraStyles }} />;
    case SensorType.Lighting:
      return <FIcon name="sun" color="#f57b65" style={{ ...styles.weatherConditionIcon, ...extraStyles }} />;
    case SensorType.Temperature:
      return (
        <FaIcon name="temperature-low" color="#c75e71" style={{ ...styles.weatherConditionIcon, ...extraStyles }} />
      );
    case SensorType.Humidity:
      return <Icon name="water-percent" color="#5eb5c7" style={{ ...styles.weatherConditionIcon, ...extraStyles }} />;
    case SensorType.SoilHumidity:
      return <FaIcon name="water" color="#4fdeee" style={{ ...styles.weatherConditionIcon, ...extraStyles }} />;
    default:
      return null;
  }
};
