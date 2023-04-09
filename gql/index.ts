import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
};

export type Activation = {
  __typename?: "Activation";
  /** Activation trigger motive */
  activatedBy?: Maybe<ActivationType>;
  /** Active end date */
  activeUntil?: Maybe<Scalars["Date"]>;
  /** value of the amount of water/ minutes of vent / hs of light delivered / etc... */
  amount: Scalars["Float"];
  createdAt: Scalars["DateTime"];
  /** device name */
  device: Device;
  /** Current status */
  enabled: Scalars["Boolean"];
  /** Unique primary key. */
  id: Scalars["ID"];
  /** Measure that triggered the activation */
  measure?: Maybe<Measure>;
  /** Measure id that triggered the activation */
  measureId?: Maybe<Scalars["ID"]>;
  /** measure unit for the amount delivered (mm3 for water, mins for vent, hs for lighting, etc.. */
  measureUnit?: Maybe<MeasureUnit>;
  updatedAt: Scalars["DateTime"];
};

export enum ActivationType {
  HighCo2 = "high_co2",
  HighHumidity = "high_humidity",
  HighSoilHumidity = "high_soil_humidity",
  HighTemp = "high_temp",
  LowCo2 = "low_co2",
  LowHumidity = "low_humidity",
  LowLighting = "low_lighting",
  LowSoilHumidity = "low_soil_humidity",
  LowTemp = "low_temp",
  Manual = "manual",
}

export type ActivePlan = {
  __typename?: "ActivePlan";
  crop?: Maybe<Crop>;
  stage?: Maybe<Stage>;
};

export type Crop = {
  __typename?: "Crop";
  active: Scalars["Boolean"];
  /** Date in which crop cultivation has been enabled. Only one crop will have this prop set at a time */
  activeSince?: Maybe<Scalars["DateTime"]>;
  activeStage?: Maybe<Stage>;
  activeUntil?: Maybe<Scalars["DateTime"]>;
  createdAt: Scalars["DateTime"];
  /** Days since have been activated */
  day: Scalars["Int"];
  /** Total days to cultivate crop */
  days: Scalars["Int"];
  id: Scalars["ID"];
  name: Scalars["String"];
  stageCount: Scalars["Int"];
  stages: Array<Maybe<Stage>>;
  updatedAt: Scalars["DateTime"];
};

export type CropInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name: Scalars["String"];
};

export type DateRange = {
  from: Scalars["Date"];
  to: Scalars["Date"];
};

export type DateTimeRange = {
  from: Scalars["DateTime"];
  to: Scalars["DateTime"];
};

export enum Device {
  Extractor = "EXTRACTOR",
  Fan = "FAN",
  Irrigation = "IRRIGATION",
  Light = "LIGHT",
}

export enum DeviceMeasureUnits {
  Extractor = "EXTRACTOR",
  Fan = "FAN",
  Irrigation = "IRRIGATION",
  Light = "LIGHT",
}

export type Measure = Sensors & {
  __typename?: "Measure";
  /** Co2 ppm */
  co2: Scalars["Float"];
  /** Electricity consumption. */
  consumption: Scalars["Float"];
  /** When the measure was taken */
  createdAt: Scalars["DateTime"];
  /** Unique primary key. */
  id: Scalars["ID"];
  /** Greenhouse humidity */
  insideHumidity: Scalars["Float"];
  /** Greenhouse temperature */
  insideTemperature: Scalars["Float"];
  /** Greenhouse light percentage */
  lighting: Scalars["Float"];
  /** External temperature */
  outsideHumidity: Scalars["Float"];
  /** External temperature */
  outsideTemperature: Scalars["Float"];
  /** Greenhouse soil humidity */
  soilHumidity: Scalars["Float"];
  /** When the measure was last updated. */
  updatedAt: Scalars["DateTime"];
};

export type MeasureStatistic = Sensors & {
  __typename?: "MeasureStatistic";
  /** Co2 ppm */
  co2: Scalars["Float"];
  /** Electricity consumption. */
  consumption: Scalars["Float"];
  /** Greenhouse humidity */
  insideHumidity: Scalars["Float"];
  /** Greenhouse temperature */
  insideTemperature: Scalars["Float"];
  /** Greenhouse light percentage */
  lighting: Scalars["Float"];
  /** External temperature */
  outsideHumidity: Scalars["Float"];
  /** External temperature */
  outsideTemperature: Scalars["Float"];
  /** Greenhouse soil humidity */
  soilHumidity: Scalars["Float"];
};

export enum MeasureUnit {
  Celsius = "celsius",
  Hours = "hours",
  M3 = "m3",
  Mins = "mins",
  Mm3 = "mm3",
  Percentage = "percentage",
  Ppm = "ppm",
}

export enum Measures {
  Co2 = "co2",
  InsideHumidity = "insideHumidity",
  InsideTemperature = "insideTemperature",
  Lighting = "lighting",
  OutsideHumidity = "outsideHumidity",
  OutsideTemperature = "outsideTemperature",
  SoilHumidity = "soilHumidity",
}

export type Mutation = {
  __typename?: "Mutation";
  activateCrop: Crop;
  activateDevice: Activation;
  deactivateCrop: Scalars["Int"];
  deactivateDevice: Scalars["Int"];
  deleteCrop: Crop;
  deleteStage: Stage;
  upsertCrop: Crop;
  upsertStage: Stage;
};

export type MutationActivateCropArgs = {
  id: Scalars["ID"];
};

export type MutationActivateDeviceArgs = {
  amount: Scalars["Float"];
  device: Device;
};

export type MutationDeactivateDeviceArgs = {
  device: Device;
};

export type MutationDeleteCropArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteStageArgs = {
  id: Scalars["ID"];
};

export type MutationUpsertCropArgs = {
  data: CropInput;
};

export type MutationUpsertStageArgs = {
  data: StageInput;
};

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  column: Scalars["String"];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Aggregate functions when ordering by a relation without specifying a column. */
export enum OrderByRelationAggregateFunction {
  /** Amount of items. */
  Count = "COUNT",
}

/** Aggregate functions when ordering by a relation that may specify a column. */
export enum OrderByRelationWithColumnAggregateFunction {
  /** Average. */
  Avg = "AVG",
  /** Amount of items. */
  Count = "COUNT",
  /** Maximum. */
  Max = "MAX",
  /** Minimum. */
  Min = "MIN",
  /** Sum. */
  Sum = "SUM",
}

/** Information about pagination using a Relay style cursor connection. */
export type PageInfo = {
  __typename?: "PageInfo";
  /** Number of nodes in the current page. */
  count: Scalars["Int"];
  /** Index of the current page. */
  currentPage: Scalars["Int"];
  /** The cursor to continue paginating forwards. */
  endCursor?: Maybe<Scalars["String"]>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars["Boolean"];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars["Boolean"];
  /** Index of the last available page. */
  lastPage: Scalars["Int"];
  /** The cursor to continue paginating backwards. */
  startCursor?: Maybe<Scalars["String"]>;
  /** Total number of nodes in the paginated connection. */
  total: Scalars["Int"];
};

/** Information about pagination using a fully featured paginator. */
export type PaginatorInfo = {
  __typename?: "PaginatorInfo";
  /** Number of items in the current page. */
  count: Scalars["Int"];
  /** Index of the current page. */
  currentPage: Scalars["Int"];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars["Int"]>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars["Boolean"];
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars["Int"]>;
  /** Index of the last available page. */
  lastPage: Scalars["Int"];
  /** Number of items per page. */
  perPage: Scalars["Int"];
  /** Number of total available items. */
  total: Scalars["Int"];
};

/** Indicates what fields are available at the top level of a query operation. */
export type Query = {
  __typename?: "Query";
  /** Find a single stage by an identifying attribute. */
  activation: Activation;
  /** Get last activations, may be filtered by device type */
  activations: Array<Activation>;
  activeCrop?: Maybe<Crop>;
  /** @deprecated Use `activeCrop` instead */
  activePlan: ActivePlan;
  crop: Crop;
  crops: Array<Crop>;
  /** Get currently enabled devices */
  enabledDevices: Array<Activation>;
  /** Get last measure */
  lastMeasure: Measure;
  lastMeasures: Array<Measure>;
  /** Find a single stage by an identifying attribute. */
  measure: Measure;
  /** Get measures by date */
  measures: Array<Measure>;
  measuresAverage: Array<MeasureStatistic>;
  /** Get measures average grouped by day */
  measuresAverageByDay: Array<MeasureStatistic>;
  measuresAverageByHour: Array<MeasureStatistic>;
  /** Find a single stage by an identifying attribute. */
  stage: Stage;
  /** List multiple stages. */
  stages: Array<Stage>;
  /** Find a single user by an identifying attribute. */
  user?: Maybe<User>;
  /** List multiple users. */
  users: Array<User>;
};

/** Indicates what fields are available at the top level of a query operation. */
export type QueryActivationArgs = {
  id: Scalars["ID"];
};

/** Indicates what fields are available at the top level of a query operation. */
export type QueryActivationsArgs = {
  device?: InputMaybe<Device>;
};

/** Indicates what fields are available at the top level of a query operation. */
export type QueryCropArgs = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
};

/** Indicates what fields are available at the top level of a query operation. */
export type QueryCropsArgs = {
  name?: InputMaybe<Scalars["String"]>;
};

/** Indicates what fields are available at the top level of a query operation. */
export type QueryMeasureArgs = {
  id: Scalars["ID"];
};

/** Indicates what fields are available at the top level of a query operation. */
export type QueryMeasuresArgs = {
  createdAt: DateTimeRange;
};

/** Indicates what fields are available at the top level of a query operation. */
export type QueryMeasuresAverageArgs = {
  createdAt: DateTimeRange;
};

/** Indicates what fields are available at the top level of a query operation. */
export type QueryMeasuresAverageByDayArgs = {
  createdAt: DateRange;
};

/** Indicates what fields are available at the top level of a query operation. */
export type QueryMeasuresAverageByHourArgs = {
  createdAt: DateTimeRange;
};

/** Indicates what fields are available at the top level of a query operation. */
export type QueryStageArgs = {
  id: Scalars["ID"];
};

/** Indicates what fields are available at the top level of a query operation. */
export type QueryStagesArgs = {
  cropId: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
};

/** Indicates what fields are available at the top level of a query operation. */
export type QueryUserArgs = {
  email?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
};

/** Indicates what fields are available at the top level of a query operation. */
export type QueryUsersArgs = {
  name?: InputMaybe<Scalars["String"]>;
};

export enum SensorMeasureUnits {
  Co2 = "Co2",
  Humidity = "Humidity",
  Lighting = "Lighting",
  SoilHumidity = "SoilHumidity",
  Temperature = "Temperature",
}

export enum SensorType {
  Co2 = "Co2",
  Humidity = "Humidity",
  Lighting = "Lighting",
  SoilHumidity = "SoilHumidity",
  Temperature = "Temperature",
}

export type Sensors = {
  /** Co2 ppm */
  co2: Scalars["Float"];
  consumption: Scalars["Float"];
  /** Greenhouse humidity */
  insideHumidity: Scalars["Float"];
  /** Greenhouse temperature */
  insideTemperature: Scalars["Float"];
  /** Outside lightning percentage */
  lighting: Scalars["Float"];
  /** External temperature */
  outsideHumidity: Scalars["Float"];
  /** External temperature */
  outsideTemperature: Scalars["Float"];
  /** Greenhouse soil humidity */
  soilHumidity: Scalars["Float"];
};

/** Information about pagination using a simple paginator. */
export type SimplePaginatorInfo = {
  __typename?: "SimplePaginatorInfo";
  /** Number of items in the current page. */
  count: Scalars["Int"];
  /** Index of the current page. */
  currentPage: Scalars["Int"];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars["Int"]>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars["Boolean"];
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars["Int"]>;
  /** Number of items per page. */
  perPage: Scalars["Int"];
};

/** Directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = "ASC",
  /** Sort records in descending order. */
  Desc = "DESC",
}

export type Stage = WeatherSetup & {
  __typename?: "Stage";
  /** Current stage status */
  active: Scalars["Boolean"];
  createdAt: Scalars["DateTime"];
  crop: Crop;
  cropId: Scalars["Int"];
  /** If stage is active, represents days since it has been activated */
  day?: Maybe<Scalars["Int"]>;
  /** Stage duration */
  days: Scalars["Int"];
  id: Scalars["ID"];
  /** Irrigation per day (mm3) */
  irrigation: Scalars["Int"];
  /** Minimum light hours (Hs.) */
  lightHours: Scalars["Float"];
  /** Maximum co2 concentration (pppm.) */
  maxCo2: Scalars["Float"];
  /** Maximum humidity */
  maxHumidity: Scalars["Float"];
  /** Maximum temperature */
  maxTemperature: Scalars["Float"];
  /** Minimum co2 concentration (pppm.) */
  minCo2: Scalars["Float"];
  /** Minimum humidity */
  minHumidity: Scalars["Float"];
  /** Minimum temperature */
  minTemperature: Scalars["Float"];
  name: Scalars["String"];
  order: Scalars["Int"];
  updatedAt: Scalars["DateTime"];
};

export type StageInput = {
  cropId: Scalars["ID"];
  /** Stage duration */
  days: Scalars["Int"];
  id?: InputMaybe<Scalars["ID"]>;
  /** Irrigation per day (mm3) */
  irrigation: Scalars["Int"];
  /** Minimum light hours */
  lightHours: Scalars["Float"];
  /** Maximum co2 concentration */
  maxCo2: Scalars["Float"];
  /** Maximum humidity */
  maxHumidity: Scalars["Float"];
  /** Maximum temperature */
  maxTemperature: Scalars["Float"];
  /** Minimum co2 concentration */
  minCo2: Scalars["Float"];
  /** Minimum humidity */
  minHumidity: Scalars["Float"];
  /** Minimum temperature */
  minTemperature: Scalars["Float"];
  name: Scalars["String"];
};

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = "ONLY",
  /** Return both trashed and non-trashed results. */
  With = "WITH",
  /** Only return non-trashed results. */
  Without = "WITHOUT",
}

/** Account of a person who utilizes this application. */
export type User = {
  __typename?: "User";
  /** When the account was created. */
  created_at: Scalars["DateTime"];
  /** Unique email address. */
  email: Scalars["String"];
  /** When the email was verified. */
  email_verified_at?: Maybe<Scalars["DateTime"]>;
  /** Unique primary key. */
  id: Scalars["ID"];
  /** Non-unique name. */
  name: Scalars["String"];
  /** When the account was last updated. */
  updated_at: Scalars["DateTime"];
};

export type WeatherSetup = {
  irrigation: Scalars["Int"];
  lightHours: Scalars["Float"];
  maxCo2: Scalars["Float"];
  maxHumidity: Scalars["Float"];
  maxTemperature: Scalars["Float"];
  minCo2: Scalars["Float"];
  minHumidity: Scalars["Float"];
  minTemperature: Scalars["Float"];
};

export type GetActivationQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetActivationQuery = {
  __typename?: "Query";
  activation: {
    __typename?: "Activation";
    id: string;
    activatedBy?: ActivationType | null;
    createdAt: any;
    activeUntil?: any | null;
    enabled: boolean;
    device: Device;
    amount: number;
    measureUnit?: MeasureUnit | null;
    measureId?: string | null;
  };
};

export type GetActivationsQueryVariables = Exact<{
  device?: InputMaybe<Device>;
}>;

export type GetActivationsQuery = {
  __typename?: "Query";
  activations: Array<{
    __typename?: "Activation";
    id: string;
    activatedBy?: ActivationType | null;
    createdAt: any;
    activeUntil?: any | null;
    enabled: boolean;
    device: Device;
    amount: number;
    measureUnit?: MeasureUnit | null;
    measureId?: string | null;
  }>;
};

export type GetEnabledDevicesQueryVariables = Exact<{ [key: string]: never }>;

export type GetEnabledDevicesQuery = {
  __typename?: "Query";
  enabledDevices: Array<{ __typename?: "Activation"; id: string; device: Device }>;
};

export type ActivateDeviceMutationVariables = Exact<{
  device: Device;
  amount: Scalars["Float"];
}>;

export type ActivateDeviceMutation = {
  __typename?: "Mutation";
  activateDevice: {
    __typename?: "Activation";
    id: string;
    activatedBy?: ActivationType | null;
    createdAt: any;
    activeUntil?: any | null;
    enabled: boolean;
    device: Device;
    amount: number;
    measureUnit?: MeasureUnit | null;
    measureId?: string | null;
  };
};

export type DeactivateDeviceMutationVariables = Exact<{
  device: Device;
}>;

export type DeactivateDeviceMutation = { __typename?: "Mutation"; deactivateDevice: number };

export type CropBasicDataFragment = {
  __typename?: "Crop";
  id: string;
  name: string;
  active: boolean;
  activeSince?: any | null;
  day: number;
};

export type GetActiveCropQueryVariables = Exact<{ [key: string]: never }>;

export type GetActiveCropQuery = {
  __typename?: "Query";
  activeCrop?: {
    __typename?: "Crop";
    days: number;
    stageCount: number;
    id: string;
    name: string;
    active: boolean;
    activeSince?: any | null;
    day: number;
    activeStage?: {
      __typename?: "Stage";
      id: string;
      name: string;
      order: number;
      day?: number | null;
      days: number;
      minTemperature: number;
      maxTemperature: number;
      minHumidity: number;
      maxHumidity: number;
      minCo2: number;
      maxCo2: number;
      lightHours: number;
      irrigation: number;
    } | null;
  } | null;
};

export type GetCropsQueryVariables = Exact<{ [key: string]: never }>;

export type GetCropsQuery = {
  __typename?: "Query";
  crops: Array<{
    __typename?: "Crop";
    days: number;
    stageCount: number;
    id: string;
    name: string;
    active: boolean;
    activeSince?: any | null;
    day: number;
  }>;
};

export type ActivateCropMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type ActivateCropMutation = {
  __typename?: "Mutation";
  activateCrop: {
    __typename?: "Crop";
    id: string;
    name: string;
    active: boolean;
    activeSince?: any | null;
    day: number;
  };
};

export type DeactivateCropMutationVariables = Exact<{ [key: string]: never }>;

export type DeactivateCropMutation = { __typename?: "Mutation"; deactivateCrop: number };

export type CreateOrUpdateCropMutationVariables = Exact<{
  data: CropInput;
}>;

export type CreateOrUpdateCropMutation = {
  __typename?: "Mutation";
  upsertCrop: { __typename?: "Crop"; id: string; name: string; active: boolean; activeSince?: any | null; day: number };
};

export type DeleteCropMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteCropMutation = {
  __typename?: "Mutation";
  deleteCrop: { __typename?: "Crop"; id: string; name: string; active: boolean; activeSince?: any | null; day: number };
};

export type GetLastMeasureQueryVariables = Exact<{ [key: string]: never }>;

export type GetLastMeasureQuery = {
  __typename?: "Query";
  lastMeasure: {
    __typename?: "Measure";
    id: string;
    createdAt: any;
    consumption: number;
    insideTemperature: number;
    outsideTemperature: number;
    insideHumidity: number;
    outsideHumidity: number;
    soilHumidity: number;
    co2: number;
    lighting: number;
  };
};

export type GetLastMeasuresQueryVariables = Exact<{ [key: string]: never }>;

export type GetLastMeasuresQuery = {
  __typename?: "Query";
  lastMeasures: Array<{
    __typename?: "Measure";
    id: string;
    createdAt: any;
    consumption: number;
    insideTemperature: number;
    outsideTemperature: number;
    insideHumidity: number;
    outsideHumidity: number;
    soilHumidity: number;
    co2: number;
    lighting: number;
  }>;
};

export type StageBasicDataFragment = {
  __typename?: "Stage";
  id: string;
  cropId: number;
  name: string;
  order: number;
  createdAt: any;
  updatedAt: any;
};

export type StageDynamicDataFragment = { __typename?: "Stage"; active: boolean; day?: number | null };

export type WeatherSettingsFragment = {
  __typename?: "Stage";
  days: number;
  minTemperature: number;
  maxTemperature: number;
  minHumidity: number;
  maxHumidity: number;
  minCo2: number;
  maxCo2: number;
};

export type GetStageQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetStageQuery = {
  __typename?: "Query";
  stage: {
    __typename?: "Stage";
    id: string;
    cropId: number;
    name: string;
    order: number;
    createdAt: any;
    updatedAt: any;
    active: boolean;
    day?: number | null;
    days: number;
    minTemperature: number;
    maxTemperature: number;
    minHumidity: number;
    maxHumidity: number;
    minCo2: number;
    maxCo2: number;
    crop: { __typename?: "Crop"; id: string; name: string; active: boolean; activeSince?: any | null; day: number };
  };
};

export type GetStagesQueryVariables = Exact<{
  cropId: Scalars["ID"];
}>;

export type GetStagesQuery = {
  __typename?: "Query";
  stages: Array<{
    __typename?: "Stage";
    id: string;
    cropId: number;
    name: string;
    order: number;
    createdAt: any;
    updatedAt: any;
    active: boolean;
    day?: number | null;
    days: number;
    minTemperature: number;
    maxTemperature: number;
    minHumidity: number;
    maxHumidity: number;
    minCo2: number;
    maxCo2: number;
    crop: { __typename?: "Crop"; id: string; name: string; active: boolean; activeSince?: any | null; day: number };
  }>;
};

export type CreateOrUpdateStageMutationVariables = Exact<{
  data: StageInput;
}>;

export type CreateOrUpdateStageMutation = {
  __typename?: "Mutation";
  upsertStage: {
    __typename?: "Stage";
    id: string;
    cropId: number;
    name: string;
    order: number;
    createdAt: any;
    updatedAt: any;
    active: boolean;
    day?: number | null;
    days: number;
    minTemperature: number;
    maxTemperature: number;
    minHumidity: number;
    maxHumidity: number;
    minCo2: number;
    maxCo2: number;
  };
};

export type DeleteStageMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteStageMutation = {
  __typename?: "Mutation";
  deleteStage: {
    __typename?: "Stage";
    id: string;
    cropId: number;
    name: string;
    order: number;
    createdAt: any;
    updatedAt: any;
  };
};

export const CropBasicDataFragmentDoc = gql`
  fragment CropBasicData on Crop {
    id
    name
    active
    activeSince
    day
  }
`;
export const StageBasicDataFragmentDoc = gql`
  fragment StageBasicData on Stage {
    id
    cropId
    name
    order
    createdAt
    updatedAt
  }
`;
export const StageDynamicDataFragmentDoc = gql`
  fragment StageDynamicData on Stage {
    active
    day
  }
`;
export const WeatherSettingsFragmentDoc = gql`
  fragment WeatherSettings on Stage {
    days
    minTemperature
    maxTemperature
    minHumidity
    maxHumidity
    minCo2
    maxCo2
  }
`;
export const GetActivationDocument = gql`
  query GetActivation($id: ID!) {
    activation(id: $id) {
      id
      activatedBy
      createdAt
      activeUntil
      enabled
      device
      amount
      measureUnit
      measureId
    }
  }
`;

/**
 * __useGetActivationQuery__
 *
 * To run a query within a React component, call `useGetActivationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActivationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActivationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetActivationQuery(
  baseOptions: Apollo.QueryHookOptions<GetActivationQuery, GetActivationQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetActivationQuery, GetActivationQueryVariables>(GetActivationDocument, options);
}
export function useGetActivationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetActivationQuery, GetActivationQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetActivationQuery, GetActivationQueryVariables>(GetActivationDocument, options);
}
export type GetActivationQueryHookResult = ReturnType<typeof useGetActivationQuery>;
export type GetActivationLazyQueryHookResult = ReturnType<typeof useGetActivationLazyQuery>;
export type GetActivationQueryResult = Apollo.QueryResult<GetActivationQuery, GetActivationQueryVariables>;
export const GetActivationsDocument = gql`
  query GetActivations($device: Device) {
    activations(device: $device) {
      id
      activatedBy
      createdAt
      activeUntil
      enabled
      device
      amount
      measureUnit
      measureId
    }
  }
`;

/**
 * __useGetActivationsQuery__
 *
 * To run a query within a React component, call `useGetActivationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActivationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActivationsQuery({
 *   variables: {
 *      device: // value for 'device'
 *   },
 * });
 */
export function useGetActivationsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetActivationsQuery, GetActivationsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetActivationsQuery, GetActivationsQueryVariables>(GetActivationsDocument, options);
}
export function useGetActivationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetActivationsQuery, GetActivationsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetActivationsQuery, GetActivationsQueryVariables>(GetActivationsDocument, options);
}
export type GetActivationsQueryHookResult = ReturnType<typeof useGetActivationsQuery>;
export type GetActivationsLazyQueryHookResult = ReturnType<typeof useGetActivationsLazyQuery>;
export type GetActivationsQueryResult = Apollo.QueryResult<GetActivationsQuery, GetActivationsQueryVariables>;
export const GetEnabledDevicesDocument = gql`
  query GetEnabledDevices {
    enabledDevices {
      id
      device
    }
  }
`;

/**
 * __useGetEnabledDevicesQuery__
 *
 * To run a query within a React component, call `useGetEnabledDevicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEnabledDevicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEnabledDevicesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEnabledDevicesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetEnabledDevicesQuery, GetEnabledDevicesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetEnabledDevicesQuery, GetEnabledDevicesQueryVariables>(GetEnabledDevicesDocument, options);
}
export function useGetEnabledDevicesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetEnabledDevicesQuery, GetEnabledDevicesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetEnabledDevicesQuery, GetEnabledDevicesQueryVariables>(
    GetEnabledDevicesDocument,
    options
  );
}
export type GetEnabledDevicesQueryHookResult = ReturnType<typeof useGetEnabledDevicesQuery>;
export type GetEnabledDevicesLazyQueryHookResult = ReturnType<typeof useGetEnabledDevicesLazyQuery>;
export type GetEnabledDevicesQueryResult = Apollo.QueryResult<GetEnabledDevicesQuery, GetEnabledDevicesQueryVariables>;
export const ActivateDeviceDocument = gql`
  mutation ActivateDevice($device: Device!, $amount: Float!) {
    activateDevice(device: $device, amount: $amount) {
      id
      activatedBy
      createdAt
      activeUntil
      enabled
      device
      amount
      measureUnit
      measureId
    }
  }
`;
export type ActivateDeviceMutationFn = Apollo.MutationFunction<ActivateDeviceMutation, ActivateDeviceMutationVariables>;

/**
 * __useActivateDeviceMutation__
 *
 * To run a mutation, you first call `useActivateDeviceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateDeviceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateDeviceMutation, { data, loading, error }] = useActivateDeviceMutation({
 *   variables: {
 *      device: // value for 'device'
 *      amount: // value for 'amount'
 *   },
 * });
 */
export function useActivateDeviceMutation(
  baseOptions?: Apollo.MutationHookOptions<ActivateDeviceMutation, ActivateDeviceMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ActivateDeviceMutation, ActivateDeviceMutationVariables>(ActivateDeviceDocument, options);
}
export type ActivateDeviceMutationHookResult = ReturnType<typeof useActivateDeviceMutation>;
export type ActivateDeviceMutationResult = Apollo.MutationResult<ActivateDeviceMutation>;
export type ActivateDeviceMutationOptions = Apollo.BaseMutationOptions<
  ActivateDeviceMutation,
  ActivateDeviceMutationVariables
>;
export const DeactivateDeviceDocument = gql`
  mutation deactivateDevice($device: Device!) {
    deactivateDevice(device: $device)
  }
`;
export type DeactivateDeviceMutationFn = Apollo.MutationFunction<
  DeactivateDeviceMutation,
  DeactivateDeviceMutationVariables
>;

/**
 * __useDeactivateDeviceMutation__
 *
 * To run a mutation, you first call `useDeactivateDeviceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeactivateDeviceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deactivateDeviceMutation, { data, loading, error }] = useDeactivateDeviceMutation({
 *   variables: {
 *      device: // value for 'device'
 *   },
 * });
 */
export function useDeactivateDeviceMutation(
  baseOptions?: Apollo.MutationHookOptions<DeactivateDeviceMutation, DeactivateDeviceMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeactivateDeviceMutation, DeactivateDeviceMutationVariables>(
    DeactivateDeviceDocument,
    options
  );
}
export type DeactivateDeviceMutationHookResult = ReturnType<typeof useDeactivateDeviceMutation>;
export type DeactivateDeviceMutationResult = Apollo.MutationResult<DeactivateDeviceMutation>;
export type DeactivateDeviceMutationOptions = Apollo.BaseMutationOptions<
  DeactivateDeviceMutation,
  DeactivateDeviceMutationVariables
>;
export const GetActiveCropDocument = gql`
  query GetActiveCrop {
    activeCrop {
      ...CropBasicData
      days
      stageCount
      activeStage {
        id
        name
        order
        day
        days
        minTemperature
        maxTemperature
        minHumidity
        maxHumidity
        minCo2
        maxCo2
        lightHours
        irrigation
      }
    }
  }
  ${CropBasicDataFragmentDoc}
`;

/**
 * __useGetActiveCropQuery__
 *
 * To run a query within a React component, call `useGetActiveCropQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActiveCropQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActiveCropQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetActiveCropQuery(
  baseOptions?: Apollo.QueryHookOptions<GetActiveCropQuery, GetActiveCropQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetActiveCropQuery, GetActiveCropQueryVariables>(GetActiveCropDocument, options);
}
export function useGetActiveCropLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetActiveCropQuery, GetActiveCropQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetActiveCropQuery, GetActiveCropQueryVariables>(GetActiveCropDocument, options);
}
export type GetActiveCropQueryHookResult = ReturnType<typeof useGetActiveCropQuery>;
export type GetActiveCropLazyQueryHookResult = ReturnType<typeof useGetActiveCropLazyQuery>;
export type GetActiveCropQueryResult = Apollo.QueryResult<GetActiveCropQuery, GetActiveCropQueryVariables>;
export const GetCropsDocument = gql`
  query GetCrops {
    crops {
      ...CropBasicData
      days
      stageCount
    }
  }
  ${CropBasicDataFragmentDoc}
`;

/**
 * __useGetCropsQuery__
 *
 * To run a query within a React component, call `useGetCropsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCropsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCropsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCropsQuery(baseOptions?: Apollo.QueryHookOptions<GetCropsQuery, GetCropsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCropsQuery, GetCropsQueryVariables>(GetCropsDocument, options);
}
export function useGetCropsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCropsQuery, GetCropsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCropsQuery, GetCropsQueryVariables>(GetCropsDocument, options);
}
export type GetCropsQueryHookResult = ReturnType<typeof useGetCropsQuery>;
export type GetCropsLazyQueryHookResult = ReturnType<typeof useGetCropsLazyQuery>;
export type GetCropsQueryResult = Apollo.QueryResult<GetCropsQuery, GetCropsQueryVariables>;
export const ActivateCropDocument = gql`
  mutation ActivateCrop($id: ID!) {
    activateCrop(id: $id) {
      ...CropBasicData
    }
  }
  ${CropBasicDataFragmentDoc}
`;
export type ActivateCropMutationFn = Apollo.MutationFunction<ActivateCropMutation, ActivateCropMutationVariables>;

/**
 * __useActivateCropMutation__
 *
 * To run a mutation, you first call `useActivateCropMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateCropMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateCropMutation, { data, loading, error }] = useActivateCropMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useActivateCropMutation(
  baseOptions?: Apollo.MutationHookOptions<ActivateCropMutation, ActivateCropMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ActivateCropMutation, ActivateCropMutationVariables>(ActivateCropDocument, options);
}
export type ActivateCropMutationHookResult = ReturnType<typeof useActivateCropMutation>;
export type ActivateCropMutationResult = Apollo.MutationResult<ActivateCropMutation>;
export type ActivateCropMutationOptions = Apollo.BaseMutationOptions<
  ActivateCropMutation,
  ActivateCropMutationVariables
>;
export const DeactivateCropDocument = gql`
  mutation DeactivateCrop {
    deactivateCrop
  }
`;
export type DeactivateCropMutationFn = Apollo.MutationFunction<DeactivateCropMutation, DeactivateCropMutationVariables>;

/**
 * __useDeactivateCropMutation__
 *
 * To run a mutation, you first call `useDeactivateCropMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeactivateCropMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deactivateCropMutation, { data, loading, error }] = useDeactivateCropMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeactivateCropMutation(
  baseOptions?: Apollo.MutationHookOptions<DeactivateCropMutation, DeactivateCropMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeactivateCropMutation, DeactivateCropMutationVariables>(DeactivateCropDocument, options);
}
export type DeactivateCropMutationHookResult = ReturnType<typeof useDeactivateCropMutation>;
export type DeactivateCropMutationResult = Apollo.MutationResult<DeactivateCropMutation>;
export type DeactivateCropMutationOptions = Apollo.BaseMutationOptions<
  DeactivateCropMutation,
  DeactivateCropMutationVariables
>;
export const CreateOrUpdateCropDocument = gql`
  mutation CreateOrUpdateCrop($data: CropInput!) {
    upsertCrop(data: $data) {
      ...CropBasicData
    }
  }
  ${CropBasicDataFragmentDoc}
`;
export type CreateOrUpdateCropMutationFn = Apollo.MutationFunction<
  CreateOrUpdateCropMutation,
  CreateOrUpdateCropMutationVariables
>;

/**
 * __useCreateOrUpdateCropMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateCropMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateCropMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateCropMutation, { data, loading, error }] = useCreateOrUpdateCropMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateOrUpdateCropMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateOrUpdateCropMutation, CreateOrUpdateCropMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateOrUpdateCropMutation, CreateOrUpdateCropMutationVariables>(
    CreateOrUpdateCropDocument,
    options
  );
}
export type CreateOrUpdateCropMutationHookResult = ReturnType<typeof useCreateOrUpdateCropMutation>;
export type CreateOrUpdateCropMutationResult = Apollo.MutationResult<CreateOrUpdateCropMutation>;
export type CreateOrUpdateCropMutationOptions = Apollo.BaseMutationOptions<
  CreateOrUpdateCropMutation,
  CreateOrUpdateCropMutationVariables
>;
export const DeleteCropDocument = gql`
  mutation DeleteCrop($id: ID!) {
    deleteCrop(id: $id) {
      ...CropBasicData
    }
  }
  ${CropBasicDataFragmentDoc}
`;
export type DeleteCropMutationFn = Apollo.MutationFunction<DeleteCropMutation, DeleteCropMutationVariables>;

/**
 * __useDeleteCropMutation__
 *
 * To run a mutation, you first call `useDeleteCropMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCropMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCropMutation, { data, loading, error }] = useDeleteCropMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCropMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteCropMutation, DeleteCropMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteCropMutation, DeleteCropMutationVariables>(DeleteCropDocument, options);
}
export type DeleteCropMutationHookResult = ReturnType<typeof useDeleteCropMutation>;
export type DeleteCropMutationResult = Apollo.MutationResult<DeleteCropMutation>;
export type DeleteCropMutationOptions = Apollo.BaseMutationOptions<DeleteCropMutation, DeleteCropMutationVariables>;
export const GetLastMeasureDocument = gql`
  query GetLastMeasure {
    lastMeasure {
      id
      createdAt
      consumption
      insideTemperature
      outsideTemperature
      insideHumidity
      outsideHumidity
      soilHumidity
      co2
      lighting
    }
  }
`;

/**
 * __useGetLastMeasureQuery__
 *
 * To run a query within a React component, call `useGetLastMeasureQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLastMeasureQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLastMeasureQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLastMeasureQuery(
  baseOptions?: Apollo.QueryHookOptions<GetLastMeasureQuery, GetLastMeasureQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetLastMeasureQuery, GetLastMeasureQueryVariables>(GetLastMeasureDocument, options);
}
export function useGetLastMeasureLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetLastMeasureQuery, GetLastMeasureQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetLastMeasureQuery, GetLastMeasureQueryVariables>(GetLastMeasureDocument, options);
}
export type GetLastMeasureQueryHookResult = ReturnType<typeof useGetLastMeasureQuery>;
export type GetLastMeasureLazyQueryHookResult = ReturnType<typeof useGetLastMeasureLazyQuery>;
export type GetLastMeasureQueryResult = Apollo.QueryResult<GetLastMeasureQuery, GetLastMeasureQueryVariables>;
export const GetLastMeasuresDocument = gql`
  query GetLastMeasures {
    lastMeasures {
      id
      createdAt
      consumption
      insideTemperature
      outsideTemperature
      insideHumidity
      outsideHumidity
      soilHumidity
      co2
      lighting
    }
  }
`;

/**
 * __useGetLastMeasuresQuery__
 *
 * To run a query within a React component, call `useGetLastMeasuresQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLastMeasuresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLastMeasuresQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLastMeasuresQuery(
  baseOptions?: Apollo.QueryHookOptions<GetLastMeasuresQuery, GetLastMeasuresQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetLastMeasuresQuery, GetLastMeasuresQueryVariables>(GetLastMeasuresDocument, options);
}
export function useGetLastMeasuresLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetLastMeasuresQuery, GetLastMeasuresQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetLastMeasuresQuery, GetLastMeasuresQueryVariables>(GetLastMeasuresDocument, options);
}
export type GetLastMeasuresQueryHookResult = ReturnType<typeof useGetLastMeasuresQuery>;
export type GetLastMeasuresLazyQueryHookResult = ReturnType<typeof useGetLastMeasuresLazyQuery>;
export type GetLastMeasuresQueryResult = Apollo.QueryResult<GetLastMeasuresQuery, GetLastMeasuresQueryVariables>;
export const GetStageDocument = gql`
  query GetStage($id: ID!) {
    stage(id: $id) {
      ...StageBasicData
      ...StageDynamicData
      ...WeatherSettings
      crop {
        ...CropBasicData
      }
    }
  }
  ${StageBasicDataFragmentDoc}
  ${StageDynamicDataFragmentDoc}
  ${WeatherSettingsFragmentDoc}
  ${CropBasicDataFragmentDoc}
`;

/**
 * __useGetStageQuery__
 *
 * To run a query within a React component, call `useGetStageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetStageQuery(baseOptions: Apollo.QueryHookOptions<GetStageQuery, GetStageQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetStageQuery, GetStageQueryVariables>(GetStageDocument, options);
}
export function useGetStageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStageQuery, GetStageQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetStageQuery, GetStageQueryVariables>(GetStageDocument, options);
}
export type GetStageQueryHookResult = ReturnType<typeof useGetStageQuery>;
export type GetStageLazyQueryHookResult = ReturnType<typeof useGetStageLazyQuery>;
export type GetStageQueryResult = Apollo.QueryResult<GetStageQuery, GetStageQueryVariables>;
export const GetStagesDocument = gql`
  query GetStages($cropId: ID!) {
    stages(cropId: $cropId) {
      ...StageBasicData
      ...StageDynamicData
      ...WeatherSettings
      crop {
        ...CropBasicData
      }
    }
  }
  ${StageBasicDataFragmentDoc}
  ${StageDynamicDataFragmentDoc}
  ${WeatherSettingsFragmentDoc}
  ${CropBasicDataFragmentDoc}
`;

/**
 * __useGetStagesQuery__
 *
 * To run a query within a React component, call `useGetStagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStagesQuery({
 *   variables: {
 *      cropId: // value for 'cropId'
 *   },
 * });
 */
export function useGetStagesQuery(baseOptions: Apollo.QueryHookOptions<GetStagesQuery, GetStagesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetStagesQuery, GetStagesQueryVariables>(GetStagesDocument, options);
}
export function useGetStagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetStagesQuery, GetStagesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetStagesQuery, GetStagesQueryVariables>(GetStagesDocument, options);
}
export type GetStagesQueryHookResult = ReturnType<typeof useGetStagesQuery>;
export type GetStagesLazyQueryHookResult = ReturnType<typeof useGetStagesLazyQuery>;
export type GetStagesQueryResult = Apollo.QueryResult<GetStagesQuery, GetStagesQueryVariables>;
export const CreateOrUpdateStageDocument = gql`
  mutation CreateOrUpdateStage($data: StageInput!) {
    upsertStage(data: $data) {
      ...StageBasicData
      ...StageDynamicData
      ...WeatherSettings
    }
  }
  ${StageBasicDataFragmentDoc}
  ${StageDynamicDataFragmentDoc}
  ${WeatherSettingsFragmentDoc}
`;
export type CreateOrUpdateStageMutationFn = Apollo.MutationFunction<
  CreateOrUpdateStageMutation,
  CreateOrUpdateStageMutationVariables
>;

/**
 * __useCreateOrUpdateStageMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateStageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateStageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateStageMutation, { data, loading, error }] = useCreateOrUpdateStageMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateOrUpdateStageMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateOrUpdateStageMutation, CreateOrUpdateStageMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateOrUpdateStageMutation, CreateOrUpdateStageMutationVariables>(
    CreateOrUpdateStageDocument,
    options
  );
}
export type CreateOrUpdateStageMutationHookResult = ReturnType<typeof useCreateOrUpdateStageMutation>;
export type CreateOrUpdateStageMutationResult = Apollo.MutationResult<CreateOrUpdateStageMutation>;
export type CreateOrUpdateStageMutationOptions = Apollo.BaseMutationOptions<
  CreateOrUpdateStageMutation,
  CreateOrUpdateStageMutationVariables
>;
export const DeleteStageDocument = gql`
  mutation DeleteStage($id: ID!) {
    deleteStage(id: $id) {
      ...StageBasicData
    }
  }
  ${StageBasicDataFragmentDoc}
`;
export type DeleteStageMutationFn = Apollo.MutationFunction<DeleteStageMutation, DeleteStageMutationVariables>;

/**
 * __useDeleteStageMutation__
 *
 * To run a mutation, you first call `useDeleteStageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStageMutation, { data, loading, error }] = useDeleteStageMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteStageMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteStageMutation, DeleteStageMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteStageMutation, DeleteStageMutationVariables>(DeleteStageDocument, options);
}
export type DeleteStageMutationHookResult = ReturnType<typeof useDeleteStageMutation>;
export type DeleteStageMutationResult = Apollo.MutationResult<DeleteStageMutation>;
export type DeleteStageMutationOptions = Apollo.BaseMutationOptions<DeleteStageMutation, DeleteStageMutationVariables>;
