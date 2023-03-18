import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider, from } from "@apollo/client";
import { ErrorResponse, onError } from "@apollo/client/link/error";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, StyleSheet } from "react-native";
import { Provider as ThemeProvider } from "@react-native-material/core";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { colors, theme } from "./constants";
import Dashboard from "./pages/Dashboard";
import Crops from "./pages/Crops";
import Reports from "./pages/Reports";
import { RootTabParamList } from "./types/navigation";

const Tab = createBottomTabNavigator<RootTabParamList>();

const appLink = new HttpLink({
  // uri: "http://localhost:8000/graphl",
  uri: "https://6047-186-139-123-218.sa.ngrok.io/graphql",
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }: ErrorResponse) => {
  if (graphQLErrors) {
    for (let error of graphQLErrors) {
      const { message } = error;
      console.log("gql error message", message);
    }
  }

  if (networkError) {
    console.log("network error message", networkError.message);
  }
});

const client = new ApolloClient({
  link: from([errorLink, appLink]),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {/* @ts-ignore */}
        <ThemeProvider theme={theme}>
          <SafeAreaView style={[styles.container, styles.bgSetup]}>
            <StatusBar style="auto" />
            <Tab.Navigator initialRouteName="Crops">
              <Tab.Screen
                name="Home"
                component={Dashboard}
                options={{ tabBarIcon: (props) => <Icon name="home" {...props} />, title: "" }}
              />
              <Tab.Screen
                name="Crops"
                component={Crops}
                options={{
                  tabBarIcon: (props) => <Icon name="cog" {...props} />,
                  title: "Cultivos",
                  headerShown: true,
                }}
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
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: { minHeight: "100%" },
  bgSetup: { backgroundColor: colors.mainBg },
});
