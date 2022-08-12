import { gql } from "@apollo/client";

/**
 * Partial product fragment
 */
const partialProd = gql`
  fragment partialProd on Product {
    id
    brand
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

/**
 * Returns a graphql query to get products of a category
 * @param name the category name
 */
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

/**
 * Returns a graphql query to get a product by id
 * @param id the product id
 */
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

export const getCurrency = gql`
  query getCurrency {
    currencies {
      label
      symbol
    }
  }
`;
