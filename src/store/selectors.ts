import { CartItem, Store } from "./../interfaces";

export const getCartState = (store: Store) => {
  return store.cart;
};

export function getCartItems(store: Store) {
  const cart = getCartState(store);
  return cart.items;
}

export function getCartItemsCount(store: Store) {
  return getCartItems(store).reduce((acc, item) => acc + item.quantity, 0);
}

export function itemInCart(store: Store, item_id: string): boolean {
  const items = getCartItems(store);
  return items.some((item: CartItem) => item.id === item_id);
}

export function getCartItemById(store: Store, item_id: string) {
  const items = store.cart.items as CartItem[];
  return items.find((item) => item.id === item_id);
}

export function getTotalPrice(store: Store) {
  const items = getCartItems(store);
  const currency = getSelectedCurrency(store);

  const total = items.reduce((acc: number, item) => {
    const price =
      item.prices?.find((price) => price.currency?.label === currency.label) ||
      {};
    return acc + (price.amount || 0) * item.quantity;
  }, 0);
  return Math.round(total);
}

export function getCurrencyState(store: Store) {
  return {
    ...store.currency,
  };
}

export function getSelectedCurrency(store: Store) {
  return getCurrencyState(store).selected;
}
