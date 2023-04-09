import { ApolloError } from "@apollo/client";
import { GraphQLError } from "graphql";
import _ from "lodash";
import moment from "moment";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { MeasureUnit as SensorMeasureUnit } from "../pages/Dashboard";
import { Device, MeasureUnit, SensorType } from "../gql";
import { useMemo } from "react";

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
