import { Box, IconButton, Button, ListItem } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import Stages from "./Stages";
import Stage from "./Stage";
import { Text } from "react-native";
import { getFocusedRouteNameFromRoute, useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { CropFormData, CropFormModal } from "../components/CropFormModal";

export type CropsNavigation = {
  Home: {};
  Stages: { id: string; name: string };
  NewStage: { cropId: string };
  EditStage: { stageId: string; stageName: string };
};

type CropsScreenProps = NativeStackScreenProps<CropsNavigation, "Home">;
export type StagesScreenProps = NativeStackScreenProps<CropsNavigation, "Stages">;
export type NewStageScreenProps = NativeStackScreenProps<CropsNavigation, "NewStage">;
export type EditStageScreenProps = NativeStackScreenProps<CropsNavigation, "EditStage">;

const Stack = createNativeStackNavigator<CropsNavigation>();

const CropList = () => {
  const { navigate, getParent } = useNavigation<CropsScreenProps["navigation"]>();
  const isFocused = useIsFocused();

  const [showCropForm, setShowCropForm] = useState<CropFormData | null>();

  const handleCloseCropForm = () => setShowCropForm(null);

  // set tab nav header
  useLayoutEffect(() => {
    if (isFocused) {
      getParent()?.setOptions({
        headerRight: () => (
          <IconButton
            icon={(props) => <Icon name="plus" {...props} />}
            onPress={() => setShowCropForm({ name: "" })}
            pressEffect="none"
          />
        ),
      });
    } else {
      getParent()?.setOptions({ headerRight: () => null });
    }
  }, [isFocused]);

  const crops = [
    { id: "frutilla", name: "Frutilla", active: true },
    { id: "lechuga", name: "Lechuga", active: false },
    { id: "espinaca", name: "Espinaca", active: false },
    { id: "rucula", name: "Rúcula", active: false },
    { id: "cebolla", name: "Cebolla", active: false },
  ];

  const onCropFormSubmit = ({ name }: CropFormData) => {
    // submit create/update crop call
    handleCloseCropForm();
    // refresh crop list
  };

  return (
    <>
      <Box>
        {crops.map((crop) => (
          <ListItem
            key={crop.id}
            title={crop.name}
            onPress={() => navigate("Stages", { id: crop.id, name: crop.name })}
            onLongPress={() => setShowCropForm(crop)}
            trailing={(props) => <Icon name="chevron-right" {...props} />}
            meta={crop.active ? "ACTIVO" : ""}
          />
        ))}
      </Box>
      {!!showCropForm && (
        <CropFormModal defaultValues={showCropForm} onSubmit={onCropFormSubmit} onDismiss={handleCloseCropForm} />
      )}
    </>
  );
};

const Crops = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={CropList} options={{ headerShown: false }} />
    <Stack.Screen
      name="Stages"
      component={Stages}
      options={({ navigation, route }: StagesScreenProps) => ({
        title: "Etapas",
        headerRight: () => (
          <IconButton
            icon={(props) => <Icon name="plus" {...props} />}
            onPress={() => navigation.navigate("NewStage", { cropId: route.params.id })}
            pressEffect="none"
          />
        ),
      })}
    />
    <Stack.Screen name="NewStage" component={Stage} options={{ title: "Nueva etapa" }} />
    <Stack.Screen
      name="EditStage"
      component={Stage}
      options={({ route }: EditStageScreenProps) => ({ title: `Editar: ${route.params.stageName}` })}
    />
  </Stack.Navigator>
);

export default Crops;
