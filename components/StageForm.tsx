import { useForm } from "react-hook-form";
import RangeSlider from "../components/RangeSlider";
import { Box, Button, TextInput } from "@react-native-material/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "./Input";

type Range = { low: number; high: number };

export type StageData = {
  id: string | null;
  name: string;
  days: number;
  temperature: Range;
  humidity: Range;
  co2: Range;
  light: number;
  water: number;
};

export const STAGES_INITIAL_VALUES: StageData = {
  id: null,
  name: "",
  days: 0,
  temperature: { low: 20, high: 25 },
  humidity: { low: 50, high: 75 },
  co2: { low: 700, high: 900 },
  light: 12,
  water: 10,
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
    light: yup.number().required(),
    water: yup.number().required(),
  })
  .required();

interface SageFormProps {
  onSubmit: (data: StageData) => void;
  defaultValues?: StageData;
}

export const StageForm = ({ defaultValues, onSubmit }: SageFormProps) => {
  const { control, handleSubmit } = useForm<StageData>({
    defaultValues: defaultValues || STAGES_INITIAL_VALUES,
    resolver: yupResolver(validationSchema),
  });

  return (
    <Box style={{ width: "100%" }}>
      <Input control={control} name="name" label="Nombre" placeholder="Nombre" />
      <Input control={control} name="days" label="Días" placeholder="Días" />
      <RangeSlider control={control} name="temperature" label="Temperatura (ºC)" min={15} max={40} />
      <RangeSlider control={control} name="humidity" label="Humedad relativa (%)" min={0} max={100} />
      <RangeSlider control={control} name="co2" label="Concentracion CO2 (ppm)" min={400} max={1200} />
      <RangeSlider control={control} name="light" label="Luz diaria (Min. Hs.)" min={6} max={18} disableRange />
      <RangeSlider control={control} name="water" label="Riego diario (mm3)" min={1} max={50} disableRange />

      <Button title={defaultValues?.id ? "Guardar" : "Crear"} onPress={handleSubmit(onSubmit)} color="secondary" />
    </Box>
  );
};
