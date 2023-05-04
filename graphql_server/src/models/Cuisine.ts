import { builder } from "../builder";
import { prisma } from "../db";

// Define cuisine type
builder.prismaObject("Cuisine", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    recipe: t.relation('recipe')
  }),
});

// Gets all cuisines, for debugging
builder.queryField("cuisines", (t) =>
  t.prismaField({
    type: ["Cuisine"],
    resolve: async (query, root, args, ctx, info) => {
      return await prisma.cuisine.findMany({...query});
    },
  })
);

// Gets a single cuisine by its Id
builder.queryFields((t) => ({
  getCuisine: t.prismaField({
    type: 'Cuisine',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.cuisine.findUniqueOrThrow({
        ...query,
        where: {
          id: args.id,
        },
      });
    },
  }),
}));

// Creates a cuisine
builder.mutationFields((t) => ({
  createCuisine: t.prismaField({
    type: 'Cuisine',
    args: {
      name: t.arg.string({required:true}),
    },
    resolve: async (query, root, args, ctx, info) => {
      return prisma.cuisine.create({
        ...query,
        data: {
          name: args.name,
        },
      });
    },
  }),
}));