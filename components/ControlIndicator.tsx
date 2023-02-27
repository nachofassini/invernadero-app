import { Pressable, Text, VStack } from "@react-native-material/core";
import { StyleSheet } from "react-native";

import { Control } from "../pages/Dashboard";
import { ControlIcon } from "./ControlIcon";

const styles = StyleSheet.create({
  label: { fontSize: 16 },
  icon: { fontSize: 30, marginTop: 5 },
  value: { fontSize: 16, marginVertical: 5, fontWeight: "600" },
});

const ControlIndicator = ({ control, onPress }: { control: Control; onPress: (control: Control) => void }) => (
  <Pressable onPress={() => onPress(control)}>
    <VStack items="center">
      <ControlIcon type={control.type} extraStyles={styles.icon} />
      <Text style={styles.label}>{control.name}</Text>
      <Text style={styles.value}>{control.active ? "ON" : "OFF"}</Text>
    </VStack>
  </Pressable>
);

export default ControlIndicator;
