import { builder } from "../builder";
import { prisma } from "../db";

// Define ingredient type
builder.prismaObject("Ingredient", {
  fields: (t) => ({
    id: t.exposeID("id"),
    recipe: t.relation('recipe'),
    name: t.exposeString('name'),
    amount: t.exposeInt('amount'),
    measurementType: t.exposeString('measurementType'),
    measurement: t.exposeFloat('measurement'),
  }),
});

// Gets all ingredients, for debugging
builder.queryField("getAllIngredients", (t) =>
  t.prismaField({
    type: ["Cuisine"],
    resolve: async (query, root, args, ctx, info) => {
      return await prisma.ingredient.findMany({...query});
    },
  })
);

// Gets a single ingredient by its Id
builder.queryFields((t) => ({
  getIngredient: t.prismaField({
    type: 'Ingredient',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args, ctx, info) => {
      return prisma.ingredient.findUniqueOrThrow({
        ...query,
        where: {
          id: args.id,
        },
      });
    },
  }),
}));

// Creates 1 ingredient
//pref take a list of ingredients
builder.mutationFields((t) => ({
  createIngredient: t.prismaField({
    type: 'Ingredient',
    args: {
      name: t.arg.string({required:true}),
      recipeId: t.arg.string({required:true}),
      amount: t.arg.float({required:true}),
      measurementType: t.arg.string({required:true}),
      measurement: t.arg.float({required:true}),
    },
    resolve: async (query, root, args, ctx, info) => {
      return prisma.ingredient.create({
        ...query,
        data: {
          name: args.name,
          recipeId: args.recipeId,
          amount: args.amount,
          measurementType: args.measurementType,
          measurement: args.measurement
        },
      });
    },
  }),
}));