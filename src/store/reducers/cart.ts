import { CartItem, storeAction } from "@/interfaces";
import { ActionType } from "../actionTypes";
import {
  decrementItem,
  incrementItem,
  itemInCart,
  removeItem,
} from "./methods";

const initialState = {
  items: [] as CartItem[],
};

export default function AddToCartReducer(
  state = initialState,
  action: storeAction
) {
  // @ts-ignore
  const { item } = action.payload || {};

  switch (action.type) {
    case ActionType.ADD_TO_CART: {
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
      return {
        ...state,
        items: incrementItem(state.items, item),
      };
    }
    case ActionType.DECREMENT_ITEM: {
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
