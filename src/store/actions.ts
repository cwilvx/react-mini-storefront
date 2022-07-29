import { CartItem } from "@/interfaces";
import { ActionType } from "./actionTypes";

export const addToCart = (item: CartItem) => {
  return { type: ActionType.ADD_TO_CART, payload: { item } };
};

export const incrementQuantity = (item: CartItem) => {
  return { type: ActionType.INCREMENT_ITEM, payload: { item } };
};

export const decrementQuantity = (item: CartItem) => {
  return { type: ActionType.DECREMENT_ITEM, payload: { item } };
};
