import { useForm } from "react-hook-form";
import RangeSlider from "../components/RangeSlider";
import { Box, Button } from "@react-native-material/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "./Input";
import { GetStageQuery, Stage, StageInput } from "../gql";
import { useEffect } from "react";

type Range = { low: number; high: number };

export type StageData = {
  id: string | null;
  name: string;
  days: number;
  temperature: Range;
  humidity: Range;
  co2: Range;
  lightHours: number;
  irrigation: number;
};

export const STAGES_INITIAL_VALUES: StageData = {
  id: null,
  name: "",
  days: 0,
  temperature: { low: 20, high: 25 },
  humidity: { low: 50, high: 75 },
  co2: { low: 700, high: 900 },
  lightHours: 12,
  irrigation: 10,
};

const validationSchema = yup
  .object({
    name: yup
      .string()
      .required("Debe elegir un nombre para la etapa")
      .min(3, "El nombre de la etapa debe ser de al menos ${min} caracteres")
      .max(100, "El nombre de la etapa no debe ser mayor a ${max} caracteres"),
    temperature: yup.object({ low: yup.number().required(), high: yup.number().required() }),
    humidity: yup.object({ low: yup.number().required(), high: yup.number().required() }),
    co2: yup.object({ low: yup.number().required(), high: yup.number().required() }),
    lightHours: yup.number().required(),
    irrigation: yup.number().required(),
  })
  .required();

interface SageFormProps {
  stage?: GetStageQuery["stage"];
  loading: boolean;
  onSubmit: (data: Omit<StageInput, "cropId">) => void;
}

export const StageForm = ({ stage, loading, onSubmit }: SageFormProps) => {
  const { control, handleSubmit, reset, formState } = useForm<StageData>({
    defaultValues: STAGES_INITIAL_VALUES,
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (stage) {
      reset({
        id: stage.id,
        name: stage.name,
        days: stage.days,
        temperature: { low: stage.minTemperature, high: stage.maxTemperature },
        humidity: { low: stage.minHumidity, high: stage.maxHumidity },
        co2: { low: stage.minCo2, high: stage.maxCo2 },
        lightHours: stage.lightHours,
        irrigation: stage.irrigation,
      });
    }
  }, [stage]);

  const submitHandler = ({
    id,
    name,
    days,
    temperature: { low: minTemperature, high: maxTemperature },
    humidity: { low: minHumidity, high: maxHumidity },
    co2: { low: minCo2, high: maxCo2 },
    lightHours,
    irrigation,
  }: StageData) =>
    onSubmit({
      id,
      name,
      days,
      minTemperature,
      maxTemperature,
      minHumidity,
      maxHumidity,
      minCo2,
      maxCo2,
      lightHours,
      irrigation,
    });

  return (
    <Box style={{ width: "100%" }}>
      <Input control={control} name="name" label="Nombre" placeholder="Nombre" />
      <Input
        control={control}
        name="days"
        label="Días"
        placeholder="Días"
        keyboardType="number-pad"
        returnKeyType="done"
        type="number"
      />
      <RangeSlider control={control} name="temperature" label="Temperatura (ºC)" min={0} max={50} />
      <RangeSlider control={control} name="humidity" label="Humedad relativa (%)" min={0} max={100} />
      <RangeSlider control={control} name="co2" label="Concentracion CO2 (ppm)" min={400} max={1200} />
      <RangeSlider control={control} name="lightHours" label="Luz diaria (Min. Hs.)" min={0} max={24} disableRange />
      <RangeSlider control={control} name="irrigation" label="Riego diario (mm3)" min={0} max={2000} disableRange />

      <Button
        title={stage?.id ? "Guardar" : "Crear"}
        onPress={handleSubmit(submitHandler)}
        color="secondary"
        loading={loading}
        disabled={loading}
      />
    </Box>
  );
};
