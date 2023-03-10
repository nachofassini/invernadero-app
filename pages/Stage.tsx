import { Text } from "@react-native-material/core";
import { useCallback, useState } from "react";
import { View } from "react-native";
import RangeSlider from "../components/RangeSlider";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CropsNavigation, EditStageScreenProps, NewStageScreenProps } from "./Crops";
import { useRoute } from "@react-navigation/native";
import { StageForm } from "../components/StageForm";

type NavProps = NewStageScreenProps | EditStageScreenProps;

const Stage = () => {
  const { params, name } = useRoute<NavProps["route"]>();

  const cropId = name === "NewStage" ? params.cropId : null;
  const stageId = name === "EditStage" ? params.stageId : null;

  return (
    <View style={{ alignItems: "center", paddingVertical: 20 }}>
      <Text>cropId: {cropId}</Text>
      <Text>stageId: {stageId}</Text>
      <Text>Hasta: 01/07/2022</Text>

      <StageForm />
    </View>
  );
};

export default Stage;
