import { IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CropList } from "../pages/Crops";
import { Stages } from "../pages/Stages";
import { Stage } from "../pages/Stage";

import { CropsNavigation, EditStageScreenProps, StagesScreenProps } from "../types/navigation";

const Stack = createNativeStackNavigator<CropsNavigation>();

export const CropNavigator = () => (
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
