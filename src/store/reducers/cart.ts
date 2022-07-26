import { cartItem } from "./../../interfaces";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actionTypes";

const initialState = {
  items: [] as cartItem[],
};

interface cartAction {
  type: string;
  payload: {
    item: cartItem;
  };
}

function itemInCart(items: cartItem[], item_id: string) {
  return items.some((i: cartItem) => i.id === item_id);
}

function replaceItem(items: cartItem[], item: cartItem) {
  return items.map((i: cartItem) => (i.id === item.id ? item : i));
}

export default function cartReducer(state = initialState, action: cartAction) {
  switch (action.type) {
    case ADD_TO_CART: {
      const { item } = action.payload;
      console.log(state.items);

      if (itemInCart(state.items, item.id)) {
        console.log("item already in cart");

        return {
          ...state,
          items: replaceItem(state.items, item),
        };
      }

      return {
        ...state,
        items: [...state.items, item],
      };
    }
    default: {
      return state;
    }
  }
}
