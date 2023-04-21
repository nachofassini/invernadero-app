import { ActivityIndicator, Text } from "@react-native-material/core";
import { MeasureDataFragment, Measures, SensorType, useGetLastMeasuresPaginatedQuery } from "../gql";
import { formatDate, getMeasureUnitBySensorType } from "../utils/helpers";
import { ScrollableView } from "../components/ScrollableView";
import { SensorIcon } from "../components/SensorIcon";
import { DataTable } from "react-native-paper";
import { Fragment, useEffect, useState } from "react";
import groupBy from "lodash/groupBy";
import { Dictionary } from "lodash";
import { MeasureModal } from "../components/MeasureModal";
import { common } from "../constants";

export const SensorsReport = () => {
  const [measureDetails, setMeasureDetails] = useState<MeasureDataFragment>();
  const dismissMeasureModal = () => setMeasureDetails(undefined);

  const [page, setPage] = useState(1);
  const [groupedItems, setGroupedItems] = useState<Dictionary<MeasureDataFragment[]>>();

  const {
    data: { lastMeasuresPaginated } = {},
    loading,
    refetch,
  } = useGetLastMeasuresPaginatedQuery({
    variables: { first: common.ITEMS_PER_PAGE, page },
  });

  const { data, paginatorInfo } = lastMeasuresPaginated || {};

  useEffect(() => {
    const measuresByDay = groupBy(data, (item) => item?.createdAt?.slice(0, 10));
    setGroupedItems(measuresByDay);
  }, [data]);

  return (
    <>
      <ScrollableView loading={false} onRefresh={refetch}>
        <Text style={{ textAlign: "center", marginVertical: 5 }} variant="h4">
          Mediciones
        </Text>

        <DataTable>
          <DataTable.Header style={{ height: 20, borderTopWidth: 0.66, borderTopColor: "rgb(231, 224, 236)" }}>
            <DataTable.Title
              style={{ marginLeft: 60, borderRightWidth: 1, maxWidth: 135, paddingTop: 0 }}
              textStyle={{ textAlign: "center", width: "100%", height: 20 }}
            >
              Internos
            </DataTable.Title>
            <DataTable.Title style={{ paddingTop: 0 }} textStyle={{ textAlign: "center", width: "100%", height: 20 }}>
              Externos
            </DataTable.Title>
          </DataTable.Header>
          <DataTable.Header>
            <DataTable.Title>Hora</DataTable.Title>
            <DataTable.Title numeric>
              <SensorIcon extraStyles={{ fontSize: 20 }} sensor={SensorType.Lighting} />
            </DataTable.Title>
            <DataTable.Title numeric>
              <SensorIcon extraStyles={{ fontSize: 20 }} sensor={SensorType.Temperature} />
            </DataTable.Title>
            <DataTable.Title numeric>
              <SensorIcon extraStyles={{ fontSize: 25 }} sensor={SensorType.Humidity} />
            </DataTable.Title>
            <DataTable.Title numeric>
              <SensorIcon extraStyles={{ fontSize: 20 }} sensor={SensorType.Co2} />
            </DataTable.Title>
            <DataTable.Title numeric>
              <SensorIcon extraStyles={{ fontSize: 20 }} sensor={SensorType.Temperature} />
            </DataTable.Title>
            <DataTable.Title numeric>
              <SensorIcon extraStyles={{ fontSize: 25 }} sensor={SensorType.Humidity} />
            </DataTable.Title>
            <DataTable.Title numeric>
              <SensorIcon extraStyles={{ fontSize: 20 }} sensor={SensorType.SoilHumidity} />
            </DataTable.Title>
          </DataTable.Header>
          {loading ? (
            <ActivityIndicator color="green" style={{ padding: 20 }} />
          ) : (
            groupedItems &&
            Object.keys(groupedItems).map((date) => {
              const measures = groupedItems[date];
              return (
                <Fragment key={`${date}${paginatorInfo?.currentPage}`}>
                  <DataTable.Row style={{ minHeight: 25 }}>
                    <DataTable.Cell textStyle={{ textAlign: "center", width: "100%", fontSize: 20 }}>
                      {formatDate(date, "DD/MM/YYYY")}
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row style={{ minHeight: 25 }}>
                    <DataTable.Cell> </DataTable.Cell>
                    <DataTable.Cell numeric>{getMeasureUnitBySensorType(SensorType.Lighting)}</DataTable.Cell>
                    <DataTable.Cell numeric>{getMeasureUnitBySensorType(SensorType.Temperature)}</DataTable.Cell>
                    <DataTable.Cell numeric>{getMeasureUnitBySensorType(SensorType.Humidity)}</DataTable.Cell>
                    <DataTable.Cell numeric>{getMeasureUnitBySensorType(SensorType.Co2)}</DataTable.Cell>
                    <DataTable.Cell numeric>{getMeasureUnitBySensorType(SensorType.Temperature)}</DataTable.Cell>
                    <DataTable.Cell numeric>{getMeasureUnitBySensorType(SensorType.Humidity)}</DataTable.Cell>
                    <DataTable.Cell numeric>{getMeasureUnitBySensorType(SensorType.SoilHumidity)}</DataTable.Cell>
                  </DataTable.Row>
                  {measures.map((measure) => (
                    <DataTable.Row
                      key={measure.id}
                      style={{ minHeight: 35 }}
                      onPress={() => setMeasureDetails(measure)}
                    >
                      <DataTable.Cell style={{ minWidth: 7 }}>{formatDate(measure.createdAt, "H:mm:s")}</DataTable.Cell>
                      <DataTable.Cell numeric>{measure[Measures.Lighting]}</DataTable.Cell>
                      <DataTable.Cell numeric>{measure[Measures.OutsideTemperature]}</DataTable.Cell>
                      <DataTable.Cell numeric>{measure[Measures.OutsideHumidity]}</DataTable.Cell>
                      <DataTable.Cell numeric>{measure[Measures.Co2]}</DataTable.Cell>
                      <DataTable.Cell numeric>{measure[Measures.InsideTemperature]}</DataTable.Cell>
                      <DataTable.Cell numeric>{measure[Measures.InsideHumidity]}</DataTable.Cell>
                      <DataTable.Cell numeric>{measure[Measures.SoilHumidity]}</DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </Fragment>
              );
            })
          )}

          {!loading && (
            <DataTable.Pagination
              page={page}
              numberOfPages={paginatorInfo?.lastPage || 0}
              onPageChange={(page) => setPage(page)}
              label={`${paginatorInfo?.firstItem}-${paginatorInfo?.lastItem} of ${paginatorInfo?.total}`}
              showFastPaginationControls
              numberOfItemsPerPage={common.ITEMS_PER_PAGE}
              selectPageDropdownLabel={"Items por página"}
            />
          )}
        </DataTable>
      </ScrollableView>
      {measureDetails && <MeasureModal measure={measureDetails} onDismiss={dismissMeasureModal} />}
    </>
  );
};
