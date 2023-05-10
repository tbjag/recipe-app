/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
};

export type Cuisine = {
  __typename?: 'Cuisine';
  id: Scalars['ID'];
  name: Scalars['String'];
  recipe: Array<Recipe>;
};

export type CuisineInput = {
  name: Scalars['String'];
};

export type FavoriteInput = {
  recipeId: Scalars['String'];
  userId: Scalars['String'];
};

export type Ingredient = {
  __typename?: 'Ingredient';
  amount: Scalars['Int'];
  id: Scalars['ID'];
  measurement: Scalars['String'];
  measurementType: Scalars['String'];
  name: Scalars['String'];
  recipe: Recipe;
};

export type IngredientInput = {
  amount: Scalars['Float'];
  name: Scalars['String'];
  unit: Scalars['String'];
  unitType: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCuisine: Cuisine;
  createRecipe: Recipe;
  createUser: User;
  favoriteRecipe: UsersFavorite;
};


export type MutationCreateCuisineArgs = {
  input: CuisineInput;
};


export type MutationCreateRecipeArgs = {
  input: RecipeInput;
};


export type MutationCreateUserArgs = {
  input: UserInput;
};


export type MutationFavoriteRecipeArgs = {
  input: FavoriteInput;
};

export type Query = {
  __typename?: 'Query';
  cuisines: Array<Cuisine>;
  getAllIngredients: Array<Cuisine>;
  getAllRecipes: Array<Recipe>;
  getCuisine: Cuisine;
  getIngredient: Ingredient;
  getRecipe: Recipe;
  getUser: User;
  users: Array<User>;
};


export type QueryGetCuisineArgs = {
  id: Scalars['String'];
};


export type QueryGetIngredientArgs = {
  id: Scalars['String'];
};


export type QueryGetRecipeArgs = {
  id: Scalars['String'];
};


export type QueryGetUserArgs = {
  id: Scalars['String'];
};

export type Recipe = {
  __typename?: 'Recipe';
  author: User;
  course: Scalars['String'];
  createdAt: Scalars['Date'];
  favoriteBy: Array<UsersFavorite>;
  id: Scalars['ID'];
  ingredients: Array<Ingredient>;
  steps: Array<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type RecipeInput = {
  authorId: Scalars['String'];
  course: Scalars['String'];
  cuisineId: Scalars['String'];
  ingredients: Array<IngredientInput>;
  steps: Array<Scalars['String']>;
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  favoriteRecipe: Array<UsersFavorite>;
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  role: Scalars['String'];
  writtenRecipe: Array<Recipe>;
};

export type UserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  role?: InputMaybe<Scalars['String']>;
};

export type UsersFavorite = {
  __typename?: 'UsersFavorite';
  recipeId: Scalars['String'];
  recipes: Recipe;
  userId: Scalars['String'];
  users: User;
};
