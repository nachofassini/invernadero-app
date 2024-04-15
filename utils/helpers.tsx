import { ApolloError } from "@apollo/client";
import { GraphQLError } from "graphql";
import _ from "lodash";
import moment from "moment";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { HStack, Text } from "@react-native-material/core";

import { MeasureUnit as SensorMeasureUnit } from "../pages/Dashboard";
import { ActivationType, Device, MeasureUnit, SensorType } from "../gql";
import { ReactNode, useMemo } from "react";

interface ValidationError<T> extends FieldValues {
  [field: string]: string[];
}

export interface ApiError<T> extends GraphQLError {
  extensions: {
    validation?: ValidationError<T>;
  };
}

export const setFormValidationErrors = <T extends FieldValues>(error: ApolloError, setError: UseFormSetError<T>) => {
  error.graphQLErrors?.forEach(({ extensions }: ApiError<T>) => {
    console.log("extension", extensions);
    for (const [field, messages] of Object.entries(extensions?.validation || {})) {
      const fieldName = field.replace("data.", "");
      setError(fieldName as Path<T>, { type: "validation", message: messages[0] });
    }
  });
};

export const formatDate = (date: string, format: string = "DD/MM/YYYY HH:mm:ss") => {
  return moment(date).format(format);
};

export const getMeasureUnitBySensorType = (sensor: SensorType): SensorMeasureUnit => {
  switch (sensor) {
    case SensorType.Temperature:
      return "ºC";
    case SensorType.Co2:
      return "ppm";
    case SensorType.Lighting:
    case SensorType.SoilHumidity:
    case SensorType.Humidity:
      return "%";
  }
};

export const getMeasureNameBySensorType = (sensor: SensorType): string => {
  switch (sensor) {
    case SensorType.Temperature:
      return "Temperatura";
    case SensorType.Co2:
      return "CO2";
    case SensorType.Lighting:
      return "Luminosidad";
    case SensorType.SoilHumidity:
      return "Humedad del Suelo";
    case SensorType.Humidity:
      return "Humedad";
  }
};

export const getDeviceName = (device: Device) => {
  switch (device) {
    case Device.Fan:
      return "Ventilación";
    case Device.Irrigation:
      return "Riego";
    case Device.Light:
      return "Iluminación";
    case Device.Extractor:
      return "Extractor";
  }
};

export const getDeviceUnit = (device: Device): MeasureUnit => {
  switch (device) {
    case Device.Fan:
      return MeasureUnit.Mins;
    case Device.Irrigation:
      return MeasureUnit.Mm3;
    case Device.Light:
      return MeasureUnit.Hours;
    case Device.Extractor:
      return MeasureUnit.Mins;
  }
};

export const getDeviceActivationByDescription = (type?: ActivationType | null): string => {
  switch (type) {
    case ActivationType.HighCo2:
      return "Alto Co2";
    case ActivationType.HighHumidity:
      return "Alta humedad";
    case ActivationType.HighSoilHumidity:
      return "Alta humedad de Suelo";
    case ActivationType.HighTemperature:
      return "Alta temperatura";
    case ActivationType.LowCo2:
      return "Bajo Co2";
    case ActivationType.LowHumidity:
      return "Baja humedad";
    case ActivationType.LowLighting:
      return "Baja iluminación";
    case ActivationType.LowSoilHumidity:
      return "Baja humedad de suelo";
    case ActivationType.LowTemperature:
      return "Baja temperatura";
    case ActivationType.Manual:
      return "Manual";
    default:
      return "";
  }
};

export const getDeviceActivationByDescriptionWithIcon = (type?: ActivationType | null): ReactNode => {
  let icon: "manual" | "up" | "down" | null = null;
  let measure: "Co2" | "Hum." | "H. suelo" | "Temp." | "Luz" | "Manual" = "Manual";

  switch (type) {
    case ActivationType.HighCo2:
    case ActivationType.HighHumidity:
    case ActivationType.HighSoilHumidity:
    case ActivationType.HighTemperature:
    case ActivationType.LowCo2:
      icon = "up";
      break;
    case ActivationType.LowHumidity:
    case ActivationType.LowLighting:
    case ActivationType.LowSoilHumidity:
    case ActivationType.LowTemperature:
      icon = "down";
      break;
    case ActivationType.Manual:
      icon = "manual";
      break;
  }

  switch (type) {
    case ActivationType.HighCo2:
    case ActivationType.LowCo2:
      measure = "Co2";
      break;
    case ActivationType.HighHumidity:
      measure = "Hum.";
      break;
    case ActivationType.HighTemperature:
    case ActivationType.LowTemperature:
      measure = "Temp.";
      break;
    case ActivationType.HighSoilHumidity:
    case ActivationType.LowSoilHumidity:
      measure = "H. suelo";
      break;
    case ActivationType.LowLighting:
      measure = "Luz";
      break;
  }

  if (!icon) return null;

  return (
    <HStack spacing={10} items="center">
      {icon === "up" ? (
        <>
          <Icon style={{ fontSize: 18 }} name="arrow-up" color="#f57b65" />
        </>
      ) : icon === "down" ? (
        <Icon style={{ fontSize: 18 }} name="arrow-down" color="#5eb5c7" />
      ) : (
        <Icon style={{ fontSize: 18 }} name="hand-back-right-outline" />
      )}
      <Text>{measure}</Text>
    </HStack>
  );
};

export const useDeviceActivationOptions = (device: Device): { label: string; value: number }[] => {
  return useMemo(() => {
    const baseArray = Array(15).fill(null);
    switch (device) {
      // TODO: set right values for irrigation options (mm3 not minutes)
      case Device.Irrigation:
      case Device.Fan:
      case Device.Extractor:
        return baseArray.map((_, index) => ({ label: `${index + 1} ${getDeviceUnit(device)}`, value: index + 1 }));

      case Device.Light:
        return baseArray.map((_, index) => ({
          label: `${(index + 1) * 5} ${MeasureUnit.Mins}`,
          value: (index + 1) * 5,
        }));
    }
  }, [device]);
};

export const showCo2 = (): boolean => process.env.EXPO_PUBLIC_HIDE_CO2 !== "true";
