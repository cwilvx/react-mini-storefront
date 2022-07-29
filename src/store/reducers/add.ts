import {
  createSimpleItem,
  createSimpleItems,
  decrementItem,
  incrementItem,
  removeItem,
} from "../../composables";
import { cartActionType, CartItem, SimpleItem } from "@/interfaces";
import { ActionType } from "../actionTypes";

export const initialState = {
  items: [] as CartItem[],
};

// ==================== METHODS ====================

/**
 * Checks the existence of an item in the cart.
 * @param items The cart items to check from
 * @param item The item to check
 * @returns True if the item exists in the cart, false otherwise
 */
function itemInCart(items: CartItem[], item: CartItem) {
  const cart = createSimpleItems(items);
  const itemToCheck = createSimpleItem(item);

  return cart.some(
    (i: SimpleItem) => JSON.stringify(i) === JSON.stringify(itemToCheck)
  );
}

// ==================== REDUCER ====================

export default function AddToCartReducer(
  state = initialState,
  action: cartActionType
) {
  switch (action.type) {
    case ActionType.ADD_TO_CART: {
      const { item } = action.payload;

      if (itemInCart(state.items, item)) {
        return {
          ...state,
          items: incrementItem(state.items, item),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...item, quantity: 1 } as CartItem],
      };
    }
    case ActionType.INCREMENT_ITEM: {
      const { item } = action.payload;
      console.log(state.items);

      return {
        ...state,
        items: incrementItem(state.items, item),
      };
    }
    case ActionType.DECREMENT_ITEM: {
      const { item } = action.payload;

      if (item.quantity === 1) {
        return {
          ...state,
          items: removeItem(state.items, item),
        };
      }

      return {
        ...state,
        items: decrementItem(state.items, item),
      };
    }
    default: {
      return state;
    }
  }
}
