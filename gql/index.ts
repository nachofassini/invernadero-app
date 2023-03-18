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
  /** When the stage was created. */
  created_at: Scalars["DateTime"];
  /** Active start date */
  from: Scalars["Date"];
  /** Unique primary key. */
  id: Scalars["ID"];
  /** Non-unique device name. */
  name: Scalars["String"];
  /** Active end date */
  to: Scalars["Date"];
  /** When the stage was last updated. */
  updated_at: Scalars["DateTime"];
};

export type ActivePlan = {
  __typename?: "ActivePlan";
  crop?: Maybe<Crop>;
  stage?: Maybe<Stage>;
};

export type Crop = {
  __typename?: "Crop";
  active: Scalars["Boolean"];
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  name: Scalars["String"];
  stageCount: Scalars["Int"];
  stages: Array<Maybe<Stage>>;
  updatedAt: Scalars["DateTime"];
};

export type CropInput = {
  active?: InputMaybe<Scalars["Boolean"]>;
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

export type Measure = Sensors & {
  __typename?: "Measure";
  /** Electricity consumption. */
  consumption: Scalars["Float"];
  /** When the measure was taken */
  created_at: Scalars["DateTime"];
  /** Unique primary key. */
  id: Scalars["ID"];
  /** Greenhouse humidity */
  inside_humidity: Scalars["Float"];
  /** Greenhouse li */
  inside_lighting: Scalars["Float"];
  /** Greenhouse temperature */
  inside_temperature: Scalars["Float"];
  /** External temperature */
  outside_humidity: Scalars["Float"];
  /** External temperature */
  outside_lighting: Scalars["Float"];
  /** External temperature */
  outside_temperature: Scalars["Float"];
  /** Greenhouse soil humidity */
  soil_humidity: Scalars["Float"];
  /** When the measure was last updated. */
  updated_at: Scalars["DateTime"];
};

export type MeasureStatistic = Sensors & {
  __typename?: "MeasureStatistic";
  /** Electricity consumption. */
  consumption: Scalars["Float"];
  /** Greenhouse humidity */
  inside_humidity: Scalars["Float"];
  /** Greenhouse li */
  inside_lighting: Scalars["Float"];
  /** Greenhouse temperature */
  inside_temperature: Scalars["Float"];
  /** External temperature */
  outside_humidity: Scalars["Float"];
  /** External temperature */
  outside_lighting: Scalars["Float"];
  /** External temperature */
  outside_temperature: Scalars["Float"];
  /** Greenhouse soil humidity */
  soil_humidity: Scalars["Float"];
};

export type Mutation = {
  __typename?: "Mutation";
  activateDevice?: Maybe<Activation>;
  deactivateDevice?: Maybe<Activation>;
  deleteCrop: Crop;
  deleteStage: Stage;
  upsertCrop: Crop;
  upsertStage: Stage;
};

export type MutationActivateDeviceArgs = {
  deviceId: Scalars["ID"];
  from: Scalars["DateTime"];
  to: Scalars["DateTime"];
};

export type MutationDeactivateDeviceArgs = {
  id: Scalars["ID"];
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
  activation?: Maybe<Activation>;
  activations?: Maybe<Array<Maybe<Activation>>>;
  activeCrop?: Maybe<Crop>;
  activePlan: ActivePlan;
  crop: Crop;
  crops: Array<Crop>;
  /** Get last measure */
  lastMeasure?: Maybe<Measure>;
  /** Find a single stage by an identifying attribute. */
  measure?: Maybe<Measure>;
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
  id: Scalars["ID"];
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
  created_at: DateTimeRange;
};

/** Indicates what fields are available at the top level of a query operation. */
export type QueryMeasuresAverageArgs = {
  created_at: DateTimeRange;
};

/** Indicates what fields are available at the top level of a query operation. */
export type QueryMeasuresAverageByDayArgs = {
  created_at: DateRange;
};

/** Indicates what fields are available at the top level of a query operation. */
export type QueryMeasuresAverageByHourArgs = {
  created_at: DateTimeRange;
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

export type Sensors = {
  consumption: Scalars["Float"];
  /** Greenhouse humidity */
  inside_humidity: Scalars["Float"];
  /** Greenhouse li */
  inside_lighting: Scalars["Float"];
  /** Greenhouse temperature */
  inside_temperature: Scalars["Float"];
  /** External temperature */
  outside_humidity: Scalars["Float"];
  /** External temperature */
  outside_lighting: Scalars["Float"];
  /** External temperature */
  outside_temperature: Scalars["Float"];
  /** Greenhouse soil humidity */
  soil_humidity: Scalars["Float"];
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

export type Stage = {
  __typename?: "Stage";
  active?: Maybe<Scalars["Boolean"]>;
  createdAt: Scalars["DateTime"];
  crop: Crop;
  cropId: Scalars["Int"];
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
  order?: Maybe<Scalars["Int"]>;
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

export type GetActivePlanQueryVariables = Exact<{ [key: string]: never }>;

export type GetActivePlanQuery = {
  __typename?: "Query";
  activePlan: {
    __typename?: "ActivePlan";
    crop?: { __typename?: "Crop"; id: string; name: string; active: boolean; stageCount: number } | null;
    stage?: {
      __typename?: "Stage";
      id: string;
      name: string;
      day?: number | null;
      days: number;
      order?: number | null;
    } | null;
  };
};

export type GetCropsQueryVariables = Exact<{ [key: string]: never }>;

export type GetCropsQuery = {
  __typename?: "Query";
  crops: Array<{ __typename?: "Crop"; id: string; name: string; active: boolean; stageCount: number }>;
};

export type CreateOrUpdateCropMutationVariables = Exact<{
  data: CropInput;
}>;

export type CreateOrUpdateCropMutation = {
  __typename?: "Mutation";
  upsertCrop: { __typename?: "Crop"; id: string; name: string; active: boolean };
};

export type DeleteCropMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteCropMutation = {
  __typename?: "Mutation";
  deleteCrop: { __typename?: "Crop"; id: string; name: string; active: boolean };
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
    active?: boolean | null;
    day?: number | null;
    order?: number | null;
    days: number;
    minTemperature: number;
    maxTemperature: number;
    minHumidity: number;
    maxHumidity: number;
    minCo2: number;
    maxCo2: number;
    lightHours: number;
    irrigation: number;
    createdAt: any;
    updatedAt: any;
    crop: { __typename?: "Crop"; id: string; name: string; active: boolean };
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
    active?: boolean | null;
    day?: number | null;
    order?: number | null;
    days: number;
    minTemperature: number;
    maxTemperature: number;
    minHumidity: number;
    maxHumidity: number;
    minCo2: number;
    maxCo2: number;
    lightHours: number;
    irrigation: number;
    createdAt: any;
    updatedAt: any;
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
    active?: boolean | null;
    day?: number | null;
    order?: number | null;
    days: number;
    minTemperature: number;
    maxTemperature: number;
    minHumidity: number;
    maxHumidity: number;
    minCo2: number;
    maxCo2: number;
    lightHours: number;
    irrigation: number;
    createdAt: any;
    updatedAt: any;
  };
};

export type DeleteStageMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteStageMutation = {
  __typename?: "Mutation";
  deleteStage: { __typename?: "Stage"; id: string; name: string; cropId: number; active?: boolean | null };
};

export const GetActivePlanDocument = gql`
  query GetActivePlan {
    activePlan {
      crop {
        id
        name
        active
        stageCount
      }
      stage {
        id
        name
        day
        days
        order
      }
    }
  }
`;

/**
 * __useGetActivePlanQuery__
 *
 * To run a query within a React component, call `useGetActivePlanQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActivePlanQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActivePlanQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetActivePlanQuery(
  baseOptions?: Apollo.QueryHookOptions<GetActivePlanQuery, GetActivePlanQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetActivePlanQuery, GetActivePlanQueryVariables>(GetActivePlanDocument, options);
}
export function useGetActivePlanLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetActivePlanQuery, GetActivePlanQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetActivePlanQuery, GetActivePlanQueryVariables>(GetActivePlanDocument, options);
}
export type GetActivePlanQueryHookResult = ReturnType<typeof useGetActivePlanQuery>;
export type GetActivePlanLazyQueryHookResult = ReturnType<typeof useGetActivePlanLazyQuery>;
export type GetActivePlanQueryResult = Apollo.QueryResult<GetActivePlanQuery, GetActivePlanQueryVariables>;
export const GetCropsDocument = gql`
  query GetCrops {
    crops {
      id
      name
      active
      stageCount
    }
  }
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
export const CreateOrUpdateCropDocument = gql`
  mutation CreateOrUpdateCrop($data: CropInput!) {
    upsertCrop(data: $data) {
      id
      name
      active
    }
  }
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
      id
      name
      active
    }
  }
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
export const GetStageDocument = gql`
  query GetStage($id: ID!) {
    stage(id: $id) {
      id
      cropId
      crop {
        id
        name
        active
      }
      name
      active
      day
      order
      days
      minTemperature
      maxTemperature
      minHumidity
      maxHumidity
      minCo2
      maxCo2
      lightHours
      irrigation
      createdAt
      updatedAt
    }
  }
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
      id
      cropId
      name
      active
      day
      order
      days
      minTemperature
      maxTemperature
      minHumidity
      maxHumidity
      minCo2
      maxCo2
      lightHours
      irrigation
      createdAt
      updatedAt
    }
  }
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
      id
      cropId
      name
      active
      day
      order
      days
      minTemperature
      maxTemperature
      minHumidity
      maxHumidity
      minCo2
      maxCo2
      lightHours
      irrigation
      createdAt
      updatedAt
    }
  }
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
      id
      name
      cropId
      active
    }
  }
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
