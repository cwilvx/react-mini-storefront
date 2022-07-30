import client from "./graph/getClient";
import { getProduct } from "./graph/queries";

import { createBrowserHistory } from "history";
import { AttributeSet, CartAttr } from "./interfaces";

/**
 * Strips javascript from a string using a regex.
 * @param html The HTML to parse
 * @returns The parsed HTML
 */
export function stripScripts(html: string): string {
  return html.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    ""
  );
}

/**
 * Returns the first attribute from a list of attribute sets.
 * @param attrs The attributes list to pick from
 */
export function extractDefaultAttrs(attrs: AttributeSet[]) {
  return attrs.map((attr) => {
    return {
      attr_id: attr.id,
      item_id: attr.items[0].id,
    } as CartAttr;
  });
}

/**
 * Parses the current url and returns the product id
 * @returns A product id
 */
export function getItemIdfromUrl() {
  const location = createBrowserHistory().location;
  const id = location.pathname.split("/")[2];
  return id;
}

/**
 * Gets the product from the graphql server by id
 * @param pid Product ID
 * @returns Promise that resolves to the product
 */
export function fetchProduct(pid: string) {
  return client.query({
    query: getProduct(pid),
  });
}

