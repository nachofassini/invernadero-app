import { Pressable, VStack, Text } from "@react-native-material/core";
import { Sensor } from "../pages/Dashboard";
import { SensorIcon } from "./SensorIcon";

const SensorIndicator = ({
  onPress,
  order,
  styles,
  sensor,
}: {
  onPress: (sensor: Sensor) => void;
  order?: "reverse";
  styles?: {
    icon?: {};
    label?: {};
    value?: {};
  };
  sensor: Sensor;
}) => (
  <Pressable onPress={() => onPress(sensor)}>
    <VStack items="center">
      {order !== "reverse" && <Text style={styles?.label}>{sensor.name}</Text>}
      <SensorIcon component={sensor.component} extraStyles={styles?.icon} />
      {order === "reverse" && <Text style={styles?.label}>{sensor.name}</Text>}
      <Text style={styles?.value}>{sensor.value}</Text>
    </VStack>
  </Pressable>
);

export default SensorIndicator;
