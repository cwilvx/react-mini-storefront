import { createBrowserHistory } from "history";

import client from "./graph/getClient";
import { getProduct } from "./graph/queries";
import { Currency, AttributeSet, CartAttr, CartItem } from "@/interfaces";

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
 * Replaces a selected attribute by id in a list of attributes.
 * @param attrs The source attributes
 * @param attr The attribute to replace
 * @returns A new attribute list with the attribute replaced
 */
export function replaceAttrs(attrs: CartAttr[], attr: CartAttr) {
  return attrs.map((a: CartAttr) => {
    if (a.attr_id === attr.attr_id) {
      return attr;
    }

    return a;
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
 * Gets the cummulative number of items in the cart
 * @param cart The list of cart items
 * @returns The number of items in the cart
 */
export function getTotalItems(cart: CartItem[]) {
  return cart.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);
}

/**
 * Gets the total price of the cart
 * @param cart The cart to calculate the total price
 * @param currency  The currency to use
 * @returns The total price of the cart
 */
export function getTotalPrice(cart: CartItem[], currency: Currency) {
  let total = cart.reduce((acc: number, item) => {
    const price =
      item.prices?.find((price) => price.currency?.label === currency.label) ||
      {};
    return acc + (price.amount || 0) * item.quantity;
  }, 0);
  return Math.round(total);
}

/**
 * Calculates tax given a price and a tax rate.
 * @param price The price to calculate the tax for
 * @param tax the percentage of tax to apply
 * @returns Amount of tax for the price
 */
export function calcTax(price: number, tax: number) {
  const taxed = price * (tax / 100);
  return Math.round(taxed);
}

/**
 * Wraps a price with the a currency symbol
 * @param price The numbers to wrap
 * @param currency The currency to use
 * @returns  A string with the currency symbol
 */
export function wrapCurrency(price: number, currency: Currency) {
  return `${currency.symbol} ${price}.00`;
}

/**
 * Called when the user clicks outside overlay elements.
 * @param ref The reference to the element to watch
 * @param e The mouse event
 * @param callback The callback to call if conditions are met
 */
export function handleClickOutside(
  ref: React.RefObject<HTMLDivElement>,
  e: MouseEvent,
  callback: () => void
) {
  if ((e.target as HTMLElement).classList.contains("toggle-handler")) {
    return;
  }

  if (ref.current && !ref.current.contains(e.target as Node)) {
    callback();
  }
}
