import {
  booleanArg,
  floatArg,
  intArg,
  mutationType,
  stringArg,
} from "@nexus/schema";
import { PostCreateInput, UserCreateInput } from "@prisma/client";

export const Mutation = mutationType({
  definition: (t) => {
    t.field("createUser", {
      type: "User",
      nullable: false,
      args: {
        name: stringArg({ required: true }),
        email: stringArg({ required: true }),
      },
      resolve: async (_root, args, ctx) => {
        const draft: UserCreateInput = {
          name: args.name,
          email: args.email,
        };
        const result = await ctx.prisma.user.create({
          data: draft,
        });

        return result;
      },
    });
    t.field("createPost", {
      type: "Post",
      args: {
        title: stringArg({ required: true }),
        content: stringArg({ required: true }),
        published: booleanArg({ default: true }),
        longitude: floatArg({ required: true }),
        latitude: floatArg({ required: true }),
        authorId: intArg({ required: true }),
      },
      resolve: async (_root, args, ctx) => {
        const draft: PostCreateInput = {
          title: args.title,
          content: args.content,
          published: args.published ?? undefined,
          longitude: args.longitude,
          latitude: args.latitude,
          author: {
            connect: { id: args.authorId },
          },
        };
        const result = await ctx.prisma.post.create({
          data: draft,
        });

        return result;
      },
    });
  },
});
