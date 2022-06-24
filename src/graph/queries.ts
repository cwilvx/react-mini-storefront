import { gql } from "@apollo/client";

export const getCategories = gql`
  query getCategories {
    categories {
      name
      products {
        id
        name
        gallery
        prices {
          amount
        }
      }
    }
  }
`;
