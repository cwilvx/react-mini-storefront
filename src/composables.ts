import client from "./graph/getClient";
import { getProduct } from "./graph/queries";

import { createBrowserHistory } from "history";
import { AttributeSet, CartAttr, CartItem, SimpleItem } from "./interfaces";

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

/**
 * Creates a simple item with only id and attrs from a cart item
 * @param item Item to create the simple item from
 */
export function createSimpleItem(item: CartItem) {
  return {
    id: item.id,
    attrs: item.selectedAttrs,
  } as SimpleItem;
}

/**
 * Creates simple item with only id and attrs from a cart item using the  `createSimpleItem` function
 * @param items List of items to create the simple items from
 */
export function createSimpleItems(items: CartItem[]) {
  return items.map((i) => createSimpleItem(i));
}

/**
 * Returns a new cart with an item's quantity incremented by 1.
 * @param items The cart items
 * @param item The item to increment
 * @returns A new cart with the incremented item
 */
export function incrementItem(items: CartItem[], item: CartItem) {
  return items.map((i: CartItem) => {
    if (i.id === item.id && i.selectedAttrs === item.selectedAttrs) {
      return { ...i, quantity: i.quantity + 1 };
    }
    return i;
  });
}

/**
 * Returns a new cart with an item's quantity decremented by 1.
 * @param items The cart items
 * @param item The item to decrement
 * @returns A new cart with the decremented item
 */
export function decrementItem(items: CartItem[], item: CartItem) {
  return items.map((i: CartItem) => {
    if (i.id === item.id && i.selectedAttrs === item.selectedAttrs) {
      return { ...i, quantity: i.quantity - 1 };
    }
    return i;
  });
}

/**
 * Returns a new cart with an item removed.
 * @param items The cart items
 * @param item The item to remove
 * @returns A new cart with the removed item
 */
export function removeItem(items: CartItem[], item: CartItem) {
  return items.filter((i: CartItem) => {
    if (i.id === item.id && i.selectedAttrs === item.selectedAttrs) {
      return false;
    }
    return true;
  });
}
