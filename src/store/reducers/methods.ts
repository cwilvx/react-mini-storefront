import { CartItem, SimpleItem } from "@/interfaces";

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

/**
 * Checks the existence of an item in the cart.
 * @param items The cart items to check from
 * @param item The item to check
 * @returns True if the item exists in the cart, false otherwise
 */
export function itemInCart(items: CartItem[], item: CartItem) {
  const cart = createSimpleItems(items);
  const itemToCheck = createSimpleItem(item);

  return cart.some(
    (i: SimpleItem) => JSON.stringify(i) === JSON.stringify(itemToCheck)
  );
}

