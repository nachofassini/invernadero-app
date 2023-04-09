import { Button, IconButton, ListItem } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Stages from "./Stages";
import Stage from "./Stage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { CropFormModal } from "../components/CropFormModal";
import { CropInput, useGetCropsQuery } from "../gql";
import { CropsNavigation, CropsScreenProps, EditStageScreenProps, StagesScreenProps } from "../types/navigation";
import { Snackbar } from "../components/Snackbar";
import { ScrollableView } from "../components/ScrollableView";

const Stack = createNativeStackNavigator<CropsNavigation>();

const CropList = () => {
  const { navigate, getParent } = useNavigation<CropsScreenProps["navigation"]>();
  const isFocused = useIsFocused();

  const { data: { crops } = {}, loading, error, refetch } = useGetCropsQuery();

  const [showCropForm, setShowCropForm] = useState<CropInput | null>();
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

  return (
    <>
      <ScrollableView loading={loading} onRefresh={refetch}>
        {error && !loading && <Snackbar type="error" message="Upss. Ocurrió un error cargando los cultivos." />}
        {crops?.length === 0 ? (
          <Snackbar
            message="No se registró ningun cultivo todavia."
            actionTitle="¡Agregá un cultivo!"
            onPress={() => setShowCropForm({ name: "" })}
          />
        ) : (
          crops?.map((crop) => (
            <ListItem
              key={crop.id}
              title={crop.name}
              onPress={() => navigate("Stages", { id: crop.id, name: crop.name })}
              onLongPress={() => setShowCropForm({ id: crop.id, name: crop.name })}
              trailing={(props) => <Icon name="chevron-right" {...props} />}
              meta={crop?.active ? "ACTIVO" : ""}
            />
          ))
        )}
      </ScrollableView>
      {!!showCropForm && <CropFormModal defaultValues={showCropForm} onDismiss={handleCloseCropForm} />}
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
