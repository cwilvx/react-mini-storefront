import { ADD_TO_CART } from "../actionTypes";
import { CartAttr, CartItem } from "./../../interfaces";

const initialState = {
  items: [] as CartItem[],
};

interface cartAction {
  type: string;
  payload: {
    item: CartItem;
  };
}

interface SimpleItem {
  id: string;
  attrs: CartAttr[];
}

function itemInCart(items: CartItem[], item: CartItem) {
  const cart = items.map(
    (i: CartItem) =>
      ({
        id: i.id,
        attrs: i.selectedAttrs,
      } as SimpleItem)
  );
  const itemToCheck = {
    id: item.id,
    attrs: item.selectedAttrs,
  } as SimpleItem;

  return cart.some(
    (i: SimpleItem) => i.id === itemToCheck.id && i.attrs === itemToCheck.attrs
  );
}

function incrementItem(items: CartItem[], item: CartItem) {
  return items.map((i: CartItem) => {
    if (i.id === item.id && i.selectedAttrs === item.selectedAttrs) {
      return { ...i, quantity: i.quantity + 1 };
    }
    return i;
  });
}

export default function cartReducer(state = initialState, action: cartAction) {
  switch (action.type) {
    case ADD_TO_CART: {
      const { item } = action.payload;

      if (itemInCart(state.items, item)) {

        return {
          ...state,
          items: incrementItem(state.items, item),
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          { ...item, quantity: 1 } as CartItem,
        ],
      };
    }
    default: {
      return state;
    }
  }
}
