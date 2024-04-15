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
import { useNavigation } from "@react-navigation/native";
import { GetActiveCropQuery, useDeactivateCropMutation } from "../gql";
import { HomeNavProps } from "../types/navigation";

interface PlanModalProps {
  onDismiss: () => void;
  crop: GetActiveCropQuery["activeCrop"];
}

export const PlanModal = ({ onDismiss, crop }: PlanModalProps) => {
  const { navigate } = useNavigation<HomeNavProps>();

  const [deactivateCrop, { loading }] = useDeactivateCropMutation({
    refetchQueries: ["GetActiveCrop", "GetCrops"],
    onCompleted: onDismiss,
  });

  if (!crop?.activeStage) return null;
  const { name, stageCount, activeStage } = crop;

  const handleEditStage = () => {
    onDismiss();
    navigate("Crops", {
      // @ts-ignore
      screen: "EditStage",
      params: {
        cropId: crop?.id,
        stageId: activeStage.id,
        stageName: activeStage.name,
      },
    });
  };

  return (
    // @ts-ignore
    <Dialog visible onDismiss={onDismiss}>
      <DialogHeader
        title={() => (
          <HStack justify="between" items="center" style={{ width: "100%" }}>
            <Text variant="h4">{name}</Text>
            <Text variant="h5">
              Etapa {activeStage.order}/{stageCount}
            </Text>
          </HStack>
        )}
      />
      <DialogContent>
        <HStack justify="between" items="center">
          <Text variant="h5">{activeStage.name}</Text>
          <Text variant="h5">
            Dia {activeStage.day}/{activeStage.days}
          </Text>
        </HStack>
        <VStack spacing={8} style={{ marginVertical: 20 }}>
          <Text variant="h6">Valores esperados</Text>
          <VStack spacing={8} divider={<Divider />}>
            <VStack>
              <Text>Temperatura (ºC)</Text>
              <Text style={{ alignSelf: "flex-end" }}>
                Min: {activeStage.minTemperature} | Max: {activeStage.maxTemperature}
              </Text>
            </VStack>
            <VStack justify="between">
              <Text>Humedad relativa (%)</Text>
              <Text style={{ alignSelf: "flex-end" }}>
                Min: {activeStage.minHumidity} | Max: {activeStage.maxHumidity}
              </Text>
            </VStack>
            <HStack justify="between">
              <Text>CO2 (ppm)</Text>
              <Text>
                Min: {activeStage.minCo2} | Max: {activeStage.maxCo2}
              </Text>
            </HStack>
            <HStack justify="between">
              <Text>Horas de Luz (Hs.)</Text>
              <Text>{activeStage.lightHours}</Text>
            </HStack>
            <HStack justify="between">
              <Text>Riego diario (mm3)</Text>
              <Text>{activeStage.irrigation}</Text>
            </HStack>
          </VStack>
        </VStack>
      </DialogContent>
      <DialogActions>
        <VStack spacing={20} style={{ width: "100%" }}>
          <HStack justify="between">
            <Button onPress={handleEditStage} title="Modificar etapa" color="secondary" />
            <Button onPress={onDismiss} title="Cerrar" />
          </HStack>
          <Button loading={loading} onPress={() => deactivateCrop()} title="Desactivar" color="error" />
        </VStack>
      </DialogActions>
    </Dialog>
  );
};
