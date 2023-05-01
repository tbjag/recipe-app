import { builder } from "../builder";
import { prisma } from "../db";

builder.prismaObject("Cuisine", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    recipe: t.relation('recipe')
  }),
});

builder.queryField("cuisines", (t) =>
  t.prismaField({
    type: "Cuisine",
    resolve: async (query, root, args, ctx, info) => {
      const cuisines = await prisma.cuisine.findMany({...query});
      console.log(cuisines)
      return cuisines
    },
  })
);

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
