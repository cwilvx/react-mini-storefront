import { wrapCurrency } from "../composables";
import { CartItem, Store } from "./../interfaces";
import { getTotalItems, getTotalPrice } from "../composables";

/**
 * Returns an object with the cart items
 * @param store The store
 */
export const getCartState = (store: Store) => {
  return store.cart;
};

/**
 * Returns the cart items list
 * @param store The store
 */
export function getCartItems(store: Store) {
  const cart = getCartState(store);
  return cart.items;
}

/**
 * Returns the cart items count
 * @param store - the store
 */
export function getCartItemsCount(store: Store) {
  const items = getCartItems(store);
  return getTotalItems(items);
}

/**
 * Checks whether an item is in the cart by id
 * @returns true if the item is in the cart, false otherwise
 */
export function itemInCart(store: Store, item_id: string): boolean {
  const items = getCartItems(store);
  return items.some((item: CartItem) => item.id === item_id);
}

/**
 * Retrieves a cart item by id
 * @param store The store
 * @param item_id The item id
 * @returns The item that matches the id
 */
export function getCartItemById(store: Store, item_id: string) {
  const items = store.cart.items as CartItem[];
  return items.find((item) => item.id === item_id);
}

/**
 * Returns the cart total price
 * @param store The store
 * @returns The total price of the cart
 */
export function getCartTotal(store: Store) {
  const items = getCartItems(store);
  const currency = getSelectedCurrency(store);
  const total = getTotalPrice(items, currency);
  return wrapCurrency(total, currency);
}

/**
 * Returns an object containing the selected currency and the currency list
 * @param store The store
 */
export function getCurrencyState(store: Store) {
  return {
    ...store.currency,
  };
}

/**
 * Returns the selected currency
 * @param store The store
 */
export function getSelectedCurrency(store: Store) {
  return getCurrencyState(store).selected;
}
