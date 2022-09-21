import { Box, ListItem } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import Plan from "./Stages";

type Props = NativeStackScreenProps<{ Home: undefined; Stages: { plant: string } }>;

const Stack = createNativeStackNavigator();

const PlanList = ({ navigation: { navigate } }: Props) => {
  const onPress = (plant: string) => navigate("Stages", { plant });
  return (
    <Box>
      <ListItem
        title="Frutilla"
        onPress={() => onPress("frutilla")}
        trailing={(props) => <Icon name="chevron-right" {...props} />}
        meta="ACTIVO"
      />
      <ListItem
        title="Lechuga"
        onPress={() => onPress("lechuga")}
        trailing={(props) => <Icon name="chevron-right" {...props} />}
      />
      <ListItem
        title="Espinaca"
        onPress={() => onPress("espinaca")}
        trailing={(props) => <Icon name="chevron-right" {...props} />}
      />
      <ListItem
        title="Rúcula"
        onPress={() => onPress("rucula")}
        trailing={(props) => <Icon name="chevron-right" {...props} />}
      />
      <ListItem
        title="Cebolla"
        onPress={() => onPress("Cebolla")}
        trailing={(props) => <Icon name="chevron-right" {...props} />}
      />
    </Box>
  );
};

const Plans = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={PlanList} options={{ headerShown: false, title: "" }} />
    <Stack.Screen name="Stages" component={Plan} options={{ headerShown: true, title: "Frutilla" }} />
  </Stack.Navigator>
);

export default Plans;
