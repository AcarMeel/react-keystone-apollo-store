import gql from "graphql-tag";

export const SINGLE_PRODUCT_QUERY = gql`
query SINGLE_PRODUCT_QUERY($id: ID!) {
  Product(where: { id: $id }) {
    name
    description
    price
    id
    photo {
      image {
        publicUrlTransformed
      }
    }
  }
}
`;