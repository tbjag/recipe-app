/* eslint-disable */
import type { Prisma, User, Recipe, Ingredient, Cuisine, UsersFavorite } from "@prisma/client";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        Create: {};
        Update: {};
        RelationName: "writtenRecipe" | "favoriteRecipe";
        ListRelations: "writtenRecipe" | "favoriteRecipe";
        Relations: {
            writtenRecipe: {
                Shape: Recipe[];
                Name: "Recipe";
            };
            favoriteRecipe: {
                Shape: UsersFavorite[];
                Name: "UsersFavorite";
            };
        };
    };
    Recipe: {
        Name: "Recipe";
        Shape: Recipe;
        Include: Prisma.RecipeInclude;
        Select: Prisma.RecipeSelect;
        OrderBy: Prisma.RecipeOrderByWithRelationInput;
        WhereUnique: Prisma.RecipeWhereUniqueInput;
        Where: Prisma.RecipeWhereInput;
        Create: {};
        Update: {};
        RelationName: "cuisine" | "author" | "favoritedBy" | "ingredients";
        ListRelations: "favoritedBy" | "ingredients";
        Relations: {
            cuisine: {
                Shape: Cuisine;
                Name: "Cuisine";
            };
            author: {
                Shape: User;
                Name: "User";
            };
            favoritedBy: {
                Shape: UsersFavorite[];
                Name: "UsersFavorite";
            };
            ingredients: {
                Shape: Ingredient[];
                Name: "Ingredient";
            };
        };
    };
    Ingredient: {
        Name: "Ingredient";
        Shape: Ingredient;
        Include: Prisma.IngredientInclude;
        Select: Prisma.IngredientSelect;
        OrderBy: Prisma.IngredientOrderByWithRelationInput;
        WhereUnique: Prisma.IngredientWhereUniqueInput;
        Where: Prisma.IngredientWhereInput;
        Create: {};
        Update: {};
        RelationName: "recipe";
        ListRelations: never;
        Relations: {
            recipe: {
                Shape: Recipe | null;
                Name: "Recipe";
            };
        };
    };
    Cuisine: {
        Name: "Cuisine";
        Shape: Cuisine;
        Include: Prisma.CuisineInclude;
        Select: Prisma.CuisineSelect;
        OrderBy: Prisma.CuisineOrderByWithRelationInput;
        WhereUnique: Prisma.CuisineWhereUniqueInput;
        Where: Prisma.CuisineWhereInput;
        Create: {};
        Update: {};
        RelationName: "recipe";
        ListRelations: "recipe";
        Relations: {
            recipe: {
                Shape: Recipe[];
                Name: "Recipe";
            };
        };
    };
    UsersFavorite: {
        Name: "UsersFavorite";
        Shape: UsersFavorite;
        Include: Prisma.UsersFavoriteInclude;
        Select: Prisma.UsersFavoriteSelect;
        OrderBy: Prisma.UsersFavoriteOrderByWithRelationInput;
        WhereUnique: Prisma.UsersFavoriteWhereUniqueInput;
        Where: Prisma.UsersFavoriteWhereInput;
        Create: {};
        Update: {};
        RelationName: "recipe" | "user";
        ListRelations: never;
        Relations: {
            recipe: {
                Shape: Recipe;
                Name: "Recipe";
            };
            user: {
                Shape: User;
                Name: "User";
            };
        };
    };
}