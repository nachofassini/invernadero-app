import {
  HStack,
  Text,
  VStack,
  Dialog,
  DialogHeader,
  DialogContent,
  Button,
  DialogActions,
} from "@react-native-material/core";
import { Input } from "./Input";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export type CropFormData = {
  id?: string;
  name: string;
};

interface CropFormModalProps {
  defaultValues: CropFormData;
  onDismiss: () => void;
  onSubmit: (data: CropFormData) => void;
}

const validationSchema = yup
  .object({
    name: yup
      .string()
      .required("Debe elegir un nombre para el cultivo")
      .min(3, "El nombre del cultivo debe ser de al menos ${min} caracteres")
      .max(100, "El nombre del cultivo no debe ser mayor a ${max} caracteres"),
  })
  .required();

export const CropFormModal = ({ defaultValues, onDismiss, onSubmit }: CropFormModalProps) => {
  const { control, handleSubmit } = useForm<CropFormData>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  return (
    // @ts-ignore
    <Dialog visible onDismiss={onDismiss}>
      <DialogHeader title="Agregar cultivo" />
      <DialogContent>
        <Input control={control} name="name" label="Nombre" placeholder="Nombre" />
      </DialogContent>
      <DialogActions>
        <HStack spacing={20}>
          <Button title="Crear" color="secondary" onPress={handleSubmit(onSubmit)} />
          <Button title="Cancelar" color="primary" onPress={onDismiss} />
        </HStack>
      </DialogActions>
    </Dialog>
  );
};
