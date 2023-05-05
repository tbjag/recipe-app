import { builder } from "../builder";
import { prisma } from "../db";

builder.prismaObject("UsersFavorite", {
  fields: (t) => ({
    users: t.relation("user"),
    userId: t.exposeString("userId"),
    recipes: t.relation("recipe"),
    recipeId: t.exposeString("recipeId"),
  }),
});

//add favorite recipes
// TODO cleanup code
const FavoriteInput = builder.inputType("FavoriteInput", {
  fields: (t) => ({
    userId: t.string({ required: true }),
    recipeId: t.string({ required: true }),
  }),
});

builder.mutationFields((t) => ({
  favoriteRecipe: t.prismaField({
    type: "UsersFavorite",
    args: {
      input: t.arg({ type: FavoriteInput, required: true }),
    },
    resolve: async (query, root, args, ctx, info) => {
      return await prisma.usersFavorite.create({
        ...query,
        data: {
          recipeId: args.input.recipeId,
          userId: args.input.userId,
        },
      });
    },
  }),
}));
