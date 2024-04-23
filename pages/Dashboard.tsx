import { ActivityIndicator, Button, HStack, IconButton, Surface, Text, VStack } from "@react-native-material/core";
import { StyleSheet, View, Pressable } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useMemo, useState } from "react";
import { PlanModal } from "../components/PlanModal";
import { SensorModal } from "../components/SensorModal";
import { SensorIndicator } from "../components/SensorIndicator";
import { ControlModal } from "../components/ControlModal";
import { ControlIndicator } from "../components/ControlIndicator";
import { useNavigation } from "@react-navigation/native";
import { ChangePlanModal } from "../components/ChangePlanModal";
import {
  Device,
  Measures,
  SensorType,
  useGetActiveCropQuery,
  useGetEnabledDevicesQuery,
  useGetLastMeasureQuery,
} from "../gql";
import { HomeNavProps } from "../types/navigation";
import { Spinner } from "../components/Spinner";
import { ScrollableView } from "../components/ScrollableView";
import { showCo2 } from "../utils/helpers";

export type MeasureUnit = "%" | "ºC" | "ppm" | "mm3" | "Hs";

export interface Sensor {
  dataKey: Measures;
  external?: boolean;
  type: SensorType;
}

export interface Control {
  type: Device;
  active: boolean;
}

export const getPlanTitle = (crop: {
  name: string;
  day?: number;
  days?: number;
  stageCount: number;
  activeStage?: { order?: number } | null;
}): string => `${crop.name} | Etapa: ${crop.activeStage?.order}/${crop.stageCount} | Dia ${crop.day}/${crop.days}`;

export const Dashboard = () => {
  const { setOptions } = useNavigation<HomeNavProps>();
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showChangePlanModal, setShowChangePlanModal] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
  const [selectedControl, setSelectedControl] = useState<Control | null>(null);

  const toggleShowPlanModal = () => setShowPlanModal((prevVal) => !prevVal);
  const toggleShowChangePlanModal = () => setShowChangePlanModal((prevVal) => !prevVal);

  const { data: { activeCrop } = {}, loading: loadingActiveCrop } = useGetActiveCropQuery({
    notifyOnNetworkStatusChange: true,
  });
  const {
    data: { lastMeasure } = {},
    loading: refreshing,
    error,
    refetch,
  } = useGetLastMeasureQuery({ pollInterval: 10000 });
  const {
    data: { enabledDevices } = {},
    loading: fetchingEnabledDevices,
    refetch: refetchEnabledDevices,
  } = useGetEnabledDevicesQuery({
    pollInterval: 10000,
    notifyOnNetworkStatusChange: true,
  });

  const handleRefresh = () => {
    refetch();
    refetchEnabledDevices();
  };

  useEffect(() => {
    if (setOptions) {
      setOptions({
        headerTitle: () =>
          activeCrop?.id && activeCrop.activeStage ? (
            <Pressable onPress={toggleShowPlanModal}>
              <Text>{getPlanTitle(activeCrop)}</Text>
            </Pressable>
          ) : (
            <Pressable onPress={toggleShowChangePlanModal}>
              <Text>No hay plan activo.</Text>
            </Pressable>
          ),
        headerRight: () => (
          <IconButton
            icon={(props) => <Icon name="update" {...props} />}
            onPress={toggleShowChangePlanModal}
            pressEffect="none"
          />
        ),
      });
    }
  }, [activeCrop]);

  useEffect(
    () =>
      setOptions({
        headerLeft: () => refreshing && <ActivityIndicator color="green" style={{ marginLeft: 10 }} />,
      }),
    [refreshing]
  );

  const externalSensors = useMemo<Sensor[]>(
    () => [
      { type: SensorType.Lighting, dataKey: Measures.Lighting, external: true },
      { type: SensorType.Temperature, dataKey: Measures.OutsideTemperature, external: true },
      { type: SensorType.Humidity, dataKey: Measures.OutsideHumidity, external: true },
    ],
    [lastMeasure]
  );

  const internalSensors = useMemo<Sensor[]>(
    () => [
      { type: SensorType.Humidity, dataKey: Measures.InsideHumidity },
      { type: SensorType.Co2, dataKey: Measures.Co2 },
      { type: SensorType.SoilHumidity, dataKey: Measures.SoilHumidity },
      { type: SensorType.Temperature, dataKey: Measures.InsideTemperature },
    ],
    [lastMeasure]
  );

  const controls = useMemo<Control[]>(() => {
    const activeDevices = enabledDevices?.map((item) => item.device) || [];
    return enabledDevices
      ? [
          { type: Device.Fan, active: activeDevices.includes(Device.Fan) },
          { type: Device.Light, active: activeDevices.includes(Device.Light) },
          { type: Device.Irrigation, active: activeDevices.includes(Device.Irrigation) },
          { type: Device.Extractor, active: activeDevices.includes(Device.Extractor) },
        ]
      : [];
  }, [enabledDevices]);

  if (error) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ padding: 20, textAlign: "center" }}>No se pudo establecer conexiön con el invernadero</Text>
        <Button onPress={() => handleRefresh()} title="Intentar nuevamente" color="secondary" />
      </View>
    );
  }
  if (!lastMeasure) return <Spinner loading />;

  return (
    <>
      <ScrollableView loading={refreshing} onRefresh={handleRefresh}>
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
                  value={lastMeasure?.[sensor.dataKey] ?? 0}
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

          {internalSensors.length ? (
            <View style={styles.greenHouseWrapper}>
              <VStack justify="around" items="center" style={{ paddingVertical: 20 }}>
                <HStack justify="between" items="center">
                  <SensorIndicator
                    sensor={internalSensors?.[0]}
                    value={lastMeasure?.[internalSensors?.[0]?.dataKey] ?? 0}
                    onPress={setSelectedSensor}
                    styles={{ icon: styles.externalWeatherConditionIcon, value: styles.externalWeatherConditionValue }}
                  />
                  <VStack items="center">
                    {showCo2() && (
                      <SensorIndicator
                        sensor={internalSensors?.[1]}
                        value={lastMeasure?.[internalSensors?.[1]?.dataKey] ?? 0}
                        onPress={setSelectedSensor}
                        styles={{ icon: { fontSize: 40 }, value: styles.externalWeatherConditionValue }}
                      />
                    )}

                    <Icon name="home-thermometer-outline" color="#20eb60" style={{ fontSize: 200 }} />

                    <SensorIndicator
                      order="reverse"
                      sensor={internalSensors?.[2]}
                      value={lastMeasure?.[internalSensors?.[2]?.dataKey] ?? 0}
                      onPress={setSelectedSensor}
                      styles={{ icon: { fontSize: 40 }, value: styles.externalWeatherConditionValue }}
                    />
                  </VStack>
                  <SensorIndicator
                    sensor={internalSensors?.[3]}
                    value={lastMeasure?.[internalSensors?.[3]?.dataKey] ?? 0}
                    onPress={setSelectedSensor}
                    styles={{ icon: styles.externalWeatherConditionIcon, value: styles.externalWeatherConditionValue }}
                  />
                </HStack>
              </VStack>
            </View>
          ) : null}

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
      </ScrollableView>
      {selectedSensor && <SensorModal sensor={selectedSensor} onDismiss={() => setSelectedSensor(null)} />}
      {selectedControl && (
        <ControlModal
          refetching={fetchingEnabledDevices}
          control={selectedControl}
          onDismiss={() => setSelectedControl(null)}
        />
      )}
      {activeCrop && showPlanModal && <PlanModal crop={activeCrop} onDismiss={toggleShowPlanModal} />}
      {showChangePlanModal && (
        <ChangePlanModal
          loadingActiveCrop={loadingActiveCrop}
          activeCrop={activeCrop}
          onDismiss={toggleShowChangePlanModal}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  externalWeatherConditionLabel: { fontSize: 18, marginBottom: 5 },
  externalWeatherConditionIcon: { fontSize: 60, marginTop: 5 },
  externalWeatherConditionValue: { fontSize: 20, marginVertical: 5, fontWeight: "600" },

  greenHouseWrapper: {},
});
