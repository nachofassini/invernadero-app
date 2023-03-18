import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps, NativeStackNavigationProp } from "@react-navigation/native-stack";

export type HomeNavProps = BottomTabNavigationProp<{}>;
export type CropsNavigation = {
  Home: {};
  Stages: { id: string; name: string };
  NewStage: { cropId: string };
  EditStage: { cropId: string; stageId: string; stageName: string };
};
export type ReportsNavProps = BottomTabNavigationProp<{}>;

export type RootTabParamList = {
  Home: HomeNavProps;
  Crops: NativeStackNavigationProp<CropsNavigation>;
  Reports: ReportsNavProps;
};

export type CropsScreenProps = NativeStackScreenProps<CropsNavigation, "Home">;
export type StagesScreenProps = NativeStackScreenProps<CropsNavigation, "Stages">;
export type NewStageScreenProps = NativeStackScreenProps<CropsNavigation, "NewStage">;
export type EditStageScreenProps = NativeStackScreenProps<CropsNavigation, "EditStage">;
