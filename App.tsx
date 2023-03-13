import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Provider as ThemeProvider } from "@react-native-material/core";
import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { colors, theme } from "./constants";
import Dashboard, { HomeNavProps } from "./pages/Dashboard";
import Crops, { CropsNavigation } from "./pages/Crops";
import Reports from "./pages/Reports";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootTabParamList = {
  Home: HomeNavProps;
  Crops: NativeStackNavigationProp<CropsNavigation>;
  Reports: BottomTabNavigationProp<{}>;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  return (
    <NavigationContainer>
      {/* @ts-ignore */}
      <ThemeProvider theme={theme}>
        <SafeAreaView style={[styles.container, styles.bgSetup]}>
          <StatusBar style="auto" />
          <Tab.Navigator initialRouteName="Home">
            <Tab.Screen
              name="Home"
              component={Dashboard}
              options={{ tabBarIcon: (props) => <Icon name="home" {...props} />, title: "" }}
            />
            <Tab.Screen
              name="Crops"
              component={Crops}
              options={{ tabBarIcon: (props) => <Icon name="cog" {...props} />, title: "Cultivos", headerShown: true }}
            />
            <Tab.Screen
              name="Reports"
              component={Reports}
              options={{ tabBarIcon: (props) => <Icon name="chart-line" {...props} /> }}
            />
          </Tab.Navigator>
        </SafeAreaView>
      </ThemeProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { minHeight: "100%" },
  bgSetup: { backgroundColor: colors.mainBg },
});
