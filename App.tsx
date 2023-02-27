import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Provider as ThemeProvider } from "@react-native-material/core";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { colors, theme } from "./constants";
import Dashboard from "./pages/Dashboard";
import Plans from "./pages/Plans";
import Reports from "./pages/Reports";

export type RootTabParamList = {
  Home: undefined;
  Plans: undefined;
  Reports: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  return (
    <NavigationContainer>
      {/* @ts-ignore */}
      <ThemeProvider theme={theme}>
        <View style={[styles.container, styles.bgSetup]}>
          <StatusBar style="auto" />
          <Tab.Navigator initialRouteName="Home" /* screenOptions={{ headerShown: false }} */>
            <Tab.Screen
              name="Home"
              component={Dashboard}
              options={{ tabBarIcon: (props) => <Icon name="home" {...props} />, title: "Invernadero" }}
            />
            <Tab.Screen
              name="Plans"
              component={Plans}
              options={{ tabBarIcon: (props) => <Icon name="cog" {...props} />, title: "Cultivos" }}
            />
            <Tab.Screen
              name="Reports"
              component={Reports}
              options={{ tabBarIcon: (props) => <Icon name="chart-line" {...props} />, title: "Reportes" }}
            />
          </Tab.Navigator>
        </View>
      </ThemeProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { minHeight: "100%" },
  bgSetup: { backgroundColor: colors.mainBg },
});
