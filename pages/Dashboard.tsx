import {
  HStack,
  Surface,
  Text,
  VStack,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  Switch,
} from "@react-native-material/core";
import { StyleSheet, View, ScrollView } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import FaIcon from "@expo/vector-icons/FontAwesome5";
import FIcon from "@expo/vector-icons/Feather";
import FoIcon from "@expo/vector-icons/Foundation";

const Dashboard = () => (
  <>
    <ScrollView>
      <VStack justify="between" style={{ minHeight: "100%" }}>
        <Surface style={{ padding: 5, margin: 5 }} elevation={2}>
          <Text variant="h5" style={{ textAlign: "center" }}>
            Condiciónes climaticas externas
          </Text>
          <HStack justify="between" style={{ marginTop: 10 }}>
            <VStack items="center">
              <Text style={styles.weatherConditionLabel}>Luminosidad</Text>
              <FIcon name="sun" color="#f57b65" style={styles.weatherConditionIcon} />
              <Text style={styles.weatherConditionValue}>67%</Text>
            </VStack>
            <VStack items="center">
              <Text style={styles.weatherConditionLabel}>Temperatura</Text>
              <FaIcon name="temperature-low" color="#c75e71" style={styles.weatherConditionIcon} />
              <Text style={styles.weatherConditionValue}>23ºC</Text>
            </VStack>
            <VStack items="center">
              <Text style={styles.weatherConditionLabel}>Humedad</Text>
              <Icon name="water-percent" color="#5eb5c7" style={styles.weatherConditionIcon} />
              <Text style={styles.weatherConditionValue}>48%</Text>
            </VStack>
          </HStack>
        </Surface>

        <View style={styles.greenHouseWrapper}>
          <VStack justify="around" items="center" style={{ paddingVertical: 20 }}>
            <HStack justify="between" items="center">
              <VStack items="center">
                <Text>Humedad</Text>
                <Icon name="water-percent" color="#5eb5c7" style={styles.weatherConditionIcon} />
                <Text style={styles.weatherConditionValue}>60%</Text>
              </VStack>
              <VStack items="center">
                <Text>CO2</Text>
                <Icon name="cloud-search" color="#2e4345" style={{ fontSize: 40 }} />
                <Text style={styles.weatherConditionValue}>691ppm</Text>

                <Icon name="home-thermometer-outline" color="#20eb60" style={{ fontSize: 200 }} />

                <FaIcon name="water" color="#4fdeee" style={{ fontSize: 40 }} />
                <Text>Humedad del suelo</Text>
                <Text style={styles.weatherConditionValue}>60%</Text>
              </VStack>
              <VStack items="center">
                <Text>Temperatura</Text>
                <FaIcon name="temperature-low" color="#c75e71" style={styles.weatherConditionIcon} />
                <Text style={styles.weatherConditionValue}>24ºC</Text>
              </VStack>
            </HStack>
          </VStack>
        </View>

        <Surface style={{ padding: 5, margin: 5 }} elevation={2}>
          <Text variant="h6" style={{ textAlign: "center" }}>
            Dispositivos de control de clima
          </Text>
          <HStack justify="between" style={{ marginTop: 10 }}>
            <VStack items="center">
              <Icon name="fan-plus" style={styles.actionableIcon} />
              <Text style={styles.actionableLabel}>Intractor</Text>
              <Text style={styles.actionableValue}>ON</Text>
            </VStack>
            <VStack items="center">
              <Icon name="weather-windy" style={styles.actionableIcon} />
              <Text style={styles.actionableLabel}>Ventilación</Text>
              <Text style={styles.actionableValue}>OFF</Text>
            </VStack>
            <VStack items="center">
              <Icon name="watering-can" style={styles.actionableIcon} />
              <Text style={styles.actionableLabel}>Riego</Text>
              <Text style={styles.actionableValue}>OFF</Text>
            </VStack>
            <VStack items="center">
              <FoIcon name="lightbulb" style={styles.actionableIcon} />
              <Text style={styles.actionableLabel}>Iluminación</Text>
              <Text style={styles.actionableValue}>OFF</Text>
            </VStack>
            <VStack items="center">
              <Icon name="fan-minus" style={styles.actionableIcon} />
              <Text style={styles.actionableLabel}>Extractor</Text>
              <Text style={styles.actionableValue}>OFF</Text>
            </VStack>
          </HStack>
        </Surface>
      </VStack>
    </ScrollView>
    <Dialog visible={false} onDismiss={() => {}}>
      <DialogHeader title="Contról de riego" />
      <DialogContent>
        <VStack items="center" spacing={20}>
          <Text>¿Activar dispositivo de riego?</Text>
          <Icon name="watering-can" style={{ fontSize: 60 }} />
          <Switch value />
        </VStack>
      </DialogContent>
    </Dialog>
  </>
);

const styles = StyleSheet.create({
  weatherConditionLabel: { fontSize: 18, marginBottom: 5 },
  weatherConditionIcon: { fontSize: 60, marginTop: 5 },
  weatherConditionValue: { fontSize: 20, marginVertical: 5, fontWeight: "600" },

  greenHouseWrapper: {},

  actionableLabel: { fontSize: 16 },
  actionableIcon: { fontSize: 30, marginTop: 5 },
  actionableValue: { fontSize: 16, marginVertical: 5, fontWeight: "600" },
});

export default Dashboard;
