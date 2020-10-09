import gql from 'graphql-tag';

export const createPost = gql`
  mutation createPost(
    $title: String!
    $content: String!
    $longitude: Float!
    $latitude: Float!
    $authorId: Int!
    $published: Boolean
  ) {
    createPost(
      title: $title
      content: $content
      published: $published
      longitude: $longitude
      latitude: $latitude
      authorId: $authorId
    ) {
      id
      title
      content
      authorId
      createdAt
      longitude
      latitude
      published
    }
  }
`;
