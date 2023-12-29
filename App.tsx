import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider, from } from "@apollo/client";
import { ErrorResponse, onError } from "@apollo/client/link/error";
import { Provider as ThemeProvider } from "@react-native-material/core";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { SafeAreaView, StyleSheet } from "react-native";

import { colors, theme } from "./constants";
import { MainNavigator } from "./navigation/MainNavigator";

const styles = StyleSheet.create({
  container: { minHeight: "100%" },
  bgSetup: { backgroundColor: colors.mainBg },
});

export default function App() {
  const appLink = new HttpLink({ uri: `${Constants.expoConfig?.extra?.apiUrl}/graphql` });

  const errorLink = onError(({ graphQLErrors, networkError, forward }: ErrorResponse) => {
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

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {/* @ts-ignore */}
        <ThemeProvider theme={theme}>
          <SafeAreaView style={[styles.container, styles.bgSetup]}>
            <StatusBar style="auto" />
            <MainNavigator />
          </SafeAreaView>
        </ThemeProvider>
      </NavigationContainer>
    </ApolloProvider>
  );
}
