import { Box, Button, ListItem } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import Stage from "./Stage";
import { useEffect, useLayoutEffect } from "react";
import { NavigatorScreenParams, useNavigation, useRoute } from "@react-navigation/native";
import { CropsNavigation, StagesScreenProps } from "./Crops";

type Stage = {
  id: string;
  order: number;
  name: string;
  active: boolean;
  days: number;
};

const Stages = () => {
  const { setOptions, navigate } = useNavigation<StagesScreenProps["navigation"]>();
  const {
    params: { id: cropId, name: cropName },
  } = useRoute<StagesScreenProps["route"]>();

  useLayoutEffect(() => {
    if (cropName && setOptions) setOptions({ headerBackTitle: cropName });
  }, [setOptions, cropName]);

  const stages: Stage[] = [
    { id: "1", order: 1, name: "Germinación", active: true, days: 30 },
    { id: "2", order: 2, name: "Crecimiento", active: false, days: 60 },
    { id: "3", order: 3, name: "Maduración", active: false, days: 45 },
  ];

  return (
    <Box>
      {stages.map((stage) => (
        <ListItem
          key={stage.id}
          overline={`Etapa: ${stage.order}`}
          title={stage.name}
          onPress={() => navigate("EditStage", { stageId: stage.id, stageName: stage.name })}
          trailing={(props) => <Icon name="chevron-right" {...props} />}
          meta={`${stage.active ? "Activa - " : ""}${stage.days} días`}
        />
      ))}
    </Box>
  );
};

export default Stages;
