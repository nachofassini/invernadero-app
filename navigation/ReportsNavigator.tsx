import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Statistics } from "../pages/Statistics";
import { SensorsReport } from "../pages/SensorsReport";
import { ControlsReport } from "../pages/ControlsReport";

type ReportPages = {
  Sensors: {};
  Controls: {};
  Statistics: {};
};

const Tab = createMaterialTopTabNavigator<ReportPages>();

export const ReportsTopNavigator = () => (
  <Tab.Navigator initialRouteName="Statistics" overScrollMode="never">
    <Tab.Screen name="Statistics" component={Statistics} options={{ title: "Estadisticas" }} />
    <Tab.Screen name="Sensors" component={SensorsReport} options={{ title: "Mediciones" }} />
    <Tab.Screen name="Controls" component={ControlsReport} options={{ title: "Correcciones" }} />
  </Tab.Navigator>
);
