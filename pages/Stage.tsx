import { Text } from "@react-native-material/core";
import { useCallback, useState } from "react";
import { View } from "react-native";
import RangeSlider from "../components/RangeSlider";

const Stage = () => {
  return (
    <View style={{ alignItems: "center", paddingVertical: 20 }}>
      <Text>Hasta: 01/07/2022</Text>

      <RangeSlider fieldName="Temperatura (ºC)" min={15} max={40} low={20} high={25} />
      <RangeSlider fieldName="Humedad relativa (%)" min={0} max={100} low={50} high={75} />
      <RangeSlider fieldName="Concentracion CO2 (ppm)" min={400} max={1200} low={700} high={900} />
      <RangeSlider fieldName="Luz diario (Hs.)" min={6} max={18} low={12} disableRange />
      <RangeSlider fieldName="Riego diario (mm3)" min={1} max={50} low={10} disableRange />
    </View>
  );
};

export default Stage;
