import { HStack, Text } from "@react-native-material/core";
import { useCallback, useState } from "react";
import { View } from "react-native";
import RnRangeSlider from "rn-range-slider";

import Label from "./Label";
import Notch from "./Notch";
import Rail from "./Rail";
import RailSelected from "./RailSelected";
import Thumb from "./Thumb";

interface RangeSliderProps {
  min?: number;
  max?: number;
  low?: number;
  high?: number;
  fieldName: string;
  disableRange?: boolean;
}

const Stage = ({
  min = 0,
  max = 100,
  low: initialLow,
  high: initialHigh,
  fieldName,
  disableRange = false,
}: RangeSliderProps) => {
  const [low, setLow] = useState(initialLow ?? min);
  const [high, setHigh] = useState(initialHigh ?? max);

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback((value: number) => <Label text={value.toString()} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((low: number, high: number) => {
    setLow(low);
    setHigh(high);
  }, []);

  return (
    <View style={{ width: "90%", marginVertical: 10 }}>
      <Text>{fieldName}</Text>
      <RnRangeSlider
        style={{ marginTop: 10 }}
        min={min}
        max={max}
        low={low}
        high={high}
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
            <Text>{low}</Text>
            <Text>{max}</Text>
          </>
        ) : (
          <>
            <Text>{low}</Text>
            <Text>{high}</Text>
          </>
        )}
      </HStack>
    </View>
  );
};

export default Stage;
