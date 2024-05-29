import { ActivityIndicator, Badge, HStack, Text } from "@react-native-material/core";
import { ActivationDataFragment, useGetLastActivationsPaginatedQuery } from "../gql";
import { formatDate, getDeviceActivationByDescriptionWithIcon, getDeviceName, getDeviceUnit } from "../utils/helpers";
import { ScrollableView } from "../components/ScrollableView";
import { DataTable } from "react-native-paper";
import { common } from "../constants";
import { Fragment, useEffect, useState } from "react";
import { Dictionary, groupBy } from "lodash";
import { ControlIcon } from "../components/ControlIcon";

export const ControlsReport = () => {
  const [page, setPage] = useState(1);
  const [groupedItems, setGroupedItems] = useState<Dictionary<ActivationDataFragment[]>>();

  const {
    data: { lastActivationsPaginated } = {},
    loading,
    refetch,
  } = useGetLastActivationsPaginatedQuery({
    variables: { first: common.ITEMS_PER_PAGE, page },
  });

  const { data, paginatorInfo } = lastActivationsPaginated || {};

  useEffect(() => {
    const activationsByDay = groupBy(data, (item) => item?.createdAt?.slice(0, 10));
    setGroupedItems(activationsByDay);
  }, [data]);

  return (
    <ScrollableView loading={loading} onRefresh={refetch}>
      <Text style={{ textAlign: "center", marginVertical: 5 }} variant="h4">
        Correcciones
      </Text>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={{ maxWidth: 65 }}>Hora</DataTable.Title>
          <DataTable.Title style={{ minWidth: 50 }}>Dispositivo</DataTable.Title>
          <DataTable.Title>Motivo</DataTable.Title>
          <DataTable.Title numeric>Corrección</DataTable.Title>
          <DataTable.Title numeric>Real./Esp.</DataTable.Title>
        </DataTable.Header>
        {loading ? (
          <ActivityIndicator color="green" style={{ padding: 20 }} />
        ) : (
          groupedItems &&
          Object.keys(groupedItems).map((date) => {
            const items = groupedItems[date];
            return (
              <Fragment key={`${date}${paginatorInfo?.currentPage}`}>
                <DataTable.Header style={{ minHeight: 25 }}>
                  <DataTable.Title textStyle={{ textAlign: "center", width: "100%", fontSize: 20 }}>
                    {formatDate(date, "DD/MM/YYYY")}
                  </DataTable.Title>
                </DataTable.Header>
                {items.map((activation) => (
                  <DataTable.Row key={activation.id}>
                    <DataTable.Cell style={{ maxWidth: 40 }}>
                      {formatDate(activation.createdAt, "HH:mm")}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ minWidth: 55 }}>
                      <HStack items="center">
                        <ControlIcon type={activation.device} extraStyles={{ fontSize: 25, marginRight: 10 }} />
                        <Text>{getDeviceName(activation.device)}</Text>
                      </HStack>
                    </DataTable.Cell>
                    <DataTable.Cell>{getDeviceActivationByDescriptionWithIcon(activation.activatedBy)}</DataTable.Cell>
                    <DataTable.Cell numeric style={{ minWidth: 20}}>
                      {activation.enabled ? (
                        <Badge label="On" color="secondary" />
                      ) : (
                        `${activation.amount?.toFixed(1)} ${activation.measureUnit ?? ""}`
                      )}
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      {activation.deviation
                        ? `${activation.deviation?.obtained.toFixed(1)}/${activation.deviation?.expected.toFixed(0)}`
                        : ""}
                    </DataTable.Cell>
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
  );
};
