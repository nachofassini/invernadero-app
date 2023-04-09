import { HStack, VStack, Dialog, DialogHeader, DialogContent, Button } from "@react-native-material/core";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import { Select } from "./Select";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useActivateCropMutation, useGetCropsQuery } from "../gql";
import { setFormValidationErrors } from "../utils/helpers";

interface ChangePlanModalProps {
  onDismiss: () => void;
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

export const ChangePlanModal = ({ onDismiss }: ChangePlanModalProps) => {
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

  const onSubmit = ({ id }: ActivatePlanFormData) => activateCrop({ variables: { id } });

  return (
    // @ts-ignore
    <Dialog visible onDismiss={onDismiss}>
      <DialogHeader title="Activar plan" />
      <DialogContent>
        <VStack spacing={8}>
          <Select control={control} name="id" items={cropOptions} placeholder="Seleccione un cultivo" />
          <HStack justify="between" style={{ paddingTop: 20 }}>
            <Button loading={loading} onPress={handleSubmit(onSubmit)} title="Activar plan" color="secondary" />
            <Button onPress={onDismiss} title="Cerrar" />
          </HStack>
        </VStack>
      </DialogContent>
    </Dialog>
  );
};
