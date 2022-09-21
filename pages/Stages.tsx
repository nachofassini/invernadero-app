import { Box, ListItem } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import Stage from "./Stage";

type Props = NativeStackScreenProps<{ Stages: { plant: string }; Stage: { name: string } }>;

const Stack = createNativeStackNavigator();

const Stages = ({ navigation: { navigate } }: Props) => {
  const onPress = (name: string) => navigate("Stage", { name });
  return (
    <Box>
      <ListItem
        overline="Etapa 1"
        title="Germinación"
        onPress={() => onPress("frutilla")}
        trailing={(props) => <Icon name="chevron-right" {...props} />}
        meta="Activa - 01/07/2022"
      />
      <ListItem
        overline="Etapa 2"
        title="Crecimiento"
        onPress={() => onPress("lechuga")}
        trailing={(props) => <Icon name="chevron-right" {...props} />}
        meta="15/08/2022"
      />
      <ListItem
        overline="Etapa 3"
        title="Maduración"
        onPress={() => onPress("espinaca")}
        trailing={(props) => <Icon name="chevron-right" {...props} />}
        meta="15/10/2022"
      />
    </Box>
  );
};

const Plans = () => (
  <Stack.Navigator initialRouteName="Stages">
    <Stack.Screen name="Stages" component={Stages} options={{ headerShown: false, title: "" }} />
    <Stack.Screen name="Stage" component={Stage} options={{ headerShown: true, title: "Etapa 1: Germinación" }} />
  </Stack.Navigator>
);

export default Plans;
