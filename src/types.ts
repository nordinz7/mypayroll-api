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
  JSON: { input: any; output: any; }
};

export type CompensationItem = {
  __typename?: 'CompensationItem';
  amount: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  employeeId?: Maybe<Scalars['Int']['output']>;
  endDate?: Maybe<Scalars['String']['output']>;
  enumerationId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  startDate: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateCompensationItemInput = {
  amount: Scalars['Float']['input'];
  endDate?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
};

export type CreateEmployeeInput = {
  birthDate: Scalars['DateTime']['input'];
  name: Scalars['String']['input'];
  nationality: Scalars['String']['input'];
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
  endDate?: Maybe<Scalars['DateTime']['output']>;
  enumeration?: Maybe<Enumeration>;
  enumerationId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  joinDate: Scalars['DateTime']['output'];
  martialStatus?: Maybe<MartialStatus>;
  name: Scalars['String']['output'];
  nationality: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  qualification?: Maybe<Scalars['String']['output']>;
  race?: Maybe<Race>;
  religion?: Maybe<Religion>;
  spouseName?: Maybe<Scalars['String']['output']>;
  spouseOccupation?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type Employees = {
  __typename?: 'Employees';
  pagination?: Maybe<NumberPagination>;
  rows?: Maybe<Array<Maybe<Employee>>>;
};

export type EmployeesQueryInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
};

export type Enumeration = {
  __typename?: 'Enumeration';
  basicSalary: Scalars['Float']['output'];
  compensationItems?: Maybe<Array<Maybe<CompensationItem>>>;
  createdAt: Scalars['DateTime']['output'];
  employeeId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum MartialStatus {
  Divorced = 'DIVORCED',
  Married = 'MARRIED',
  Single = 'SINGLE',
  Widowed = 'WIDOWED'
}

export type Mutation = {
  __typename?: 'Mutation';
  changePassword?: Maybe<Response>;
  createEmployee?: Maybe<Employee>;
  createEnumeration?: Maybe<Enumeration>;
  forgotPassword?: Maybe<Response>;
  login?: Maybe<Response>;
  logout?: Maybe<Response>;
  register?: Maybe<Response>;
  resendVerificationEmail?: Maybe<Response>;
  resetPassword?: Maybe<Response>;
  updateEnumeration?: Maybe<Enumeration>;
  verifyEmail?: Maybe<Response>;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};


export type MutationCreateEmployeeArgs = {
  input?: InputMaybe<CreateEmployeeInput>;
};


export type MutationCreateEnumerationArgs = {
  input: UpdateEnumerationInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  input?: InputMaybe<RegisterInput>;
};


export type MutationResetPasswordArgs = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationUpdateEnumerationArgs = {
  input: UpdateEnumerationInput;
};


export type MutationVerifyEmailArgs = {
  token: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  employee?: Maybe<Employee>;
  employees?: Maybe<Employees>;
  enumeration?: Maybe<Enumeration>;
  user: User;
};


export type QueryEmployeeArgs = {
  id: Scalars['Int']['input'];
};


export type QueryEmployeesArgs = {
  input?: InputMaybe<EmployeesQueryInput>;
};


export type QueryEnumerationArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  _id: Scalars['ID']['input'];
};

export enum Race {
  Chinese = 'CHINESE',
  Indian = 'INDIAN',
  Malay = 'MALAY',
  Other = 'OTHER'
}

export type RegisterInput = {
  birthDate: Scalars['String']['input'];
  confirmPassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export enum Religion {
  Buddha = 'BUDDHA',
  Christian = 'CHRISTIAN',
  Hindu = 'HINDU',
  Islam = 'ISLAM',
  Other = 'OTHER'
}

export type Response = {
  __typename?: 'Response';
  data?: Maybe<Scalars['JSON']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type TimeStamp = {
  __typename?: 'TimeStamp';
  createdAt: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UpdateEnumerationInput = {
  basicSalary: Scalars['Float']['input'];
  compensationItems?: InputMaybe<Array<InputMaybe<CreateCompensationItemInput>>>;
  employeeId: Scalars['Int']['input'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
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
  CreateCompensationItemInput: CreateCompensationItemInput;
  CreateEmployeeInput: CreateEmployeeInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  EducationLevel: EducationLevel;
  Employee: ResolverTypeWrapper<Employee>;
  Employees: ResolverTypeWrapper<Employees>;
  EmployeesQueryInput: EmployeesQueryInput;
  Enumeration: ResolverTypeWrapper<Enumeration>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  MartialStatus: MartialStatus;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Race: Race;
  RegisterInput: RegisterInput;
  Religion: Religion;
  Response: ResolverTypeWrapper<Response>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  TimeStamp: ResolverTypeWrapper<TimeStamp>;
  UpdateEnumerationInput: UpdateEnumerationInput;
  User: ResolverTypeWrapper<User>;
  numberPagination: ResolverTypeWrapper<NumberPagination>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CompensationItem: CompensationItem;
  CreateCompensationItemInput: CreateCompensationItemInput;
  CreateEmployeeInput: CreateEmployeeInput;
  DateTime: Scalars['DateTime']['output'];
  Employee: Employee;
  Employees: Employees;
  EmployeesQueryInput: EmployeesQueryInput;
  Enumeration: Enumeration;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  Mutation: {};
  Query: {};
  RegisterInput: RegisterInput;
  Response: Response;
  String: Scalars['String']['output'];
  TimeStamp: TimeStamp;
  UpdateEnumerationInput: UpdateEnumerationInput;
  User: User;
  numberPagination: NumberPagination;
};

export type CompensationItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompensationItem'] = ResolversParentTypes['CompensationItem']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  employeeId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  endDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  enumerationId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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
  endDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  enumeration?: Resolver<Maybe<ResolversTypes['Enumeration']>, ParentType, ContextType>;
  enumerationId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  joinDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  martialStatus?: Resolver<Maybe<ResolversTypes['MartialStatus']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nationality?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  qualification?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  race?: Resolver<Maybe<ResolversTypes['Race']>, ParentType, ContextType>;
  religion?: Resolver<Maybe<ResolversTypes['Religion']>, ParentType, ContextType>;
  spouseName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  spouseOccupation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EmployeesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Employees'] = ResolversParentTypes['Employees']> = {
  pagination?: Resolver<Maybe<ResolversTypes['numberPagination']>, ParentType, ContextType>;
  rows?: Resolver<Maybe<Array<Maybe<ResolversTypes['Employee']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EnumerationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Enumeration'] = ResolversParentTypes['Enumeration']> = {
  basicSalary?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  compensationItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['CompensationItem']>>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  employeeId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  changePassword?: Resolver<Maybe<ResolversTypes['Response']>, ParentType, ContextType, RequireFields<MutationChangePasswordArgs, 'newPassword' | 'oldPassword'>>;
  createEmployee?: Resolver<Maybe<ResolversTypes['Employee']>, ParentType, ContextType, Partial<MutationCreateEmployeeArgs>>;
  createEnumeration?: Resolver<Maybe<ResolversTypes['Enumeration']>, ParentType, ContextType, RequireFields<MutationCreateEnumerationArgs, 'input'>>;
  forgotPassword?: Resolver<Maybe<ResolversTypes['Response']>, ParentType, ContextType, RequireFields<MutationForgotPasswordArgs, 'email'>>;
  login?: Resolver<Maybe<ResolversTypes['Response']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  logout?: Resolver<Maybe<ResolversTypes['Response']>, ParentType, ContextType>;
  register?: Resolver<Maybe<ResolversTypes['Response']>, ParentType, ContextType, Partial<MutationRegisterArgs>>;
  resendVerificationEmail?: Resolver<Maybe<ResolversTypes['Response']>, ParentType, ContextType>;
  resetPassword?: Resolver<Maybe<ResolversTypes['Response']>, ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'password' | 'token'>>;
  updateEnumeration?: Resolver<Maybe<ResolversTypes['Enumeration']>, ParentType, ContextType, RequireFields<MutationUpdateEnumerationArgs, 'input'>>;
  verifyEmail?: Resolver<Maybe<ResolversTypes['Response']>, ParentType, ContextType, RequireFields<MutationVerifyEmailArgs, 'token'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  employee?: Resolver<Maybe<ResolversTypes['Employee']>, ParentType, ContextType, RequireFields<QueryEmployeeArgs, 'id'>>;
  employees?: Resolver<Maybe<ResolversTypes['Employees']>, ParentType, ContextType, Partial<QueryEmployeesArgs>>;
  enumeration?: Resolver<Maybe<ResolversTypes['Enumeration']>, ParentType, ContextType, RequireFields<QueryEnumerationArgs, 'id'>>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, '_id'>>;
};

export type ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Response'] = ResolversParentTypes['Response']> = {
  data?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
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
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  Employees?: EmployeesResolvers<ContextType>;
  Enumeration?: EnumerationResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Response?: ResponseResolvers<ContextType>;
  TimeStamp?: TimeStampResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  numberPagination?: NumberPaginationResolvers<ContextType>;
};

