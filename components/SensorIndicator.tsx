import { Pressable, VStack, Text } from "@react-native-material/core";
import { Sensor } from "../pages/Dashboard";
import { SensorIcon } from "./SensorIcon";
import { getMeasureNameBySensorType, getMeasureUnitBySensorType } from "../utils/helpers";

export const SensorIndicator = ({
  onPress,
  order,
  styles,
  sensor,
  value,
}: {
  onPress: (sensor: Sensor) => void;
  order?: "reverse";
  styles?: {
    icon?: {};
    label?: {};
    value?: {};
  };
  sensor: Sensor;
  value: number;
}) => (
  <Pressable onPress={() => onPress(sensor)}>
    <VStack items="center">
      {order !== "reverse" && <Text style={styles?.label}>{getMeasureNameBySensorType(sensor.type)}</Text>}
      <SensorIcon sensor={sensor.type} extraStyles={styles?.icon} />
      {order === "reverse" && <Text style={styles?.label}>{getMeasureNameBySensorType(sensor.type)}</Text>}
      <Text style={styles?.value}>
        {value}
        {getMeasureUnitBySensorType(sensor.type)}
      </Text>
    </VStack>
  </Pressable>
);
