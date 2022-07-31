import { Currency } from "@/interfaces";
import client from "./graph/getClient";
import { getProduct } from "./graph/queries";

import { createBrowserHistory } from "history";
import { AttributeSet, CartAttr, CartItem } from "./interfaces";

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

export function getTotalItems(cart: CartItem[]) {
  return cart.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);
}

export function getTotalPrice(cart: CartItem[], currency: Currency) {
  let total = cart.reduce((acc: number, item) => {
    const price =
      item.prices?.find((price) => price.currency?.label === currency.label) ||
      {};
    return acc + (price.amount || 0) * item.quantity;
  }, 0);
  return Math.round(total);
}

export function calcTax(price: number, tax: number) {
  const taxed = price * (tax / 100);
  return Math.round(taxed);
}

export function wrapCurrency(price: number, currency: Currency) {
  return `${currency.symbol} ${price}.00`;
}

