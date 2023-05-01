import { builder } from "../builder";
import { prisma } from "../db";

builder.prismaObject("Recipe", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    course: t.exposeString("course"),
    author: t.relation("author"),
    favoriteBy: t.relation("favoritedBy"),
    createdAt: t.expose("createdAt", { type: "Date" }),
    updatedAt: t.expose("updatedAt", { type: "Date" }),
    ingredients: t.relation('ingredients'),
    steps: t.exposeStringList('steps')
  }),
});

builder.queryFields((t) => ({
  getRecipe: t.prismaField({
    type: 'Recipe',
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

builder.mutationFields((t) => ({
  createRecipe: t.prismaField({
    type: 'Recipe',
    args: {
      title: t.arg.string({required:true}),
      course: t.arg.string({required:true}),
      cuisineId: t.arg.string({required:true}),
      authorId: t.arg.string({required:true}),
      //ingredients: t.arg.
      steps: t.arg.stringList({required:true})
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.recipe.create({
        ...query,
        data: {
          title: args.title,
          course: args.course,
          cousineId: args.cuisineId,
          authorId: args.authorId,
          steps: args.steps
        },
      });
    },
  }),
}));
