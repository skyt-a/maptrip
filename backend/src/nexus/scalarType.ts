import { scalarType } from "@nexus/schema";
import { Kind } from "graphql";

export const DateScalar = scalarType({
  name: "Date",
  asNexusMethod: "date",
  description: "Date custom scalar type",
  parseValue: (value: string) => new Date(value),
  serialize: (value: Date) => value.getTime(),
  parseLiteral: (ast) => {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }

    return null;
  },
});
