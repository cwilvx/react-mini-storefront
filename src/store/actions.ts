import { CartItem } from "@/interfaces";
import { ADD_TO_CART } from "./actionTypes";

export const addToCart = (item: CartItem) => {
  return { type: ADD_TO_CART, payload: { item } };
};
