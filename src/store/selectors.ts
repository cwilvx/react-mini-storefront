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
