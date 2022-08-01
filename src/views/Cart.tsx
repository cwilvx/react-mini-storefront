import React from "react";
import { connect } from "react-redux";

import {
  calcTax,
  getTotalItems,
  getTotalPrice,
  wrapCurrency,
} from "../composables";
import CartItem from "../components/CartItem";
import { getCartItems } from "../store/selectors";
import { CartItem as Item, Store } from "@/interfaces";

interface CartProps {
  items: Item[];
  totalPrice: string;
  tax: string;
}

function mapStateToProps(store: Store) {
  const currency = store.currency.selected;
  const items = getCartItems(store);
  const price = getTotalPrice(items, currency);
  const tax = calcTax(price, 21);

  return {
    items: items,
    totalPrice: wrapCurrency(price, currency),
    tax: wrapCurrency(tax, currency),
  };
}

class Cart extends React.Component<CartProps, {}> {
  render() {
    return (
      <div id="cart-page">
        <h2 className="h2">CART</h2>
        <div id="cart-items">
          {this.props.items.map((item) => {
            return (
              <CartItem key={JSON.stringify(item.selectedAttrs)} item={item} />
            );
          })}
        </div>
        <div id="metrics">
          <div className="tax">
            Tax 21%: <b>{this.props.tax}</b>
          </div>
          <div className="quantity">
            Quantity: <b>{getTotalItems(this.props.items)}</b>
          </div>
          <div className="total">
            Total: <b>{this.props.totalPrice}</b>
          </div>
        </div>
        <button className="bg-primary">ORDER</button>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Cart);

// Where I've left off:
// ============================================================
// Find a way to get tax (with selected currency symbol)
// Organize functions to avoid repetition
// Organize imports
