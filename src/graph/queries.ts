import { gql } from "@apollo/client";

const partialProd = gql`
  fragment partialProd on Product {
    id
    name
    gallery
    inStock
    prices {
      amount
      currency {
        label
        symbol
      }
    }
  }
`;

export const getCategories = gql`
  ${partialProd}
  query getCategories {
    categories {
      name
      products {
        ...partialProd
      }
    }
  }
`;

export function getProduct(id: string) {
  return gql`
    ${partialProd}
    query getProd {
      product(id: "${id}") {
        ...partialProd
        description
        attributes {
          id
          type
          name
          items {
            displayValue
            value
            id
          }
        }
      }
    }
  `;
}
