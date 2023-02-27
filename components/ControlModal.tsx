import { HStack, Text, VStack, Dialog, DialogHeader, DialogContent, Badge, Button } from "@react-native-material/core";
import { Control } from "../pages/Dashboard";
import { ControlIcon } from "./ControlIcon";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import { View } from "react-native";

interface ControlModalProps {
  control: Control;
  onDismiss: () => void;
}

type UnitType = "seconds" | "minutes" | "hours" | "millimeters";
type Activation = {
  id: number;
  date: Date;
  value: number;
  unit: UnitType;
};

const activationOptions = Array(15)
  .fill(null)
  .map((value, index) => ({ label: `${index + 1} minutos`, value: index + 1 }));

const getUnitName = (unit: UnitType) => {
  switch (unit) {
    case "seconds":
      return "segundos";
    case "minutes":
      return "minutos";
    case "hours":
      return "horas";
    case "millimeters":
      return "milimetros";
  }
};

const lastActivations: Activation[] = [
  { id: 1, date: new Date(), value: 5, unit: "minutes" },
  { id: 2, date: new Date(), value: 6, unit: "minutes" },
  { id: 3, date: new Date(), value: 7, unit: "minutes" },
  { id: 4, date: new Date(), value: 2, unit: "minutes" },
  { id: 5, date: new Date(), value: 8, unit: "minutes" },
];

export const ControlModal = ({ control, onDismiss }: ControlModalProps) => {
  const [open, setOpen] = useState(false);
  const [activationTime, setActivationTime] = useState<number>(0);

  return (
    // @ts-ignore
    <Dialog visible onDismiss={onDismiss}>
      <HStack justify="between" items="center">
        <DialogHeader title={control.name} />
        <ControlIcon type={control.type} extraStyles={{ fontSize: 30, marginRight: 10 }} />
      </HStack>
      <DialogContent>
        <VStack spacing={8}>
          <Text variant="h6">Ultimas activaciones:</Text>
          <VStack>
            {lastActivations.map((activation) => (
              <HStack key={activation.id}>
                <Text variant="overline" style={{ fontSize: 16 }}>
                  {activation.date.toLocaleDateString()}
                  {" -> "}
                </Text>
                <Text>
                  {activation.value} {getUnitName(activation.unit)}
                </Text>
              </HStack>
            ))}
          </VStack>
        </VStack>
        <VStack spacing={8} style={{ marginTop: 20 }}>
          <HStack justify="between">
            <Text variant="h6">Estado:</Text>
            <Badge label={control.active ? "On" : "Off"} color={control.active ? "secondary" : "primary"} />
          </HStack>

          {control.active ? (
            <Text>Tiempo activo: 5 minutos</Text>
          ) : (
            <View>
              <HStack justify="between" items="center">
                <Text>Activar:</Text>
                {/* @ts-ignore */}
                <DropDownPicker
                  open={open}
                  setOpen={setOpen}
                  value={activationTime}
                  items={activationOptions}
                  setValue={(value) => setActivationTime(value)}
                  containerStyle={{ width: 150 }}
                  placeholder="Seleccione el tiempo a activar"
                />
              </HStack>
              <Button title="Activar" style={{ marginTop: 20, zIndex: -1 }} color="secondary" />
            </View>
          )}
        </VStack>
      </DialogContent>
    </Dialog>
  );
};
