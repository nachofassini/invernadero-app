import { TextInput, TextInputProps } from "@react-native-material/core";
import { Control, FieldValues, Path, PathValue, UnpackNestedValue, useController } from "react-hook-form";

interface InputProps<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
  defaultValue?: UnpackNestedValue<PathValue<T, Path<T>>>;
}

export const Input = <T extends FieldValues>({ control, name, label, placeholder }: InputProps<T>) => {
  const { field, fieldState } = useController({ control, name });
  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      {...field}
      onChange={() => {}}
      onChangeText={field.onChange}
      helperText={fieldState.error?.message}
      style={{ marginRight: 12 }}
    />
  );
};
