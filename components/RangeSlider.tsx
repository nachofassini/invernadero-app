import { HStack, Text } from "@react-native-material/core";
import { useCallback, useState } from "react";
import { View } from "react-native";
import RnRangeSlider from "rn-range-slider";

import Label from "./Label";
import Notch from "./Notch";
import Rail from "./Rail";
import RailSelected from "./RailSelected";
import Thumb from "./Thumb";
import { Control, FieldValues, Path, PathValue, UnpackNestedValue, useController } from "react-hook-form";

interface RangeSliderProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  defaultValue?: UnpackNestedValue<PathValue<T, Path<T>>>;
  min?: number;
  max?: number;
  label: string;
  disableRange?: boolean;
}

const Stage = <T extends FieldValues>({
  control,
  name,
  min = 0,
  max = 100,
  label,
  disableRange = false,
}: RangeSliderProps<T>) => {
  const { field } = useController({ control, name });

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback((value: number) => <Label text={value.toString()} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((low: number, high: number) => {
    if (!disableRange) field.onChange({ low, high });
    if (disableRange) field.onChange(low);
  }, []);

  return (
    <View style={{ width: "100%", marginVertical: 10 }}>
      <Text>{label}</Text>
      <RnRangeSlider
        style={{ marginTop: 10 }}
        min={min}
        max={max}
        low={disableRange ? field.value : field.value.low}
        high={disableRange ? field.value : field.value.high}
        step={1}
        floatingLabel
        disableRange={disableRange}
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        renderLabel={renderLabel}
        renderNotch={renderNotch}
        onValueChanged={handleValueChange}
      />
      <HStack justify="between" style={{ marginHorizontal: 10 }}>
        {disableRange ? (
          <>
            <Text>{min}</Text>
            <Text>{field.value.low}</Text>
            <Text>{max}</Text>
          </>
        ) : (
          <>
            <Text>{field.value.low}</Text>
            <Text>{field.value.high}</Text>
          </>
        )}
      </HStack>
    </View>
  );
};

export default Stage;
