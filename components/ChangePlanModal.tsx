import { HStack, VStack, Dialog, DialogHeader, DialogContent, Button } from "@react-native-material/core";
import { useForm } from "react-hook-form";
import { Fragment, useMemo } from "react";
import { Select } from "./Select";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { GetActiveCropQuery, useActivateCropMutation, useDeactivateCropMutation, useGetCropsQuery } from "../gql";
import { setFormValidationErrors } from "../utils/helpers";
import { Text } from "react-native";
import { ActivityIndicator } from "@react-native-material/core";

interface ChangePlanModalProps {
  activeCrop?: GetActiveCropQuery["activeCrop"];
  onDismiss: () => void;
  loadingActiveCrop: boolean;
}

type ActivatePlanFormData = {
  id: string;
  stageId: string | null;
};

const validationSchema = yup
  .object({
    id: yup.string().required("Debe seleccionar un cultivo"),
    stageId: yup.string().nullable(),
  })
  .required();

export const ChangePlanModal = ({ activeCrop: activeCropData, loadingActiveCrop, onDismiss }: ChangePlanModalProps) => {
  const { data: { crops } = { crops: [] } } = useGetCropsQuery();
  const cropOptions = useMemo(() => crops?.map(({ id, name }) => ({ value: id, label: name })), [crops]);

  const { control, handleSubmit, setError } = useForm<ActivatePlanFormData>({
    defaultValues: { id: "" },
    resolver: yupResolver(validationSchema),
  });

  const [activateCrop, { loading }] = useActivateCropMutation({
    refetchQueries: ["GetActiveCrop", "GetCrops"],
    onCompleted: onDismiss,
    onError: (error) => setFormValidationErrors(error, setError),
  });
  const [deactivateCrop, { loading: deactivating }] = useDeactivateCropMutation({
    refetchQueries: ["GetActiveCrop", "GetCrops"],
    onError: (error) => setFormValidationErrors(error, setError),
  });

  const onSubmit = ({ id }: ActivatePlanFormData) => activateCrop({ variables: { id } });

  return (
    // @ts-ignore
    <Dialog visible onDismiss={onDismiss}>
      <DialogHeader title={activeCropData?.name ? "Desactivar plan" : "Activar plan"} />
      <DialogContent>
        <VStack spacing={8}>
          {loadingActiveCrop ? (
            <ActivityIndicator size="large" color="green" />
          ) : activeCropData ? (
            <Fragment>
              <Text>Cultivo activo: {activeCropData.name}</Text>
              <HStack justify="between" style={{ paddingTop: 20 }}>
                <Button
                  loading={deactivating}
                  onPress={() => deactivateCrop()}
                  title="Desactivar"
                  color="error"
                  style={{ shadowOffset: { width: 2, height: 2 } }}
                />
                <Button onPress={onDismiss} title="Cerrar" style={{ shadowOffset: { width: 2, height: 2 } }} />
              </HStack>
            </Fragment>
          ) : (
            <Fragment>
              <Select control={control} name="id" items={cropOptions} placeholder="Seleccione un cultivo" />
              <HStack justify="between" style={{ paddingTop: 20 }}>
                <Button
                  loading={loading}
                  onPress={handleSubmit(onSubmit)}
                  title="Activar plan"
                  color="secondary"
                  style={{ shadowOffset: { width: 2, height: 2 } }}
                />
                <Button onPress={onDismiss} title="Cerrar" style={{ shadowOffset: { width: 2, height: 2 } }} />
              </HStack>
            </Fragment>
          )}
        </VStack>
      </DialogContent>
    </Dialog>
  );
};
