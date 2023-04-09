import {
  HStack,
  Dialog,
  DialogHeader,
  DialogContent,
  Button,
  DialogActions,
  VStack,
} from "@react-native-material/core";
import { Input } from "./Input";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CropInput, useCreateOrUpdateCropMutation, useDeleteCropMutation } from "../gql";
import { setFormValidationErrors } from "../utils/helpers";

interface CropFormModalProps {
  defaultValues: CropInput;
  onDismiss: () => void;
}

const validationSchema = yup
  .object({
    id: yup.string(),
    name: yup
      .string()
      .required("Debe elegir un nombre para el cultivo")
      .min(3, "El nombre del cultivo debe ser de al menos ${min} caracteres")
      .max(100, "El nombre del cultivo no debe ser mayor a ${max} caracteres"),
  })
  .required();

export const CropFormModal = ({ defaultValues, onDismiss }: CropFormModalProps) => {
  const { control, handleSubmit, setError } = useForm<CropInput>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const [creteOrUpdate, { loading }] = useCreateOrUpdateCropMutation({
    onCompleted: onDismiss,
    refetchQueries: ["GetCrops"],
    onError: (error) => setFormValidationErrors(error, setError),
  });
  const [deleteFn, { loading: deleting }] = useDeleteCropMutation({
    onCompleted: onDismiss,
    refetchQueries: ["GetCrops"],
  });

  const handleDelete = () => {
    if (defaultValues.id) deleteFn({ variables: { id: defaultValues.id } });
  };

  const isFetching = loading || deleting;

  return (
    // @ts-ignore
    <Dialog visible onDismiss={onDismiss}>
      <DialogHeader title={`${defaultValues?.id ? "Editar" : "Agregar"} cultivo`} />
      <DialogContent>
        <Input control={control} name="name" label="Nombre" placeholder="Nombre" />
      </DialogContent>
      <DialogActions>
        <VStack spacing={10}>
          <HStack spacing={20}>
            <Button
              title={defaultValues?.id ? "Guardar" : "Agregar"}
              color="secondary"
              onPress={handleSubmit((data) => creteOrUpdate({ variables: { data } }))}
              loading={loading || false}
              disabled={isFetching}
            />
            <Button title="Cancelar" color="primary" onPress={onDismiss} />
          </HStack>
          {defaultValues?.id && (
            <Button title="Eliminar" color="error" onPress={handleDelete} loading={deleting} disabled={isFetching} />
          )}
        </VStack>
      </DialogActions>
    </Dialog>
  );
};
