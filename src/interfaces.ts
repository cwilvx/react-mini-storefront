/**
 * This file defines the interfaces that are used by the application.
 */

import { ActionType } from "./store/actionTypes";

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
  label?: string;
  symbol?: string;
}

export interface AttributeSet {
  id?: string;
  name: string;
  type: string;
  items: Attribute[];
}

export interface Price {
  currency?: Currency;
  amount?: any;
}

export interface Attribute {
  displayValue: string;
  value: string;
  id?: string;
}

export interface CartAttr {
  attr_id: string;
  item_id: string;
}

export interface CartItem extends Product {
  selectedAttrs: CartAttr[];
  quantity: number;
}

export interface Cart {
  items: CartItem[];
}

export interface Store {
  cart: Cart;
}

export interface SimpleItem {
  id: string;
  attrs: CartAttr[];
}

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

export type cartActionType =
  | addToCartAction
  | incrementItemAction
  | decrementItemAction;
