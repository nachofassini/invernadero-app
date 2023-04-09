import { ActivityIndicator } from "@react-native-material/core";
import { View } from "react-native";

export const Spinner = ({ loading }: { loading: boolean }) =>
  loading ? (
    <View style={{ width: "100%", height: "100%", minHeight: "100%", alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color="green" />
    </View>
  ) : null;
