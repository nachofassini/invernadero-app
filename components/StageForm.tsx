import { useForm } from "react-hook-form";
import RangeSlider from "../components/RangeSlider";
import { Button } from "@react-native-material/core";

type Range = { low: number; high: number };

type StageData = {
  id: string | null;
  temperature: Range;
  humidity: Range;
  co2: Range;
  light: number;
  water: number;
};

const STAGES_INITIAL_VALUES: StageData = {
  id: null,
  temperature: { low: 20, high: 25 },
  humidity: { low: 50, high: 75 },
  co2: { low: 700, high: 900 },
  light: 12,
  water: 10,
};

export const StageForm = () => {
  const { control, handleSubmit } = useForm<StageData>({
    defaultValues: STAGES_INITIAL_VALUES,
  });

  const onSubmit = (data: StageData) => {
    console.log("data", data);
  };

  return (
    <>
      <RangeSlider control={control} name="temperature" label="Temperatura (ºC)" min={15} max={40} />
      <RangeSlider control={control} name="humidity" label="Humedad relativa (%)" min={0} max={100} />
      <RangeSlider control={control} name="co2" label="Concentracion CO2 (ppm)" min={400} max={1200} />
      <RangeSlider control={control} name="light" label="Luz diaria (Min. Hs.)" min={6} max={18} disableRange />
      <RangeSlider control={control} name="water" label="Riego diario (mm3)" min={1} max={50} disableRange />

      <Button title="Guardar" onPress={handleSubmit(onSubmit)} />
    </>
  );
};
