import { builder } from "../builder";
import { prisma } from "../db";

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
        data: {
          title: args.input.title,
          course: args.input.course, //TODO convert to enum
          cuisineId: args.input.cuisineId,
          authorId: args.input.authorId,
          steps: args.input.steps,
          ingredients: { create: args.input.ingredients },
        },
        include: { ingredients: true },
      });
    },
  }),
}));
