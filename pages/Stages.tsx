import { Button, ListItem } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StagesScreenProps } from "../types/navigation";
import { RefreshControl, ScrollView } from "react-native";
import { useGetStagesQuery } from "../gql";
import { Snackbar } from "../components/Snackbar";

const Stages = () => {
  const { setOptions, navigate } = useNavigation<StagesScreenProps["navigation"]>();
  const {
    params: { id: cropId, name: cropName },
  } = useRoute<StagesScreenProps["route"]>();

  useLayoutEffect(() => {
    if (cropName && setOptions) setOptions({ headerBackTitle: cropName });
  }, [setOptions, cropName]);

  const { data: { stages } = {}, error, loading, refetch } = useGetStagesQuery({ variables: { cropId } });

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}>
      {error && !loading && <Snackbar type="error" message="Upss. Ocurrió un error cargando las." />}
      {stages?.length === 0 ? (
        <Snackbar
          message="Este cultivo no tiene ninguna etapa todavía."
          action={
            <Button
              title="¡Agregá una etapa!"
              color="secondary"
              onPress={() => navigate("NewStage", { cropId })}
              compact
            />
          }
        />
      ) : (
        stages?.map((stage) => (
          <ListItem
            key={stage.id}
            overline={`Etapa: ${stage.order}`}
            title={stage.name}
            onPress={() => navigate("EditStage", { cropId, stageId: stage.id, stageName: stage.name })}
            trailing={(props) => <Icon name="chevron-right" {...props} />}
            meta={stage.active ? `Activa - Día ${stage.day}/${stage.days}` : `${stage.days} días`}
          />
        ))
      )}
    </ScrollView>
  );
};

export default Stages;
