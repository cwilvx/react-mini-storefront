import { wrapCurrency } from "../composables";
import { CartItem, Store } from "./../interfaces";
import { getTotalItems, getTotalPrice } from "../composables";

export const getCartState = (store: Store) => {
  return store.cart;
};

export function getCartItems(store: Store) {
  const cart = getCartState(store);
  return cart.items;
}

export function getCartItemsCount(store: Store) {
  const items = getCartItems(store);
  return getTotalItems(items);
}

export function itemInCart(store: Store, item_id: string): boolean {
  const items = getCartItems(store);
  return items.some((item: CartItem) => item.id === item_id);
}

export function getCartItemById(store: Store, item_id: string) {
  const items = store.cart.items as CartItem[];
  return items.find((item) => item.id === item_id);
}

export function getCartTotal(store: Store) {
  const items = getCartItems(store);
  const currency = getSelectedCurrency(store);
  const total = getTotalPrice(items, currency);
  return wrapCurrency(total, currency);
}

export function getCurrencyState(store: Store) {
  return {
    ...store.currency,
  };
}

export function getSelectedCurrency(store: Store) {
  return getCurrencyState(store).selected;
}
