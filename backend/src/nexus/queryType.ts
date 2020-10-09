import { intArg, queryType } from "@nexus/schema";

export const Query = queryType({
  definition: (t) => {
    t.list.field("users", {
      type: "User",
      args: {
        id: intArg({ required: true }),
      },
      resolve: async (_root, _args, ctx) => {
        (await ctx.prisma.user.findOne({ where: { id: _args.id } })) ??
          undefined;
      },
    });
  },
});
