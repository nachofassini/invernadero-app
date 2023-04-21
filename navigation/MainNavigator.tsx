import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { RootTabParamList } from "../types/navigation";
import { Dashboard } from "../pages/Dashboard";
import { CropNavigator } from "./CropsNavigator";
import { ReportsTopNavigator } from "./ReportsNavigator";

const Tab = createBottomTabNavigator<RootTabParamList>();

export const MainNavigator = () => (
  <Tab.Navigator initialRouteName="Home">
    <Tab.Screen
      name="Home"
      component={Dashboard}
      options={{ tabBarIcon: (props) => <Icon name="home" {...props} />, title: "Centro de control" }}
    />
    <Tab.Screen
      name="Crops"
      component={CropNavigator}
      options={{
        tabBarIcon: (props) => <Icon name="cog" {...props} />,
        title: "Cultivos",
        headerShown: true,
      }}
    />
    <Tab.Screen
      name="Reports"
      component={ReportsTopNavigator}
      options={{
        tabBarIcon: (props) => <Icon name="chart-line" {...props} />,
        headerShown: false,
        title: "Reportes",
      }}
    />
  </Tab.Navigator>
);
