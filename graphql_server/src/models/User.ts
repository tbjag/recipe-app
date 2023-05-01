import { builder } from "../builder";
import { prisma } from "../db";

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email"),
    firstName: t.exposeString("firstName"),
    lastName: t.exposeString("lastName"),
    role: t.exposeString("role"),
    writtenRecipe: t.relation('writtenRecipe'),
    favoriteRecipe: t.relation('favoriteRecipe'),
  }),
});

builder.queryField("users", (t) =>
  t.prismaField({
    type: "User",
    resolve: async (query, root, args, ctx, info) => {
      return prisma.user.findMany({ ...query });
    },
  })
);

// builder.queryType({
//   fields: (t) => ({
//     getUser: t.prismaField({
//       type: 'User',
//       args:{
//         id: t.arg.string({required:true})
//       },
//       resolve: async (query, root, args, ctx, info) =>
//         prisma.user.findUniqueOrThrow({
//           ...query,
//           where: { id: args.id },
//         }),
//     }),
//   }),
// });

builder.queryFields((t) => ({
  getUser2: t.prismaField({
    type: 'User',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.user.findUniqueOrThrow({
        ...query,
        where: {
          id: args.id,
        },
      });
    },
  }),
}));


builder.mutationFields((t) => ({
  createUser: t.prismaField({
    type: "User",
    args: {
      email: t.arg.string({ required: true }),
      firstName: t.arg.string({ required: true }),
      lastName: t.arg.string({ required: true }),
      role: t.arg.string(),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.user.create({
        ...query,
        data: {
          email: args.email,
          firstName: args.firstName,
          lastName: args.lastName,
          //role: args.role |
        },
      });
    },
  }),
}));

//add favorite & written recipes