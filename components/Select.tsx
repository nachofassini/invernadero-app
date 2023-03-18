import { useState } from "react";
import { Control, Controller, FieldValues, Path, PathValue, UnpackNestedValue } from "react-hook-form";
import DropDownPicker, { DropDownPickerProps, ItemType } from "react-native-dropdown-picker";

interface SelectProps<T extends FieldValues, F> extends DropDownPickerProps<F> {
  control: Control<T>;
  name: Path<T>;
  defaultValue?: UnpackNestedValue<PathValue<T, Path<T>>>;
  items: ItemType<string>[];
  placeholder?: string;
}

export const Select = <T extends FieldValues, F extends any>({
  control,
  items,
  name,
  placeholder,
  ...rest
}: SelectProps<T, F>) => {
  const [open, setOpen] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, ...props } }) => (
        <DropDownPicker
          open={open}
          setOpen={setOpen}
          items={items}
          setValue={props.onChange}
          onChangeValue={props.onChange}
          {...props}
          placeholder={placeholder}
          {...rest}
        />
      )}
    />
  );
};
