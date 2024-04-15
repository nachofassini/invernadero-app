import { Dialog, DialogHeader, DialogContent, Text, VStack, HStack } from "@react-native-material/core";
import { MeasureDataFragment, Measures, SensorType } from "../gql";
import { formatDate, getMeasureUnitBySensorType, showCo2 } from "../utils/helpers";
import { SensorIcon } from "./SensorIcon";

interface MeasureModalProps {
  measure: MeasureDataFragment;
  onDismiss: () => void;
}

export const MeasureModal = ({ measure, onDismiss }: MeasureModalProps) => (
  // @ts-ignore
  <Dialog visible onDismiss={onDismiss}>
    <DialogHeader title={formatDate(measure.createdAt)} />
    <DialogContent>
      <VStack spacing={45}>
        <VStack justify="center" items="center" spacing={10}>
          <Text>Internas</Text>
          <HStack justify="between" w="100%">
            <VStack items="center">
              <SensorIcon extraStyles={{ fontSize: 40 }} sensor={SensorType.Temperature} />
              <Text>
                {measure[Measures.InsideTemperature]}
                {getMeasureUnitBySensorType(SensorType.Temperature)}
              </Text>
            </VStack>
            <VStack items="center">
              <SensorIcon extraStyles={{ fontSize: 40 }} sensor={SensorType.Humidity} />
              <Text>
                {measure[Measures.InsideHumidity]}
                {getMeasureUnitBySensorType(SensorType.Humidity)}
              </Text>
            </VStack>
            {showCo2() && (
              <VStack items="center">
                <SensorIcon extraStyles={{ fontSize: 40 }} sensor={SensorType.Co2} />
                <Text>
                  {measure[Measures.Co2]}
                  {getMeasureUnitBySensorType(SensorType.Co2)}
                </Text>
              </VStack>
            )}
            <VStack items="center">
              <SensorIcon extraStyles={{ fontSize: 40 }} sensor={SensorType.SoilHumidity} />
              <Text>
                {measure[Measures.SoilHumidity]}
                {getMeasureUnitBySensorType(SensorType.SoilHumidity)}
              </Text>
            </VStack>
          </HStack>
        </VStack>

        <VStack justify="center" items="center" spacing={10}>
          <Text>Externas</Text>
          <HStack justify="between" w="100%">
            <VStack items="center">
              <SensorIcon extraStyles={{ fontSize: 40 }} sensor={SensorType.Lighting} />
              <Text>
                {measure[Measures.Lighting]}
                {getMeasureUnitBySensorType(SensorType.Lighting)}
              </Text>
            </VStack>
            <VStack items="center">
              <SensorIcon extraStyles={{ fontSize: 40 }} sensor={SensorType.Temperature} />
              <Text>
                {measure[Measures.OutsideTemperature]}
                {getMeasureUnitBySensorType(SensorType.Temperature)}
              </Text>
            </VStack>
            <VStack items="center">
              <SensorIcon extraStyles={{ fontSize: 40 }} sensor={SensorType.Humidity} />
              <Text>
                {measure[Measures.OutsideHumidity]}
                {getMeasureUnitBySensorType(SensorType.Humidity)}
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </VStack>
    </DialogContent>
  </Dialog>
);
