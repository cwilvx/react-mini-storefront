import { cartItem, Store } from "./../interfaces";

export const getCartState = (store: Store) => {
  return store.state.cart;
};

export function getCartItems(store: Store) {
  const cart = getCartState(store);
  return cart.items;
}

export function getCartItemsCount(state: any) {
  return getCartItems(state).length;
}

export function itemInCart(store: Store, item_id: string): boolean {
  const items = getCartItems(store);
  return items.some((item: cartItem) => item.id === item_id);
}

export function getCartItemById(
  state: any,
  item_id: string
): cartItem | undefined {
  const items = state.cart.items;
  return items.find((item: cartItem) => item.id === item_id);
}
