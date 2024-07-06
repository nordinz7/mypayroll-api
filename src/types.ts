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
  UUID: { input: any; output: any; }
};

export enum ActiveStatus {
  Active = 'ACTIVE',
  Deleted = 'DELETED'
}

export type CompensationItem = {
  __typename?: 'CompensationItem';
  amount: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
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

export type CreateUserInput = {
  confirmPassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  uuid?: InputMaybe<Scalars['UUID']['input']>;
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

export type EmployeeInput = {
  birthDate: Scalars['DateTime']['input'];
  children?: InputMaybe<Scalars['Int']['input']>;
  educationLevel?: InputMaybe<EducationLevel>;
  email?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  joinDate: Scalars['DateTime']['input'];
  martialStatus: MartialStatus;
  name: Scalars['String']['input'];
  nationality: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  qualification?: InputMaybe<Scalars['String']['input']>;
  race?: InputMaybe<Race>;
  religion?: InputMaybe<Religion>;
  spouseName?: InputMaybe<Scalars['String']['input']>;
  spouseOccupation?: InputMaybe<Scalars['String']['input']>;
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
  createEmployee?: Maybe<Employee>;
  createEnumeration?: Maybe<Enumeration>;
  createUser?: Maybe<User>;
  deleteUser?: Maybe<User>;
  resetPassword?: Maybe<Response>;
  signIn?: Maybe<Token>;
  signUp?: Maybe<Token>;
  unDeleteUser?: Maybe<User>;
  updateEmployee?: Maybe<Employee>;
  updateEnumeration?: Maybe<Enumeration>;
  updateUser?: Maybe<User>;
};


export type MutationCreateEmployeeArgs = {
  input?: InputMaybe<EmployeeInput>;
};


export type MutationCreateEnumerationArgs = {
  input: UpdateEnumerationInput;
};


export type MutationCreateUserArgs = {
  input?: InputMaybe<CreateUserInput>;
};


export type MutationDeleteUserArgs = {
  uuid?: InputMaybe<Scalars['UUID']['input']>;
};


export type MutationResetPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationSignInArgs = {
  input?: InputMaybe<SignInInput>;
};


export type MutationSignUpArgs = {
  input?: InputMaybe<CreateUserInput>;
};


export type MutationUnDeleteUserArgs = {
  uuid?: InputMaybe<Scalars['UUID']['input']>;
};


export type MutationUpdateEmployeeArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  input?: InputMaybe<EmployeeInput>;
};


export type MutationUpdateEnumerationArgs = {
  input: UpdateEnumerationInput;
};


export type MutationUpdateUserArgs = {
  input?: InputMaybe<UpdateUserInput>;
};

export type Query = {
  __typename?: 'Query';
  employee?: Maybe<Employee>;
  employees?: Maybe<Employees>;
  enumeration?: Maybe<Enumeration>;
  user?: Maybe<User>;
  users?: Maybe<Users>;
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
  uuid?: InputMaybe<Scalars['UUID']['input']>;
};


export type QueryUsersArgs = {
  input?: InputMaybe<UserQueryInput>;
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
  data?: Maybe<Scalars['JSON']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type SignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type TimeStamp = {
  __typename?: 'TimeStamp';
  createdAt: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Token = {
  __typename?: 'Token';
  jwt?: Maybe<Scalars['String']['output']>;
};

export type UpdateEnumerationInput = {
  basicSalary: Scalars['Float']['input'];
  compensationItems?: InputMaybe<Array<InputMaybe<CreateCompensationItemInput>>>;
  enumerationId: Scalars['Int']['input'];
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['UUID']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  status?: Maybe<ActiveStatus>;
  updatedAt: Scalars['String']['output'];
  uuid?: Maybe<Scalars['UUID']['output']>;
};

export type UserQueryInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
};

export type Users = {
  __typename?: 'Users';
  pageInfo?: Maybe<NumberPagination>;
  rows?: Maybe<Array<Maybe<User>>>;
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
  ActiveStatus: ActiveStatus;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CompensationItem: ResolverTypeWrapper<CompensationItem>;
  CreateCompensationItemInput: CreateCompensationItemInput;
  CreateUserInput: CreateUserInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  EducationLevel: EducationLevel;
  Employee: ResolverTypeWrapper<Employee>;
  EmployeeInput: EmployeeInput;
  Employees: ResolverTypeWrapper<Employees>;
  EmployeesQueryInput: EmployeesQueryInput;
  Enumeration: ResolverTypeWrapper<Enumeration>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  MartialStatus: MartialStatus;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Race: Race;
  Religion: Religion;
  Response: ResolverTypeWrapper<Response>;
  SignInInput: SignInInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  TimeStamp: ResolverTypeWrapper<TimeStamp>;
  Token: ResolverTypeWrapper<Token>;
  UUID: ResolverTypeWrapper<Scalars['UUID']['output']>;
  UpdateEnumerationInput: UpdateEnumerationInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
  UserQueryInput: UserQueryInput;
  Users: ResolverTypeWrapper<Users>;
  numberPagination: ResolverTypeWrapper<NumberPagination>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CompensationItem: CompensationItem;
  CreateCompensationItemInput: CreateCompensationItemInput;
  CreateUserInput: CreateUserInput;
  DateTime: Scalars['DateTime']['output'];
  Employee: Employee;
  EmployeeInput: EmployeeInput;
  Employees: Employees;
  EmployeesQueryInput: EmployeesQueryInput;
  Enumeration: Enumeration;
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  Mutation: {};
  Query: {};
  Response: Response;
  SignInInput: SignInInput;
  String: Scalars['String']['output'];
  TimeStamp: TimeStamp;
  Token: Token;
  UUID: Scalars['UUID']['output'];
  UpdateEnumerationInput: UpdateEnumerationInput;
  UpdateUserInput: UpdateUserInput;
  User: User;
  UserQueryInput: UserQueryInput;
  Users: Users;
  numberPagination: NumberPagination;
};

export type CompensationItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompensationItem'] = ResolversParentTypes['CompensationItem']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
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
  createEmployee?: Resolver<Maybe<ResolversTypes['Employee']>, ParentType, ContextType, Partial<MutationCreateEmployeeArgs>>;
  createEnumeration?: Resolver<Maybe<ResolversTypes['Enumeration']>, ParentType, ContextType, RequireFields<MutationCreateEnumerationArgs, 'input'>>;
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<MutationCreateUserArgs>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<MutationDeleteUserArgs>>;
  resetPassword?: Resolver<Maybe<ResolversTypes['Response']>, ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'email'>>;
  signIn?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, Partial<MutationSignInArgs>>;
  signUp?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, Partial<MutationSignUpArgs>>;
  unDeleteUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<MutationUnDeleteUserArgs>>;
  updateEmployee?: Resolver<Maybe<ResolversTypes['Employee']>, ParentType, ContextType, Partial<MutationUpdateEmployeeArgs>>;
  updateEnumeration?: Resolver<Maybe<ResolversTypes['Enumeration']>, ParentType, ContextType, RequireFields<MutationUpdateEnumerationArgs, 'input'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<MutationUpdateUserArgs>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  employee?: Resolver<Maybe<ResolversTypes['Employee']>, ParentType, ContextType, RequireFields<QueryEmployeeArgs, 'id'>>;
  employees?: Resolver<Maybe<ResolversTypes['Employees']>, ParentType, ContextType, Partial<QueryEmployeesArgs>>;
  enumeration?: Resolver<Maybe<ResolversTypes['Enumeration']>, ParentType, ContextType, RequireFields<QueryEnumerationArgs, 'id'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryUserArgs>>;
  users?: Resolver<Maybe<ResolversTypes['Users']>, ParentType, ContextType, Partial<QueryUsersArgs>>;
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

export type TokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = {
  jwt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['ActiveStatus']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['UUID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UsersResolvers<ContextType = any, ParentType extends ResolversParentTypes['Users'] = ResolversParentTypes['Users']> = {
  pageInfo?: Resolver<Maybe<ResolversTypes['numberPagination']>, ParentType, ContextType>;
  rows?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
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
  Token?: TokenResolvers<ContextType>;
  UUID?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  Users?: UsersResolvers<ContextType>;
  numberPagination?: NumberPaginationResolvers<ContextType>;
};

