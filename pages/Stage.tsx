import { Button, ActivityIndicator } from "@react-native-material/core";
import { ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StageForm } from "../components/StageForm";
import { EditStageScreenProps, NewStageScreenProps } from "../types/navigation";
import {
  GetStagesDocument,
  StageInput,
  useCreateOrUpdateStageMutation,
  useDeleteStageMutation,
  useGetStageLazyQuery,
} from "../gql";
import { Snackbar } from "../components/Snackbar";
import { useEffect } from "react";

type NavProps = NewStageScreenProps | EditStageScreenProps;

const Stage = () => {
  const { goBack } = useNavigation<NavProps["navigation"]>();
  const { name, params } = useRoute<NavProps["route"]>();

  const cropId = params.cropId;
  const stageId = name === "EditStage" ? params?.stageId : null;

  const [getStage, { data, loading }] = useGetStageLazyQuery();

  useEffect(() => {
    if (stageId) getStage({ variables: { id: stageId } });
  }, [stageId]);

  const [createOrUpdate, { loading: storing, error }] = useCreateOrUpdateStageMutation({
    onCompleted: goBack,
    refetchQueries: [{ query: GetStagesDocument, variables: { cropId } }],
  });
  const [deleteStage, { loading: deleting }] = useDeleteStageMutation({
    onCompleted: goBack,
    refetchQueries: [{ query: GetStagesDocument, variables: { cropId } }],
    variables: stageId ? { id: stageId } : undefined,
  });

  const handleSubmit = (data: Omit<StageInput, "cropId">) =>
    createOrUpdate({ variables: { data: { ...data, cropId } } });

  return (
    <ScrollView contentContainerStyle={{ padding: 10 }}>
      {error && !loading && <Snackbar type="error" message="Ups. Hubo un error al guardar la etapa." />}
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <>
          <StageForm stage={data?.stage} loading={storing} onSubmit={handleSubmit} />
          {stageId && (
            <Button
              title="Eliminar etapa"
              onPress={() => deleteStage()}
              color="error"
              style={{ marginTop: 10 }}
              loading={deleting}
              disabled={deleting}
            />
          )}
        </>
      )}
    </ScrollView>
  );
};

export default Stage;
