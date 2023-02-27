import { ReactNode } from "react";
import type { Component } from "../pages/Dashboard";
import { StyleSheet } from "react-native";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import FaIcon from "@expo/vector-icons/FontAwesome5";
import FIcon from "@expo/vector-icons/Feather";
import FoIcon from "@expo/vector-icons/Foundation";

const styles = StyleSheet.create({
  weatherConditionIcon: { fontSize: 60 },
});

export const SensorIcon = ({ component, extraStyles }: { component: Component; extraStyles?: {} }) => {
  switch (component) {
    case "co2":
      return <Icon name="cloud-search" color="#2e4345" style={{ ...styles.weatherConditionIcon, ...extraStyles }} />;
    case "luminosity":
      return <FIcon name="sun" color="#f57b65" style={{ ...styles.weatherConditionIcon, ...extraStyles }} />;
    case "temperature":
      return (
        <FaIcon name="temperature-low" color="#c75e71" style={{ ...styles.weatherConditionIcon, ...extraStyles }} />
      );
    case "humidity":
      return <Icon name="water-percent" color="#5eb5c7" style={{ ...styles.weatherConditionIcon, ...extraStyles }} />;
    case "soil_humidity":
      return <FaIcon name="water" color="#4fdeee" style={{ ...styles.weatherConditionIcon, ...extraStyles }} />;
    default:
      return null;
  }
};
