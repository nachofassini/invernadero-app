import {
  HStack,
  Text,
  VStack,
  Dialog,
  DialogHeader,
  DialogContent,
  Button,
  ActivityIndicator,
} from "@react-native-material/core";
import { MeasureUnit, Sensor } from "../pages/Dashboard";
import { SensorIcon } from "./SensorIcon";
import { GetActiveCropQuery, SensorType, useGetActiveCropQuery, useGetLastMeasuresQuery } from "../gql";
import { formatDate, getMeasureNameBySensorType, getMeasureUnitBySensorType } from "../utils/helpers";
import { useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavProps } from "../types/navigation";

interface SensorModalProps {
  sensor: Sensor;
  onDismiss: () => void;
}

const sensorsWithRanges: SensorType[] = [SensorType.Temperature, SensorType.Co2, SensorType.Humidity];

const CurrentStageData = ({
  crop,
  sensor,
  measureUnit,
  showRanges,
}: {
  crop: GetActiveCropQuery["activeCrop"];
  sensor: SensorType;
  measureUnit: MeasureUnit;
  showRanges: boolean;
}) => {
  const activeStage = crop?.activeStage;
  if (!activeStage) return null;

  const hasRanges = sensorsWithRanges.includes(sensor);
  const ranges: { min: number; max: number } | undefined = useMemo(() => {
    if (!hasRanges) return;
    switch (sensor) {
      case SensorType.Temperature:
        return { min: activeStage.minTemperature, max: activeStage.maxTemperature };
      case SensorType.Co2:
        return { min: activeStage.minCo2, max: activeStage.maxCo2 };
      case SensorType.Humidity:
        return { min: activeStage.minHumidity, max: activeStage.maxHumidity };
    }
  }, [activeStage, hasRanges]);

  return (
    <VStack>
      {ranges && showRanges ? (
        <>
          <HStack justify="between">
            <Text>Cultivo: {crop?.name}</Text>
            <Text>
              Min: {ranges.min}
              {measureUnit}{" "}
            </Text>
          </HStack>
          <HStack justify="between">
            <Text>Etapa: {crop?.activeStage?.order}</Text>
            <Text>
              Max: {ranges.max}
              {measureUnit}
            </Text>
          </HStack>
        </>
      ) : (
        <>
          <HStack justify="between">
            <Text>Cultivo: {crop?.name}</Text>
            <Text>Etapa: {crop?.activeStage?.order}</Text>
          </HStack>
          <HStack justify="between">
            {sensor === SensorType.SoilHumidity && <Text>Riego diario: {activeStage.irrigation}mm3</Text>}
            {sensor === SensorType.Lighting && <Text>Iluminación esperada: {activeStage.lightHours}Hs.</Text>}
          </HStack>
        </>
      )}
    </VStack>
  );
};

export const SensorModal = ({ sensor, onDismiss }: SensorModalProps) => {
  const { navigate } = useNavigation<HomeScreenNavProps["navigation"]>();
  const { data: { activeCrop } = {}, loading: loadingCrop } = useGetActiveCropQuery();
  const { data: { lastMeasures } = {}, loading: loadingMeasures } = useGetLastMeasuresQuery();

  const navigateToReport = () => {
    navigate("Reports", { screen: "Sensors" });
    onDismiss();
  };

  return (
    // @ts-ignore
    <Dialog visible onDismiss={onDismiss}>
      <HStack justify="between" items="center">
        <DialogHeader title={getMeasureNameBySensorType(sensor.type)} />
        <SensorIcon sensor={sensor.type} extraStyles={{ fontSize: 30, marginRight: 10 }} />
      </HStack>
      <DialogContent>
        <VStack spacing={8}>
          {loadingCrop ? (
            <ActivityIndicator color="green" />
          ) : (
            activeCrop && (
              <VStack spacing={8}>
                <Text variant="h6">Valores esperados:</Text>
                <CurrentStageData
                  crop={activeCrop}
                  sensor={sensor.type}
                  showRanges={!sensor.external}
                  measureUnit={getMeasureUnitBySensorType(sensor.type)}
                />
              </VStack>
            )
          )}

          <Text variant="h6">Últimas mediciones:</Text>
          {loadingMeasures ? (
            <ActivityIndicator color="green" />
          ) : (
            <VStack>
              {lastMeasures?.map((measure) => (
                <Text key={measure.id}>
                  {formatDate(measure.createdAt, 'DD/MM HH:mm:ss')}{" -> "}
                  <Text variant="overline" style={{ fontSize: 16,  }}>
                    {measure?.[sensor.dataKey]}
                    {getMeasureUnitBySensorType(sensor.type)}
                  </Text>
                </Text>
              ))}
            </VStack>
          )}
        </VStack>
        <Button
          title="Ver mas"
          color="secondary"
          style={{ marginTop: 20, shadowOffset: { width: 2, height: 2 } }}
          onPress={navigateToReport}
        />
      </DialogContent>
    </Dialog>
  );
};
