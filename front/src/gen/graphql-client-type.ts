export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['Date']>;
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
  longitude?: Maybe<Scalars['Float']>;
  latitude?: Maybe<Scalars['Float']>;
  authorId?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  users?: Maybe<Array<Maybe<User>>>;
};

export type QueryUsersArgs = {
  id: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  createPost?: Maybe<Post>;
};

export type MutationCreateUserArgs = {
  name: Scalars['String'];
  email: Scalars['String'];
};

export type MutationCreatePostArgs = {
  title: Scalars['String'];
  content: Scalars['String'];
  published?: Maybe<Scalars['Boolean']>;
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
  authorId: Scalars['Int'];
};

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
  content: Scalars['String'];
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
  authorId: Scalars['Int'];
  published?: Maybe<Scalars['Boolean']>;
}>;

export type CreatePostMutation = { __typename?: 'Mutation' } & {
  createPost?: Maybe<
    { __typename?: 'Post' } & Pick<
      Post,
      | 'id'
      | 'title'
      | 'content'
      | 'authorId'
      | 'createdAt'
      | 'longitude'
      | 'latitude'
      | 'published'
    >
  >;
};
