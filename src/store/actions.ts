import { CartItem, CurrencyStore } from "@/interfaces";
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

export const initializeCurrency = (store: CurrencyStore) => {
  return { type: ActionType.INITIALIZE_STORE, payload: { store } };
};

export const setCurrency = (currency: string) => {
  return { type: ActionType.SET_CURRENCY, payload: { currency } };
};
