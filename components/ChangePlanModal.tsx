import { HStack, VStack, Dialog, DialogHeader, DialogContent, Button } from "@react-native-material/core";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import { Select } from "./Select";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface ChangePlanModalProps {
  onDismiss: () => void;
}

type ActivatePlanFormData = {
  cropId: string;
  stageId: string | null;
};

const validationSchema = yup
  .object({
    cropId: yup.string().required("Debe seleccionar un cultivo"),
    stageId: yup.string().nullable(),
  })
  .required();

export const ChangePlanModal = ({ onDismiss }: ChangePlanModalProps) => {
  const crops = useMemo(
    () =>
      [
        { id: "frutilla", name: "Frutilla", active: true },
        { id: "lechuga", name: "Lechuga", active: false },
        { id: "espinaca", name: "Espinaca", active: false },
        { id: "rucula", name: "Rúcula", active: false },
        { id: "cebolla", name: "Cebolla", active: false },
      ].map((crop) => ({ label: crop.name, value: crop.id })),
    []
  );

  const stages = useMemo(
    () =>
      [
        { id: "1", order: 1, name: "Germinación", active: true, days: 30, day: 17 },
        { id: "2", order: 2, name: "Crecimiento", active: false, days: 60 },
        { id: "3", order: 3, name: "Maduración", active: false, days: 45 },
      ].map((stage) => ({ label: stage.name, value: stage.id })),
    []
  );

  const { control, handleSubmit, watch } = useForm<ActivatePlanFormData>({
    defaultValues: { cropId: "", stageId: null },
    resolver: yupResolver(validationSchema),
  });

  const hasSelectedPlan = watch("cropId");

  const onSubmit = ({ cropId, stageId }: ActivatePlanFormData) => {
    // activate cropId, stageId
  };

  return (
    // @ts-ignore
    <Dialog visible onDismiss={onDismiss}>
      <DialogHeader title="Activar plan" />
      <DialogContent>
        <VStack spacing={8}>
          <Select control={control} name="cropId" items={crops} placeholder="Seleccione un cultivo" />
          {hasSelectedPlan && (
            <Select control={control} name="stageId" items={stages} placeholder="Seleccione una etapa" />
          )}
          <HStack justify="between" style={{ paddingTop: 20 }}>
            <Button onPress={handleSubmit(onSubmit)} title="Activar plan" color="secondary" />
            <Button onPress={onDismiss} title="Cerrar" />
          </HStack>
        </VStack>
      </DialogContent>
    </Dialog>
  );
};
