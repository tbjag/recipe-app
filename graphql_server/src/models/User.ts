import { builder } from "../builder";
import { prisma } from "../db";

// Define user type
builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email"),
    firstName: t.exposeString("firstName"),
    lastName: t.exposeString("lastName"),
    role: t.exposeString("role"),
    writtenRecipe: t.relation("writtenRecipe"),
    favoriteRecipe: t.relation("favoriteRecipe"),
  }),
});

// Gets all users, for debugging
builder.queryField("users", (t) =>
  t.prismaField({
    type: ["User"],
    resolve: async (query, root, args, ctx, info) => {
      return prisma.user.findMany({ ...query });
    },
  })
);

// Gets a single user by its Id
builder.queryFields((t) => ({
  getUser: t.prismaField({
    type: "User",
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

const UserInput = builder.inputType("UserInput", {
  fields: (t) => ({
    email: t.string({ required: true }),
    firstName: t.string({ required: true }),
    lastName: t.string({ required: true }),
    role: t.string(),
  }),
});

// Creates a user
builder.mutationFields((t) => ({
  createUser: t.prismaField({
    type: "User",
    args: {
      input: t.arg({ type: UserInput, required: true }),
    },
    resolve: async (query, root, args, ctx, info) => {
      return await prisma.user.create({
        ...query,
        data: {
          email: args.input.email,
          firstName: args.input.firstName,
          lastName: args.input.lastName //TODO add optional role
        },
      });
    },
  }),
}));

