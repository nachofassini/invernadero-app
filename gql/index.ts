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

/** A paginated list of Activation items. */
export type ActivationPaginator = {
  __typename?: "ActivationPaginator";
  /** A list of Activation items. */
  data: Array<Activation>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
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

export type ActivationsGroupedByDevice = {
  __typename?: "ActivationsGroupedByDevice";
  count: Scalars["Int"];
  device: Device;
};

export type ActivationsGroupedByType = {
  __typename?: "ActivationsGroupedByType";
  activatedBy: ActivationType;
  count: Scalars["Int"];
};

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

/** A paginated list of Measure items. */
export type MeasurePaginator = {
  __typename?: "MeasurePaginator";
  /** A list of Measure items. */
  data: Array<Measure>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type MeasureStatistic = Sensors & {
  __typename?: "MeasureStatistic";
  /** Co2 ppm */
  co2: Scalars["Float"];
  /** Electricity consumption. */
  consumption: Scalars["Float"];
  date: Scalars["DateTime"];
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
  activationsCountGroupedByDevice: Array<ActivationsGroupedByDevice>;
  activationsCountGroupedByType: Array<ActivationsGroupedByType>;
  activeCrop?: Maybe<Crop>;
  /** @deprecated Use `activeCrop` instead */
  activePlan: ActivePlan;
  crop: Crop;
  crops: Array<Crop>;
  /** Get currently enabled devices */
  enabledDevices: Array<Activation>;
  /** Get last activations paginated, may be filtered by device type */
  lastActivationsPaginated?: Maybe<ActivationPaginator>;
  /** Get last measure */
  lastMeasure: Measure;
  lastMeasures: Array<Measure>;
  lastMeasuresPaginated?: Maybe<MeasurePaginator>;
  /** Find a single stage by an identifying attribute. */
  measure: Measure;
  /** Get measures by date */
  measures: Array<Measure>;
  measuresAverage: MeasureStatistic;
  /** Get measures average grouped by day */
  measuresAverageGroupedByDay: Array<MeasureStatistic>;
  measuresAverageGroupedByHour: Array<MeasureStatistic>;
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
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

/** Indicates what fields are available at the top level of a query operation. */
export type QueryActivationsCountGroupedByDeviceArgs = {
  amount?: InputMaybe<Scalars["Int"]>;
};

/** Indicates what fields are available at the top level of a query operation. */
export type QueryActivationsCountGroupedByTypeArgs = {
  amount?: InputMaybe<Scalars["Int"]>;
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
export type QueryLastActivationsPaginatedArgs = {
  device?: InputMaybe<Device>;
  first: Scalars["Int"];
  page?: InputMaybe<Scalars["Int"]>;
};

/** Indicates what fields are available at the top level of a query operation. */
export type QueryLastMeasuresArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

/** Indicates what fields are available at the top level of a query operation. */
export type QueryLastMeasuresPaginatedArgs = {
  first: Scalars["Int"];
  page?: InputMaybe<Scalars["Int"]>;
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
export type QueryMeasuresAverageGroupedByDayArgs = {
  createdAt: DateRange;
};

/** Indicates what fields are available at the top level of a query operation. */
export type QueryMeasuresAverageGroupedByHourArgs = {
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

export type ActivationDataFragment = {
  __typename?: "Activation";
  id: string;
  activatedBy?: ActivationType | null;
  createdAt: any;
  updatedAt: any;
  activeUntil?: any | null;
  enabled: boolean;
  device: Device;
  amount: number;
  measureUnit?: MeasureUnit | null;
  measureId?: string | null;
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
    updatedAt: any;
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
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
}>;

export type GetActivationsQuery = {
  __typename?: "Query";
  activations: Array<{
    __typename?: "Activation";
    id: string;
    activatedBy?: ActivationType | null;
    createdAt: any;
    updatedAt: any;
    activeUntil?: any | null;
    enabled: boolean;
    device: Device;
    amount: number;
    measureUnit?: MeasureUnit | null;
    measureId?: string | null;
  }>;
};

export type GetLastActivationsPaginatedQueryVariables = Exact<{
  device?: InputMaybe<Device>;
  first: Scalars["Int"];
  page?: InputMaybe<Scalars["Int"]>;
}>;

export type GetLastActivationsPaginatedQuery = {
  __typename?: "Query";
  lastActivationsPaginated?: {
    __typename?: "ActivationPaginator";
    paginatorInfo: {
      __typename?: "PaginatorInfo";
      count: number;
      currentPage: number;
      firstItem?: number | null;
      hasMorePages: boolean;
      lastItem?: number | null;
      lastPage: number;
      perPage: number;
      total: number;
    };
    data: Array<{
      __typename?: "Activation";
      id: string;
      activatedBy?: ActivationType | null;
      createdAt: any;
      updatedAt: any;
      activeUntil?: any | null;
      enabled: boolean;
      device: Device;
      amount: number;
      measureUnit?: MeasureUnit | null;
      measureId?: string | null;
    }>;
  } | null;
};

export type GetEnabledDevicesQueryVariables = Exact<{ [key: string]: never }>;

export type GetEnabledDevicesQuery = {
  __typename?: "Query";
  enabledDevices: Array<{ __typename?: "Activation"; id: string; device: Device }>;
};

export type GetActivationsCountGroupedByDeviceQueryVariables = Exact<{ [key: string]: never }>;

export type GetActivationsCountGroupedByDeviceQuery = {
  __typename?: "Query";
  activationsCountGroupedByDevice: Array<{ __typename?: "ActivationsGroupedByDevice"; device: Device; count: number }>;
};

export type GetActivationsCountGroupedByTypeQueryVariables = Exact<{ [key: string]: never }>;

export type GetActivationsCountGroupedByTypeQuery = {
  __typename?: "Query";
  activationsCountGroupedByType: Array<{
    __typename?: "ActivationsGroupedByType";
    activatedBy: ActivationType;
    count: number;
  }>;
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
    updatedAt: any;
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

export type PaginatorFieldsFragment = {
  __typename?: "PaginatorInfo";
  count: number;
  currentPage: number;
  firstItem?: number | null;
  hasMorePages: boolean;
  lastItem?: number | null;
  lastPage: number;
  perPage: number;
  total: number;
};

export type MeasureDataFragment = {
  __typename?: "Measure";
  id: string;
  createdAt: any;
  updatedAt: any;
  consumption: number;
  insideTemperature: number;
  outsideTemperature: number;
  insideHumidity: number;
  outsideHumidity: number;
  soilHumidity: number;
  co2: number;
  lighting: number;
};

export type GetLastMeasureQueryVariables = Exact<{ [key: string]: never }>;

export type GetLastMeasureQuery = {
  __typename?: "Query";
  lastMeasure: {
    __typename?: "Measure";
    id: string;
    createdAt: any;
    updatedAt: any;
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

export type GetLastMeasuresQueryVariables = Exact<{
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
}>;

export type GetLastMeasuresQuery = {
  __typename?: "Query";
  lastMeasures: Array<{
    __typename?: "Measure";
    id: string;
    createdAt: any;
    updatedAt: any;
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

export type GetLastMeasuresPaginatedQueryVariables = Exact<{
  first: Scalars["Int"];
  page?: InputMaybe<Scalars["Int"]>;
}>;

export type GetLastMeasuresPaginatedQuery = {
  __typename?: "Query";
  lastMeasuresPaginated?: {
    __typename?: "MeasurePaginator";
    paginatorInfo: {
      __typename?: "PaginatorInfo";
      count: number;
      currentPage: number;
      firstItem?: number | null;
      hasMorePages: boolean;
      lastItem?: number | null;
      lastPage: number;
      perPage: number;
      total: number;
    };
    data: Array<{
      __typename?: "Measure";
      id: string;
      createdAt: any;
      updatedAt: any;
      consumption: number;
      insideTemperature: number;
      outsideTemperature: number;
      insideHumidity: number;
      outsideHumidity: number;
      soilHumidity: number;
      co2: number;
      lighting: number;
    }>;
  } | null;
};

export type GetMeasuresAverageGroupedByDayQueryVariables = Exact<{
  range: DateRange;
}>;

export type GetMeasuresAverageGroupedByDayQuery = {
  __typename?: "Query";
  measuresAverageGroupedByDay: Array<{
    __typename?: "MeasureStatistic";
    date: any;
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

export const ActivationDataFragmentDoc = gql`
  fragment ActivationData on Activation {
    id
    activatedBy
    createdAt
    updatedAt
    activeUntil
    enabled
    device
    amount
    measureUnit
    measureId
  }
`;
export const CropBasicDataFragmentDoc = gql`
  fragment CropBasicData on Crop {
    id
    name
    active
    activeSince
    day
  }
`;
export const PaginatorFieldsFragmentDoc = gql`
  fragment PaginatorFields on PaginatorInfo {
    count
    currentPage
    firstItem
    hasMorePages
    lastItem
    lastPage
    perPage
    total
  }
`;
export const MeasureDataFragmentDoc = gql`
  fragment MeasureData on Measure {
    id
    createdAt
    updatedAt
    consumption
    insideTemperature
    outsideTemperature
    insideHumidity
    outsideHumidity
    soilHumidity
    co2
    lighting
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
      ...ActivationData
    }
  }
  ${ActivationDataFragmentDoc}
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
  query GetActivations($device: Device, $limit: Int, $offset: Int) {
    activations(device: $device, limit: $limit, offset: $offset) {
      ...ActivationData
    }
  }
  ${ActivationDataFragmentDoc}
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
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
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
export const GetLastActivationsPaginatedDocument = gql`
  query GetLastActivationsPaginated($device: Device, $first: Int!, $page: Int) {
    lastActivationsPaginated(device: $device, first: $first, page: $page) {
      paginatorInfo {
        ...PaginatorFields
      }
      data {
        ...ActivationData
      }
    }
  }
  ${PaginatorFieldsFragmentDoc}
  ${ActivationDataFragmentDoc}
`;

/**
 * __useGetLastActivationsPaginatedQuery__
 *
 * To run a query within a React component, call `useGetLastActivationsPaginatedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLastActivationsPaginatedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLastActivationsPaginatedQuery({
 *   variables: {
 *      device: // value for 'device'
 *      first: // value for 'first'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetLastActivationsPaginatedQuery(
  baseOptions: Apollo.QueryHookOptions<GetLastActivationsPaginatedQuery, GetLastActivationsPaginatedQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetLastActivationsPaginatedQuery, GetLastActivationsPaginatedQueryVariables>(
    GetLastActivationsPaginatedDocument,
    options
  );
}
export function useGetLastActivationsPaginatedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetLastActivationsPaginatedQuery, GetLastActivationsPaginatedQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetLastActivationsPaginatedQuery, GetLastActivationsPaginatedQueryVariables>(
    GetLastActivationsPaginatedDocument,
    options
  );
}
export type GetLastActivationsPaginatedQueryHookResult = ReturnType<typeof useGetLastActivationsPaginatedQuery>;
export type GetLastActivationsPaginatedLazyQueryHookResult = ReturnType<typeof useGetLastActivationsPaginatedLazyQuery>;
export type GetLastActivationsPaginatedQueryResult = Apollo.QueryResult<
  GetLastActivationsPaginatedQuery,
  GetLastActivationsPaginatedQueryVariables
>;
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
export const GetActivationsCountGroupedByDeviceDocument = gql`
  query GetActivationsCountGroupedByDevice {
    activationsCountGroupedByDevice {
      device
      count
    }
  }
`;

/**
 * __useGetActivationsCountGroupedByDeviceQuery__
 *
 * To run a query within a React component, call `useGetActivationsCountGroupedByDeviceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActivationsCountGroupedByDeviceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActivationsCountGroupedByDeviceQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetActivationsCountGroupedByDeviceQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetActivationsCountGroupedByDeviceQuery,
    GetActivationsCountGroupedByDeviceQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetActivationsCountGroupedByDeviceQuery, GetActivationsCountGroupedByDeviceQueryVariables>(
    GetActivationsCountGroupedByDeviceDocument,
    options
  );
}
export function useGetActivationsCountGroupedByDeviceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetActivationsCountGroupedByDeviceQuery,
    GetActivationsCountGroupedByDeviceQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetActivationsCountGroupedByDeviceQuery, GetActivationsCountGroupedByDeviceQueryVariables>(
    GetActivationsCountGroupedByDeviceDocument,
    options
  );
}
export type GetActivationsCountGroupedByDeviceQueryHookResult = ReturnType<
  typeof useGetActivationsCountGroupedByDeviceQuery
>;
export type GetActivationsCountGroupedByDeviceLazyQueryHookResult = ReturnType<
  typeof useGetActivationsCountGroupedByDeviceLazyQuery
>;
export type GetActivationsCountGroupedByDeviceQueryResult = Apollo.QueryResult<
  GetActivationsCountGroupedByDeviceQuery,
  GetActivationsCountGroupedByDeviceQueryVariables
>;
export const GetActivationsCountGroupedByTypeDocument = gql`
  query GetActivationsCountGroupedByType {
    activationsCountGroupedByType {
      activatedBy
      count
    }
  }
`;

/**
 * __useGetActivationsCountGroupedByTypeQuery__
 *
 * To run a query within a React component, call `useGetActivationsCountGroupedByTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActivationsCountGroupedByTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActivationsCountGroupedByTypeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetActivationsCountGroupedByTypeQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetActivationsCountGroupedByTypeQuery,
    GetActivationsCountGroupedByTypeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetActivationsCountGroupedByTypeQuery, GetActivationsCountGroupedByTypeQueryVariables>(
    GetActivationsCountGroupedByTypeDocument,
    options
  );
}
export function useGetActivationsCountGroupedByTypeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetActivationsCountGroupedByTypeQuery,
    GetActivationsCountGroupedByTypeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetActivationsCountGroupedByTypeQuery, GetActivationsCountGroupedByTypeQueryVariables>(
    GetActivationsCountGroupedByTypeDocument,
    options
  );
}
export type GetActivationsCountGroupedByTypeQueryHookResult = ReturnType<
  typeof useGetActivationsCountGroupedByTypeQuery
>;
export type GetActivationsCountGroupedByTypeLazyQueryHookResult = ReturnType<
  typeof useGetActivationsCountGroupedByTypeLazyQuery
>;
export type GetActivationsCountGroupedByTypeQueryResult = Apollo.QueryResult<
  GetActivationsCountGroupedByTypeQuery,
  GetActivationsCountGroupedByTypeQueryVariables
>;
export const ActivateDeviceDocument = gql`
  mutation ActivateDevice($device: Device!, $amount: Float!) {
    activateDevice(device: $device, amount: $amount) {
      ...ActivationData
    }
  }
  ${ActivationDataFragmentDoc}
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
      updatedAt
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
  query GetLastMeasures($limit: Int, $offset: Int) {
    lastMeasures(limit: $limit, offset: $offset) {
      id
      createdAt
      updatedAt
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
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
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
export const GetLastMeasuresPaginatedDocument = gql`
  query GetLastMeasuresPaginated($first: Int!, $page: Int) {
    lastMeasuresPaginated(first: $first, page: $page) {
      paginatorInfo {
        ...PaginatorFields
      }
      data {
        ...MeasureData
      }
    }
  }
  ${PaginatorFieldsFragmentDoc}
  ${MeasureDataFragmentDoc}
`;

/**
 * __useGetLastMeasuresPaginatedQuery__
 *
 * To run a query within a React component, call `useGetLastMeasuresPaginatedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLastMeasuresPaginatedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLastMeasuresPaginatedQuery({
 *   variables: {
 *      first: // value for 'first'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetLastMeasuresPaginatedQuery(
  baseOptions: Apollo.QueryHookOptions<GetLastMeasuresPaginatedQuery, GetLastMeasuresPaginatedQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetLastMeasuresPaginatedQuery, GetLastMeasuresPaginatedQueryVariables>(
    GetLastMeasuresPaginatedDocument,
    options
  );
}
export function useGetLastMeasuresPaginatedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetLastMeasuresPaginatedQuery, GetLastMeasuresPaginatedQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetLastMeasuresPaginatedQuery, GetLastMeasuresPaginatedQueryVariables>(
    GetLastMeasuresPaginatedDocument,
    options
  );
}
export type GetLastMeasuresPaginatedQueryHookResult = ReturnType<typeof useGetLastMeasuresPaginatedQuery>;
export type GetLastMeasuresPaginatedLazyQueryHookResult = ReturnType<typeof useGetLastMeasuresPaginatedLazyQuery>;
export type GetLastMeasuresPaginatedQueryResult = Apollo.QueryResult<
  GetLastMeasuresPaginatedQuery,
  GetLastMeasuresPaginatedQueryVariables
>;
export const GetMeasuresAverageGroupedByDayDocument = gql`
  query GetMeasuresAverageGroupedByDay($range: DateRange!) {
    measuresAverageGroupedByDay(createdAt: $range) {
      date
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
 * __useGetMeasuresAverageGroupedByDayQuery__
 *
 * To run a query within a React component, call `useGetMeasuresAverageGroupedByDayQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeasuresAverageGroupedByDayQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeasuresAverageGroupedByDayQuery({
 *   variables: {
 *      range: // value for 'range'
 *   },
 * });
 */
export function useGetMeasuresAverageGroupedByDayQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetMeasuresAverageGroupedByDayQuery,
    GetMeasuresAverageGroupedByDayQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMeasuresAverageGroupedByDayQuery, GetMeasuresAverageGroupedByDayQueryVariables>(
    GetMeasuresAverageGroupedByDayDocument,
    options
  );
}
export function useGetMeasuresAverageGroupedByDayLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMeasuresAverageGroupedByDayQuery,
    GetMeasuresAverageGroupedByDayQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetMeasuresAverageGroupedByDayQuery, GetMeasuresAverageGroupedByDayQueryVariables>(
    GetMeasuresAverageGroupedByDayDocument,
    options
  );
}
export type GetMeasuresAverageGroupedByDayQueryHookResult = ReturnType<typeof useGetMeasuresAverageGroupedByDayQuery>;
export type GetMeasuresAverageGroupedByDayLazyQueryHookResult = ReturnType<
  typeof useGetMeasuresAverageGroupedByDayLazyQuery
>;
export type GetMeasuresAverageGroupedByDayQueryResult = Apollo.QueryResult<
  GetMeasuresAverageGroupedByDayQuery,
  GetMeasuresAverageGroupedByDayQueryVariables
>;
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
