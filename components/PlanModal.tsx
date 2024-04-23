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
import { formatDate } from "../utils/helpers";

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
          <HStack justify="between" items="center" style={{ width: "100%", marginTop: 10 }}>
            <VStack>
              <Text>Cultivo:</Text>
              <Text variant="h4">{name}</Text>
            </VStack>
            <VStack items="end">
              <Text variant="h6">
                Día {crop.day}/{crop.days}
              </Text>
              <Text variant="h6">
                Etapa {activeStage.order}/{stageCount}
              </Text>
            </VStack>
          </HStack>
        )}
      />
      <DialogContent>
        <VStack
          items="center"
          spacing={4}
          style={{ marginVertical: 10, paddingVertical: 4, paddingHorizontal: 4, borderWidth: 0.3, borderRadius: 8 }}
        >
          <Text variant="h6">Etapa: {activeStage.name}</Text>
          <HStack justify="between" style={{ width: "100%" }}>
            <VStack>
              <Text>Inicio: {formatDate(activeStage.activeFrom, "DD/MM/YY HH:mm")}</Text>
              <Text>Fin: {formatDate(activeStage.activeTo, "DD/MM/YY HH:mm")}</Text>
            </VStack>
            <VStack>
              <Text>Dia</Text>
              <Text>
                {activeStage.day}/{activeStage.days}
              </Text>
            </VStack>
          </HStack>
        </VStack>
        <VStack spacing={8} style={{ marginVertical: 10 }}>
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
