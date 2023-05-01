import SchemaBuilder from "@pothos/core";
import { DateResolver } from "graphql-scalars";
import PismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from '../prisma/pothos-types'
import { prisma } from "./db";

export const builder = new SchemaBuilder<{
  Scalars: {
    Date: { Input: Date; Output: Date };
  };
  PrismaTypes: PrismaTypes;
}>({
  plugins: [PismaPlugin],
  prisma: {
    client: prisma,
    // use where clause from prismaRelatedConnection for totalCount (will true by default in next major version)
    filterConnectionTotalCount: true,
  },
});

builder.queryType()
builder.mutationType()
builder.addScalarType("Date", DateResolver, {});
