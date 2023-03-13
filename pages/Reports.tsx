import { Surface, Text, VStack } from "@react-native-material/core";
import { Dimensions, View } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2, // optional
    },
  ],
  legend: ["Rainy Days"], // optional
};

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const Reports = () => (
  <VStack spacing={20} style={{ padding: 20 }}>
    <Surface style={{ padding: 10 }}>
      <BarChart
        data={{
          labels: ["January", "February", "March", "April" /*  "May", "June" */],
          datasets: [
            {
              data: [20, 45, 28, 80 /* 99, 43 */],
            },
          ],
        }}
        width={Dimensions.get("screen").width - 60}
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{ marginVertical: 8, borderRadius: 16 }}
      />
    </Surface>

    <Surface style={{ padding: 10 }}>
      <LineChart
        data={{
          labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "7", "8", "9", "10", "11", "12"],
          datasets: [
            {
              data: [12, 13, 16, 17, 18, 21, 24, 25, 25, 25, 23, 22, 20, 19, 18, 17, 16, 16],
            },
          ],
        }}
        width={Dimensions.get("window").width - 60} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "3",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </Surface>
  </VStack>
);

export default Reports;
