import { ReactNode, useEffect, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { Spinner } from "./Spinner";

interface ScrollableViewProps {
  children: ReactNode;
  loading: boolean;
  onRefresh: () => void;
}

export const ScrollableView = ({ children, loading, onRefresh }: ScrollableViewProps) => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (isFirstLoad && loading === false) setIsFirstLoad(false);
  }, [isFirstLoad, loading]);

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={loading && !isFirstLoad} onRefresh={onRefresh} />}>
      <Spinner loading={loading && isFirstLoad} />
      {children}
    </ScrollView>
  );
};
