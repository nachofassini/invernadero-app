import { TextInput, TextInputProps } from "@react-native-material/core";
import { Control, FieldValues, Path, PathValue, UnpackNestedValue, useController } from "react-hook-form";

interface InputProps<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
  defaultValue?: UnpackNestedValue<PathValue<T, Path<T>>>;
  type?: "text" | "number";
}

export const Input = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  ...rest
}: InputProps<T>) => {
  const { field, fieldState } = useController({ control, name });
  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      {...field}
      value={field.value.toString()}
      onChange={() => {}}
      onChangeText={(value) => field.onChange(type === "number" ? Number(value) : value)}
      color={!!fieldState.error ? "red" : "primary"}
      helperText={fieldState.error?.message}
      style={{ marginRight: 12, }}
      {...rest}
    />
  );
};
