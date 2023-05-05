import { InputObjectRef } from "@pothos/core";
import { builder } from "../builder";
import { prisma } from "../db";
import { Prisma } from "@prisma/client";

// Define recipe type
builder.prismaObject("Recipe", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    course: t.exposeString("course"),
    author: t.relation("author"),
    favoriteBy: t.relation("favoritedBy"),
    createdAt: t.expose("createdAt", { type: "Date" }),
    updatedAt: t.expose("updatedAt", { type: "Date" }),
    ingredients: t.relation("ingredients"),
    steps: t.exposeStringList("steps"),
  }),
});

// Gets all recipes
builder.queryField("getAllRecipes", (t) =>
  t.prismaField({
    type: ["Recipe"],
    resolve: async (query, root, args, ctx, info) => {
      return await prisma.recipe.findMany({ ...query });
    },
  })
);

// Gets a single recipe by its Id
builder.queryFields((t) => ({
  getRecipe: t.prismaField({
    type: "Recipe",
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args, ctx, info) => {
      return prisma.recipe.findUniqueOrThrow({
        ...query,
        where: {
          id: args.id,
        },
      });
    },
  }),
}));

const IngredientInput = builder.inputType("IngredientInput", {
  fields: (t) => ({
    name: t.string({ required: true }),
    amount: t.float({ required: true }),
    unitType: t.string({ required: true }),
    unit: t.string({ required: true }),
  }),
});

const RecipeInput = builder.inputType("RecipeInput", {
  fields: (t) => ({
    title: t.string({ required: true }),
    course: t.string({ required: true }),
    cuisineId: t.string({ required: true }),
    authorId: t.string({ required: true }),
    ingredients: t.field({ type: [IngredientInput], required: true }),
    steps: t.stringList({ required: true }),
  }),
});

//const RecipeCreate = InputObjectRef<Prisma.Recipe

// Creates recipe
builder.mutationFields((t) => ({
  createRecipe: t.prismaField({
    type: "Recipe",
    args: {
      input: t.arg({ type: RecipeInput, required: true }),
    },
    resolve: async (query, root, args, ctx, info) => {
      return await prisma.recipe.create({
        ...query,
        data: args.input,
        include: { ingredients: true },
      });
    },
  }),
}));
