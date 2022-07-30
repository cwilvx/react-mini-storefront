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
  query getCategories {
    categories {
      name
    }
  }
`;

export function getCategory(name: string) {
  return gql`
    ${partialProd}
    query getCategory {
      category(input: {
        title: "${name}"
      }) {
        name
        products {
          ...partialProd
        }
      }
    }
  `;
}

export function getProduct(id: string) {
  return gql`
    ${partialProd}
    query getProd {
      product(id: "${id}") {
        ...partialProd
        description
        brand
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

export const getCurrency = gql`
  query getCurrency {
    currencies {
      label
      symbol
    }
  }
`;
