import { objectType } from "@nexus/schema";
import { DateScalar } from "./scalarType";

export const User = objectType({
  name: "User",
  definition: (t) => {
    t.id("id");
    t.string("name", {
      resolve: (parent) => parent.name,
    });
    t.string("email", {
      resolve: (parent) => parent.email,
    });
  },
});

export const Post = objectType({
  name: "Post",
  definition: (t) => {
    t.id("id");
    t.field("createdAt", {
      type: DateScalar,
      resolve: (parent) => parent.createdAt,
    });
    t.string("title", {
      resolve: (parent) => parent.title,
    });
    t.string("content", {
      resolve: (parent) => parent.content,
    });
    t.boolean("published", {
      resolve: (parent) => parent.published,
    });
    t.float("longitude", {
      resolve: (parent) => parent.longitude,
    });
    t.float("latitude", {
      resolve: (parent) => parent.latitude,
    });
    t.int("authorId", {
      resolve: (parent) => parent.authorId,
    });
  },
});

export default [User, Post];
