import { HStack, Text, VStack, Dialog, DialogHeader, DialogContent, Button } from "@react-native-material/core";
import { Sensor } from "../pages/Dashboard";
import { SensorIcon } from "./SensorIcon";

interface SensorModalProps {
  sensor: Sensor;
  onDismiss: () => void;
}

const lastMeasures = [
  { id: 1, date: new Date(), value: "25ºC" },
  { id: 2, date: new Date(), value: "26ºC" },
  { id: 3, date: new Date(), value: "27ºC" },
  { id: 4, date: new Date(), value: "22ºC" },
  { id: 5, date: new Date(), value: "18ºC" },
];

export const SensorModal = ({ sensor, onDismiss }: SensorModalProps) => {
  return (
    // @ts-ignore
    <Dialog visible onDismiss={onDismiss}>
      <HStack justify="between" items="center">
        <DialogHeader title={sensor.name} />
        <SensorIcon component={sensor.component} extraStyles={{ fontSize: 30, marginRight: 10 }} />
      </HStack>
      <DialogContent>
        <VStack spacing={8}>
          <Text variant="h6">Valores esperados:</Text>
          <VStack>
            <HStack justify="between">
              <Text>Cultivo: PAPA</Text>
              <Text>Min: 30</Text>
            </HStack>
            <HStack justify="between">
              <Text>Etapa: 2</Text>

              <Text>Max: 30</Text>
            </HStack>
          </VStack>

          <Text variant="h6">Ultimas mediciones:</Text>
          <VStack>
            {lastMeasures.map((measure) => (
              <Text key={measure.id}>
                {measure.date.toLocaleTimeString()}:{" "}
                <Text variant="overline" style={{ fontSize: 16 }}>
                  {measure.value}
                </Text>
              </Text>
            ))}
          </VStack>
        </VStack>
        <Button title="Ver mas" color="secondary" style={{ marginTop: 20 }} />
      </DialogContent>
    </Dialog>
  );
};
