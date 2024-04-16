import { ActivityIndicator, Surface, Text, VStack } from "@react-native-material/core";
import { Dimensions, StyleSheet } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import { ScrollableView } from "../components/ScrollableView";
import { formatDate, getDeviceActivationByDescription, getDeviceName, showCo2 } from "../utils/helpers";
import {
  useGetActivationsCountGroupedByDeviceQuery,
  useGetActivationsCountGroupedByTypeQuery,
  useGetMeasuresAverageGroupedByDayQuery,
  useGetMeasuresAverageGroupedByHourQuery,
} from "../gql";
import moment from "moment";

const colors = [
  "#3498db",
  "#c0392b",
  "#27ae60",
  "#ff9f43",
  "#9b59b6",
  "#f1c40f",
  "#e91e63",
  "cyan",
  "#95a5a6",
  "#2c3e50",
  "#00bcd4",
];

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 16,
  },
  cardTitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 12,
  },
});

const MEASURE_FROM_LAST_N_DAYS = 20;

export const Statistics = () => {
  const {
    loading: loadingMeasuresAverageByHour,
    data: { measuresAverageGroupedByHour } = {},
    refetch: refetchMeasuresAverageGroupedByHour,
  } = useGetMeasuresAverageGroupedByHourQuery({
    variables: {
      range: {
        from: moment().subtract(1, "day").format("YYYY-MM-DD HH:mm:ss"),
        to: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
    },
  });

  const {
    loading: loadingMeasuresAverageByDay,
    data: { measuresAverageGroupedByDay } = {},
    refetch: refetchMeasuresAverageGroupedByDay,
  } = useGetMeasuresAverageGroupedByDayQuery({
    variables: {
      range: {
        from: moment().subtract(20, "day").format("YYYY-MM-DD"),
        to: moment().format("YYYY-MM-DD"),
      },
    },
  });

  const {
    loading: loadingLastActivationsGroupedByDevice,
    data: { activationsCountGroupedByDevice } = {},
    refetch: refetchActivationsCountGroupedByDevice,
  } = useGetActivationsCountGroupedByDeviceQuery();

  const {
    loading: loadingLastActivationsGroupedByType,
    data: { activationsCountGroupedByType } = {},
    refetch: refetchActivationsCountGroupedByType,
  } = useGetActivationsCountGroupedByTypeQuery();

  const handleRefresh = () => {
    refetchMeasuresAverageGroupedByDay();
    refetchMeasuresAverageGroupedByHour();
    refetchActivationsCountGroupedByDevice();
    refetchActivationsCountGroupedByType();
  };

  return (
    <ScrollableView loading={false} onRefresh={handleRefresh}>
      <VStack spacing={20} style={{ padding: 20 }}>
        <Surface style={styles.card}>
          <Text style={styles.cardTitle}>Temperatura promedio últimas 24 horas</Text>
          {loadingMeasuresAverageByHour ? (
            <ActivityIndicator color="green" />
          ) : !measuresAverageGroupedByHour?.length ? (
            <Text style={{ textAlign: "center" }}>Sin datos</Text>
          ) : (
            <LineChart
              data={{
                labels: measuresAverageGroupedByHour?.map((item) => formatDate(item.date, "HH")) || [],
                datasets: [{ data: measuresAverageGroupedByHour?.map((item) => item.insideTemperature ?? 0) || [] }],
              }}
              width={Dimensions.get("screen").width - 60}
              height={250}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{ borderRadius: 16 }}
              verticalLabelRotation={60}
            />
          )}
        </Surface>

        <Surface style={styles.card}>
          <Text style={styles.cardTitle}>Humedad promedio últimas 24 horas</Text>
          {loadingMeasuresAverageByHour ? (
            <ActivityIndicator color="green" />
          ) : !measuresAverageGroupedByHour?.length ? (
            <Text style={{ textAlign: "center" }}>Sin datos</Text>
          ) : (
            <LineChart
              data={{
                labels: measuresAverageGroupedByHour?.map((item) => formatDate(item.date, "HH")) || [],
                datasets: [{ data: measuresAverageGroupedByHour?.map((item) => item.insideHumidity ?? 0) || [] }],
              }}
              width={Dimensions.get("screen").width - 60}
              height={250}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{ borderRadius: 16 }}
              verticalLabelRotation={60}
            />
          )}
        </Surface>

        {showCo2() && (
          <Surface style={styles.card}>
            <Text style={styles.cardTitle}>Co2 promedio ultimos {MEASURE_FROM_LAST_N_DAYS} días</Text>
            {loadingMeasuresAverageByHour ? (
              <ActivityIndicator color="green" />
            ) : !measuresAverageGroupedByHour?.length ? (
              <Text style={{ textAlign: "center" }}>Sin datos</Text>
            ) : (
              <LineChart
                data={{
                  labels: measuresAverageGroupedByHour?.map((item) => formatDate(item.date, "D/M")) || [],
                  datasets: [{ data: measuresAverageGroupedByHour?.map((item) => item.co2 ?? 0) || [] }],
                }}
                width={Dimensions.get("screen").width - 60}
                height={250}
                yAxisLabel=""
                yAxisSuffix=""
                chartConfig={{
                  backgroundColor: "#e26a00",
                  backgroundGradientFrom: "#fb8c00",
                  backgroundGradientTo: "#ffa726",
                  decimalPlaces: 1,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                }}
                style={{ borderRadius: 16 }}
                verticalLabelRotation={60}
              />
            )}
          </Surface>
        )}

        <Surface style={styles.card}>
          <Text style={styles.cardTitle}>Iluminación promedio últimas 24 horas</Text>
          {loadingMeasuresAverageByHour ? (
            <ActivityIndicator color="green" />
          ) : !measuresAverageGroupedByHour?.length ? (
            <Text style={{ textAlign: "center" }}>Sin datos</Text>
          ) : (
            <LineChart
              data={{
                labels: measuresAverageGroupedByHour?.map((item) => formatDate(item.date, "HH")) || [],
                datasets: [{ data: measuresAverageGroupedByHour?.map((item) => item.lighting) || [] }],
              }}
              width={Dimensions.get("screen").width - 60}
              height={250}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{ borderRadius: 16 }}
              verticalLabelRotation={60}
            />
          )}
        </Surface>

        <Surface style={styles.card}>
          <Text style={styles.cardTitle}>Temperatura promedio ultimos {MEASURE_FROM_LAST_N_DAYS} días</Text>
          {loadingMeasuresAverageByDay ? (
            <ActivityIndicator color="green" />
          ) : !measuresAverageGroupedByDay?.length ? (
            <Text style={{ textAlign: "center" }}>Sin datos</Text>
          ) : (
            <LineChart
              data={{
                labels: measuresAverageGroupedByDay?.map((item) => formatDate(item.date, "D/M")) || [],
                datasets: [{ data: measuresAverageGroupedByDay?.map((item) => item.insideTemperature ?? 0) || [] }],
              }}
              width={Dimensions.get("screen").width - 60}
              height={250}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{ borderRadius: 16 }}
              verticalLabelRotation={60}
            />
          )}
        </Surface>

        <Surface style={styles.card}>
          <Text style={styles.cardTitle}>Humedad promedio ultimos {MEASURE_FROM_LAST_N_DAYS} días</Text>
          {loadingMeasuresAverageByDay ? (
            <ActivityIndicator color="green" />
          ) : !measuresAverageGroupedByDay?.length ? (
            <Text style={{ textAlign: "center" }}>Sin datos</Text>
          ) : (
            <LineChart
              data={{
                labels: measuresAverageGroupedByDay?.map((item) => formatDate(item.date, "D/M")) || [],
                datasets: [{ data: measuresAverageGroupedByDay?.map((item) => item.insideHumidity ?? 0) || [] }],
              }}
              width={Dimensions.get("screen").width - 60}
              height={250}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{ borderRadius: 16 }}
              verticalLabelRotation={60}
            />
          )}
        </Surface>

        {showCo2() && (
          <Surface style={styles.card}>
            <Text style={styles.cardTitle}>Co2 promedio ultimos {MEASURE_FROM_LAST_N_DAYS} días</Text>
            {loadingMeasuresAverageByDay ? (
              <ActivityIndicator color="green" />
            ) : !measuresAverageGroupedByDay?.length ? (
              <Text style={{ textAlign: "center" }}>Sin datos</Text>
            ) : (
              <LineChart
                data={{
                  labels: measuresAverageGroupedByDay?.map((item) => formatDate(item.date, "D/M")) || [],
                  datasets: [{ data: measuresAverageGroupedByDay?.map((item) => item.co2 ?? 0) || [] }],
                }}
                width={Dimensions.get("screen").width - 60}
                height={250}
                yAxisLabel=""
                yAxisSuffix=""
                chartConfig={{
                  backgroundColor: "#e26a00",
                  backgroundGradientFrom: "#fb8c00",
                  backgroundGradientTo: "#ffa726",
                  decimalPlaces: 1,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                }}
                style={{ borderRadius: 16 }}
                verticalLabelRotation={60}
              />
            )}
          </Surface>
        )}

        <Surface style={styles.card}>
          <Text style={styles.cardTitle}>Iluminación promedio últimos {MEASURE_FROM_LAST_N_DAYS} días</Text>
          {loadingMeasuresAverageByDay ? (
            <ActivityIndicator color="green" />
          ) : !measuresAverageGroupedByDay?.length ? (
            <Text style={{ textAlign: "center" }}>Sin datos</Text>
          ) : (
            <LineChart
              data={{
                labels: measuresAverageGroupedByDay?.map((item) => formatDate(item.date, "D/M")) || [],
                datasets: [{ data: measuresAverageGroupedByDay?.map((item) => item.lighting) || [] }],
              }}
              width={Dimensions.get("screen").width - 60}
              height={250}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{ borderRadius: 16 }}
              verticalLabelRotation={60}
            />
          )}
        </Surface>

        <Surface style={styles.card}>
          <Text style={styles.cardTitle}>Últimas 100 activaciones</Text>
          {loadingLastActivationsGroupedByDevice ? (
            <ActivityIndicator color="green" />
          ) : !activationsCountGroupedByDevice?.length ? (
            <Text style={{ textAlign: "center" }}>Sin datos</Text>
          ) : (
            <PieChart
              data={
                activationsCountGroupedByDevice?.map((item, index) => ({
                  name: getDeviceName(item.device),
                  count: item.count,
                  color: colors[index],
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
                })) || []
              }
              width={Dimensions.get("window").width - 60} // from react-native
              height={220}
              chartConfig={{ color: () => "red" }}
              accessor={"count"}
              backgroundColor={"transparent"}
              paddingLeft={"5"}
              absolute
            />
          )}
        </Surface>

        <Surface style={styles.card}>
          <Text style={styles.cardTitle}>Motivo últimas 100 activaciones</Text>
          {loadingLastActivationsGroupedByType ? (
            <ActivityIndicator color="green" />
          ) : !activationsCountGroupedByType?.length ? (
            <Text style={{ textAlign: "center" }}>Sin datos</Text>
          ) : (
            <PieChart
              data={
                activationsCountGroupedByType?.map((item, index) => ({
                  name: getDeviceActivationByDescription(item.activatedBy),
                  count: item.count,
                  color: colors[index],
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
                })) || []
              }
              width={Dimensions.get("window").width - 60} // from react-native
              height={220}
              chartConfig={{ color: () => "red" }}
              accessor={"count"}
              backgroundColor={"transparent"}
              paddingLeft={"5"}
              absolute
              center={[0, 12]}
            />
          )}
        </Surface>
      </VStack>
    </ScrollableView>
  );
};
