import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CompensationItem = {
  __typename?: 'CompensationItem';
  amount: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  endDate?: Maybe<Scalars['String']['output']>;
  enumerationId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  startDate: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum EducationLevel {
  Degree = 'DEGREE',
  Diploma = 'DIPLOMA',
  Master = 'MASTER',
  Phd = 'PHD',
  PostSecondary = 'POST_SECONDARY',
  Primary = 'PRIMARY',
  Secondary = 'SECONDARY'
}

export type Employee = {
  __typename?: 'Employee';
  birthDate: Scalars['DateTime']['output'];
  children?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['String']['output'];
  educationLevel?: Maybe<EducationLevel>;
  email?: Maybe<Scalars['String']['output']>;
  enumeration?: Maybe<Enumeration>;
  id: Scalars['ID']['output'];
  martialStatus?: Maybe<MartialStatus>;
  name: Scalars['String']['output'];
  nationality: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  qualification?: Maybe<Scalars['String']['output']>;
  race?: Maybe<Race>;
  religion?: Maybe<Religion>;
  spouseName?: Maybe<Scalars['String']['output']>;
  spouseOccupation?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type Enumeration = {
  __typename?: 'Enumeration';
  basicSalary: Scalars['Float']['output'];
  compensationItems?: Maybe<Array<Maybe<CompensationItem>>>;
  createdAt: Scalars['DateTime']['output'];
  employeeId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum MartialStatus {
  Divorced = 'DIVORCED',
  Married = 'MARRIED',
  Single = 'SINGLE',
  Widowed = 'WIDOWED'
}

export type Query = {
  __typename?: 'Query';
  employee?: Maybe<Employee>;
  enumeration?: Maybe<Enumeration>;
  user: User;
};


export type QueryEmployeeArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryEnumerationArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export enum Race {
  Chinese = 'CHINESE',
  Indian = 'INDIAN',
  Malay = 'MALAY',
  Other = 'OTHER'
}

export enum Religion {
  Buddha = 'BUDDHA',
  Christian = 'CHRISTIAN',
  Hindu = 'HINDU',
  Islam = 'ISLAM',
  Other = 'OTHER'
}

export type Response = {
  __typename?: 'Response';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type TimeStamp = {
  __typename?: 'TimeStamp';
  createdAt: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type NumberPagination = {
  __typename?: 'numberPagination';
  count?: Maybe<Scalars['Int']['output']>;
  limit?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CompensationItem: ResolverTypeWrapper<CompensationItem>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  EducationLevel: EducationLevel;
  Employee: ResolverTypeWrapper<Employee>;
  Enumeration: ResolverTypeWrapper<Enumeration>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  MartialStatus: MartialStatus;
  Query: ResolverTypeWrapper<{}>;
  Race: Race;
  Religion: Religion;
  Response: ResolverTypeWrapper<Response>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  TimeStamp: ResolverTypeWrapper<TimeStamp>;
  User: ResolverTypeWrapper<User>;
  numberPagination: ResolverTypeWrapper<NumberPagination>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CompensationItem: CompensationItem;
  DateTime: Scalars['DateTime']['output'];
  Employee: Employee;
  Enumeration: Enumeration;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Query: {};
  Response: Response;
  String: Scalars['String']['output'];
  TimeStamp: TimeStamp;
  User: User;
  numberPagination: NumberPagination;
};

export type CompensationItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompensationItem'] = ResolversParentTypes['CompensationItem']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  endDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  enumerationId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type EmployeeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Employee'] = ResolversParentTypes['Employee']> = {
  birthDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  children?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  educationLevel?: Resolver<Maybe<ResolversTypes['EducationLevel']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  enumeration?: Resolver<Maybe<ResolversTypes['Enumeration']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  martialStatus?: Resolver<Maybe<ResolversTypes['MartialStatus']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nationality?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  qualification?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  race?: Resolver<Maybe<ResolversTypes['Race']>, ParentType, ContextType>;
  religion?: Resolver<Maybe<ResolversTypes['Religion']>, ParentType, ContextType>;
  spouseName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  spouseOccupation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EnumerationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Enumeration'] = ResolversParentTypes['Enumeration']> = {
  basicSalary?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  compensationItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['CompensationItem']>>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  employeeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  employee?: Resolver<Maybe<ResolversTypes['Employee']>, ParentType, ContextType, RequireFields<QueryEmployeeArgs, '_id'>>;
  enumeration?: Resolver<Maybe<ResolversTypes['Enumeration']>, ParentType, ContextType, RequireFields<QueryEnumerationArgs, '_id'>>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
};

export type ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Response'] = ResolversParentTypes['Response']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TimeStampResolvers<ContextType = any, ParentType extends ResolversParentTypes['TimeStamp'] = ResolversParentTypes['TimeStamp']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NumberPaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['numberPagination'] = ResolversParentTypes['numberPagination']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  limit?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  offset?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  CompensationItem?: CompensationItemResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Employee?: EmployeeResolvers<ContextType>;
  Enumeration?: EnumerationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Response?: ResponseResolvers<ContextType>;
  TimeStamp?: TimeStampResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  numberPagination?: NumberPaginationResolvers<ContextType>;
};

