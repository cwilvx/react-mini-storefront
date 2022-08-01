/**
 * This file defines the interfaces that are used by the application.
 */

import { ActionType } from "./store/actionTypes";

// ======= SERVER =======

export interface Category {
  name: string;
  products: Product[];
}

export interface Product {
  id?: string;
  name?: string;
  inStock?: Boolean;
  gallery: string[];
  description?: string | null;
  category?: string;
  attributes: AttributeSet[];
  prices?: Price[];
  brand?: string;
}

export interface Currency {
  label: string;
  symbol: string;
}

export interface AttributeSet {
  id?: string;
  name: string;
  type: string;
  items: Attribute[];
}

export interface Price {
  currency?: Currency;
  amount?: number;
}

export interface Attribute {
  displayValue: string;
  value: string;
  id?: string;
}

// ======= CART =======

export interface CartAttr {
  attr_id: string;
  item_id: string;
}

export interface CartItem extends Product {
  selectedAttrs: CartAttr[];
  quantity: number;
}

export interface SimpleItem {
  id: string;
  attrs: CartAttr[];
}

// ======= STORES =======

export interface CartStore {
  items: CartItem[];
}

export interface CurrencyStore {
  currencies: Currency[];
  selected: Currency;
}

export interface Store {
  cart: CartStore;
  currency: CurrencyStore;
}

// ======= STORE ACTIONS =======

export interface addToCartAction {
  type: ActionType.ADD_TO_CART;
  payload: {
    item: CartItem;
  };
}

export interface incrementItemAction {
  type: ActionType.INCREMENT_ITEM;
  payload: {
    item: CartItem;
  };
}

export interface decrementItemAction {
  type: ActionType.DECREMENT_ITEM;
  payload: {
    item: CartItem;
  };
}

export interface initializeCurrencyAction {
  type: ActionType.INITIALIZE_STORE;
  payload: {
    store: CurrencyStore;
  };
}

export interface setcurrencyAction {
  type: ActionType.SET_CURRENCY;
  payload: {
    currency: string;
  };
}

export type storeAction =
  | addToCartAction
  | incrementItemAction
  | decrementItemAction
  | initializeCurrencyAction
  | setcurrencyAction;
// TODO: Group these interfaces
