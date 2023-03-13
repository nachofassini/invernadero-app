import { Button, Stack, Text, VStack } from "@react-native-material/core";
import { useCallback, useState } from "react";
import { ScrollView, View } from "react-native";
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

  // const defaultValues = fetch stage data

  const onSubmit = () => {};
  const onDelete = () => {};

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <StageForm /* defaultValues={{ id: stageId }} */ onSubmit={onSubmit} />

      {stageId && <Button title="Eliminar etapa" onPress={onDelete} color="error" style={{ marginTop: 10 }} />}
    </ScrollView>
  );
};

export default Stage;
