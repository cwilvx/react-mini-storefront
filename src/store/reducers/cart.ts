import { CartItem, storeAction } from "@/interfaces";
import { ActionType } from "../actionTypes";
import {
  decrementItem, incrementItem, itemInCart, removeItem
} from "./methods";

const initialState = {
  items: [] as CartItem[],
};

export default function AddToCartReducer(
  state = initialState,
  action: storeAction
) {
  const item = action.payload;

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
