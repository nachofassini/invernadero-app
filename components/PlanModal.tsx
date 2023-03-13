import {
  HStack,
  Text,
  VStack,
  Dialog,
  DialogHeader,
  DialogContent,
  Button,
  Divider,
  DialogActions,
} from "@react-native-material/core";
import { Plan } from "../pages/Dashboard";
import { useNavigation } from "@react-navigation/native";

interface PlanModalProps {
  onDismiss: () => void;
  plan: Plan;
}

export const PlanModal = ({ onDismiss, plan }: PlanModalProps) => {
  const { navigate } = useNavigation();

  const handleEditStage = () => {
    onDismiss();
    // @ts-ignore
    navigate("Crops", {
      screen: "EditStage",
      params: { stageId: plan.stage.id, stageName: plan.stage.name },
    });
  };

  return (
    // @ts-ignore
    <Dialog visible onDismiss={onDismiss}>
      <DialogHeader title={() => <Text variant="h4">{plan.crop.name}</Text>} />
      <DialogContent>
        <HStack justify="between">
          <Text variant="h5">
            Etapa {plan.stage.order}/{plan.crop.stageCount}
          </Text>
          <Text variant="h5">
            Dia {plan.stage.day}/{plan.stage.days}
          </Text>
        </HStack>
        <VStack spacing={8} style={{ marginVertical: 20 }}>
          <Text variant="h6">Valores esperados</Text>
          <VStack spacing={8} divider={<Divider />}>
            <VStack>
              <Text>Temperatura (ºC)</Text>
              <Text style={{ alignSelf: "flex-end" }}>
                Min: {plan.stage.temperature.low} | Max: {plan.stage.temperature.high}
              </Text>
            </VStack>
            <VStack justify="between">
              <Text>Humedad relativa (%)</Text>
              <Text style={{ alignSelf: "flex-end" }}>
                Min: {plan.stage.humidity.low} | Max: {plan.stage.humidity.high}
              </Text>
            </VStack>
            <HStack justify="between">
              <Text>CO2 (ppm)</Text>
              <Text>
                Min: {plan.stage.co2.low} | Max: {plan.stage.co2.high}
              </Text>
            </HStack>
            <HStack justify="between">
              <Text>Horas de Luz (Hs.)</Text>
              <Text>{plan.stage.light}</Text>
            </HStack>
            <HStack justify="between">
              <Text>Riego diario (mm3)</Text>
              <Text>{plan.stage.water}</Text>
            </HStack>
          </VStack>
        </VStack>
      </DialogContent>
      <DialogActions>
        <HStack justify="between" style={{ width: "100%" }}>
          <Button onPress={handleEditStage} title="Modificar etapa" color="secondary" />
          <Button onPress={onDismiss} title="Cerrar" />
        </HStack>
      </DialogActions>
    </Dialog>
  );
};
