import { HStack, IconButton, Surface, Text, VStack } from "@react-native-material/core";
import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useMemo, useState } from "react";
import { PlanModal } from "../components/PlanModal";
import { SensorModal } from "../components/SensorModal";
import { SensorIndicator } from "../components/SensorIndicator";
import { ControlModal } from "../components/ControlModal";
import { ControlIndicator } from "../components/ControlIndicator";
import { STAGES_INITIAL_VALUES } from "../components/StageForm";
import { useNavigation } from "@react-navigation/native";
import { ChangePlanModal } from "../components/ChangePlanModal";
import { ActivePlan, useGetActivePlanQuery } from "../gql";
import { HomeNavProps } from "../types/navigation";

export type Component = "co2" | "luminosity" | "soil_humidity" | "temperature" | "humidity";
export type ControlType = "fan" | "water" | "light" | "extractor";

export interface Sensor {
  component: Component;
  name: string;
  value: string;
}

export interface Control {
  type: ControlType;
  name: string;
  active: boolean;
}

export const getPlanTitle = (
  crop: { name: string; stageCount: number },
  stage: { order?: number | undefined; day?: number | undefined; days?: number | undefined }
): string => `${crop.name} | Etapa: ${stage?.order}/${crop.stageCount} | Dia ${stage?.day}/${stage?.days}`;

const Dashboard = () => {
  const { setOptions } = useNavigation<HomeNavProps>();
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showChangePlanModal, setShowChangePlanModal] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
  const [selectedControl, setSelectedControl] = useState<Control | null>(null);

  const toggleShowPlanModal = () => setShowPlanModal((prevVal) => !prevVal);
  const toggleShowChangePlanModal = () => setShowChangePlanModal((prevVal) => !prevVal);

  const { data: { activePlan } = {} } = useGetActivePlanQuery();

  useEffect(() => {
    if (!!activePlan && setOptions) {
      setOptions({
        headerTitle: () =>
          activePlan.crop && activePlan.stage ? (
            <Pressable onPress={toggleShowPlanModal}>
              <Text>{getPlanTitle(activePlan.crop, activePlan?.stage)}</Text>
            </Pressable>
          ) : (
            <Pressable onPress={toggleShowChangePlanModal}>
              <Text>No hay plan activo.</Text>
            </Pressable>
          ),
        headerRight: () => (
          <IconButton
            icon={(props) => <Icon name="plus" {...props} />}
            onPress={toggleShowChangePlanModal}
            pressEffect="none"
          />
        ),
      });
    }
  }, [activePlan]);

  const externalSensors = useMemo<Sensor[]>(
    () => [
      { component: "luminosity", name: "Luminosidad", value: "67%" },
      { component: "temperature", name: "Temperatura", value: "23ºC" },
      { component: "humidity", name: "Humedad", value: "48%" },
    ],
    []
  );

  const internalSensors = useMemo<Sensor[]>(
    () => [
      { component: "humidity", name: "Humedad", value: "60%" },
      { component: "co2", name: "CO2", value: "691ppm" },
      { component: "soil_humidity", name: "Humedad del suelo", value: "47%" },
      { component: "temperature", name: "Temperatura", value: "24ºC" },
    ],
    []
  );

  const controls = useMemo<Control[]>(
    () => [
      { type: "fan", name: "Intractor", active: true },
      // { type: "fan", name: "Ventilación", active: false },
      { type: "water", name: "Riego", active: false },
      { type: "light", name: "Iluminación", active: false },
      { type: "extractor", name: "Extractor", active: false },
    ],
    []
  );

  return (
    <>
      <ScrollView>
        <VStack justify="between" style={{ minHeight: "100%" }}>
          <Surface style={{ padding: 5, margin: 5 }} elevation={2}>
            <Text variant="h5" style={{ textAlign: "center" }}>
              Condiciones climaticas externas
            </Text>
            <HStack justify="between" style={{ marginTop: 10 }}>
              {externalSensors.map((sensor, index) => (
                <SensorIndicator
                  key={index}
                  sensor={sensor}
                  onPress={setSelectedSensor}
                  styles={{
                    icon: { marginTop: 5 },
                    label: styles.externalWeatherConditionLabel,
                    value: styles.externalWeatherConditionValue,
                  }}
                />
              ))}
            </HStack>
          </Surface>

          <View style={styles.greenHouseWrapper}>
            <VStack justify="around" items="center" style={{ paddingVertical: 20 }}>
              <HStack justify="between" items="center">
                <SensorIndicator
                  sensor={internalSensors[0]}
                  onPress={setSelectedSensor}
                  styles={{ icon: styles.externalWeatherConditionIcon, value: styles.externalWeatherConditionValue }}
                />
                <VStack items="center">
                  <SensorIndicator
                    sensor={internalSensors[1]}
                    onPress={setSelectedSensor}
                    styles={{ icon: { fontSize: 40 }, value: styles.externalWeatherConditionValue }}
                  />

                  <Icon name="home-thermometer-outline" color="#20eb60" style={{ fontSize: 200 }} />

                  <SensorIndicator
                    order="reverse"
                    sensor={internalSensors[2]}
                    onPress={setSelectedSensor}
                    styles={{ icon: { fontSize: 40 }, value: styles.externalWeatherConditionValue }}
                  />
                </VStack>
                <SensorIndicator
                  sensor={internalSensors[3]}
                  onPress={setSelectedSensor}
                  styles={{ icon: styles.externalWeatherConditionIcon, value: styles.externalWeatherConditionValue }}
                />
              </HStack>
            </VStack>
          </View>

          <Surface style={{ padding: 5, margin: 5 }} elevation={2}>
            <Text variant="h6" style={{ textAlign: "center" }}>
              Dispositivos de control de clima
            </Text>
            <HStack justify="between" style={{ marginTop: 10 }}>
              {controls.map((control, index) => (
                <ControlIndicator key={index} control={control} onPress={setSelectedControl} />
              ))}
            </HStack>
          </Surface>
        </VStack>
      </ScrollView>
      {selectedSensor && <SensorModal sensor={selectedSensor} onDismiss={() => setSelectedSensor(null)} />}
      {selectedControl && <ControlModal control={selectedControl} onDismiss={() => setSelectedControl(null)} />}
      {activePlan && showPlanModal && <PlanModal plan={activePlan} onDismiss={toggleShowPlanModal} />}
      {showChangePlanModal && <ChangePlanModal onDismiss={toggleShowChangePlanModal} />}
    </>
  );
};

const styles = StyleSheet.create({
  externalWeatherConditionLabel: { fontSize: 18, marginBottom: 5 },
  externalWeatherConditionIcon: { fontSize: 60, marginTop: 5 },
  externalWeatherConditionValue: { fontSize: 20, marginVertical: 5, fontWeight: "600" },

  greenHouseWrapper: {},
});

export default Dashboard;
