import {
  HStack,
  Text,
  VStack,
  Dialog,
  DialogHeader,
  DialogContent,
  Badge,
  Button,
  ActivityIndicator,
} from "@react-native-material/core";
import { Control } from "../pages/Dashboard";
import { ControlIcon } from "./ControlIcon";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import { View } from "react-native";
import {
  GetActivationsDocument,
  useActivateDeviceMutation,
  useDeactivateDeviceMutation,
  useGetActivationsQuery,
} from "../gql";
import { formatDate, getDeviceName, useDeviceActivationOptions } from "../utils/helpers";

interface ControlModalProps {
  control: Control;
  onDismiss: () => void;
}

export const ControlModal = ({ control, onDismiss }: ControlModalProps) => {
  const [open, setOpen] = useState(false);
  const [activationAmount, setActivationAmount] = useState<number>(0);
  const activationOptions = useDeviceActivationOptions(control.type);

  const { data: { activations } = {}, loading } = useGetActivationsQuery({
    fetchPolicy: "network-only",
    variables: { device: control.type },
    pollInterval: 10000,
    notifyOnNetworkStatusChange: true,
  });

  const [activateDevice, { loading: activating }] = useActivateDeviceMutation({
    refetchQueries: ["GetEnabledDevices", { query: GetActivationsDocument, variables: { device: control.type } }],
  });
  const handleActivate = () => activateDevice({ variables: { device: control.type, amount: activationAmount } });

  const [deactivateDevice, { loading: deactivating }] = useDeactivateDeviceMutation({
    refetchQueries: ["GetEnabledDevices", { query: GetActivationsDocument, variables: { device: control.type } }],
    variables: { device: control.type },
  });

  const lastActivation = activations?.[0];

  return (
    // @ts-ignore
    <Dialog visible onDismiss={onDismiss}>
      <HStack justify="between" items="center">
        <DialogHeader title={getDeviceName(control.type)} />
        <ControlIcon type={control.type} extraStyles={{ fontSize: 30, marginRight: 10 }} />
      </HStack>
      <DialogContent>
        <VStack spacing={8}>
          <Text variant="h6">Ultimas activaciones:</Text>
          {loading && !lastActivation ? (
            <ActivityIndicator color="green" />
          ) : (
            <VStack>
              {activations?.map((activation) => (
                <HStack key={activation.id}>
                  <Text variant="overline" style={{ fontSize: 16 }}>
                    {formatDate(activation.createdAt, "MM/DD HH:mm:ss")}
                    {" -> "}
                  </Text>
                  <Text>
                    {activation.amount} {activation.measureUnit}
                  </Text>
                </HStack>
              ))}
            </VStack>
          )}
        </VStack>

        {(!loading || lastActivation) && (
          <VStack spacing={8} style={{ marginTop: 20 }}>
            <HStack justify="between">
              <Text variant="h6">Estado:</Text>
              {loading ? (
                <ActivityIndicator color="green" />
              ) : (
                <Badge
                  label={lastActivation?.enabled ? "On" : "Off"}
                  color={lastActivation?.enabled ? "secondary" : "primary"}
                />
              )}
            </HStack>

            {lastActivation?.enabled ? (
              <>
                <Text>Activo desde: {formatDate(lastActivation?.createdAt, "MM/DD HH:mm:ss")}</Text>
                <Button
                  loading={deactivating || loading}
                  title="Detener"
                  style={{ marginTop: 10 }}
                  color="error"
                  onPress={() => deactivateDevice()}
                />
              </>
            ) : (
              <View>
                <HStack justify="between" items="center">
                  <Text>Activar:</Text>
                  <DropDownPicker
                    open={open}
                    setOpen={setOpen}
                    value={activationAmount}
                    items={activationOptions}
                    setValue={(value) => setActivationAmount(value)}
                    containerStyle={{ width: 150 }}
                    placeholder="Seleccione el tiempo a activar"
                  />
                </HStack>
                <Button
                  disabled={!activationAmount}
                  loading={activating || loading}
                  title="Activar"
                  style={{ marginTop: 20, zIndex: -1 }}
                  color="secondary"
                  onPress={handleActivate}
                />
              </View>
            )}
          </VStack>
        )}
      </DialogContent>
    </Dialog>
  );
};
