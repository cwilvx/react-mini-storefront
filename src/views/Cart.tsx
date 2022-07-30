import React from "react";
import { connect } from "react-redux";

import { getCartItems } from "../store/selectors";

import { CartItem, Store } from "@/interfaces";
import CartPageItem from "../components/CartItem";

interface CartProps {
  items: CartItem[];
}

interface CartState {}

function mapStateToProps(store: Store) {
  return {
    items: getCartItems(store),
  };
}

class Cart extends React.Component<CartProps, CartState> {
  constructor(props: CartProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id="cart-page">
        <h2 className="h2">CART</h2>
        <div id="cart-items">
          {this.props.items.map((item) => {
            return (
              <CartPageItem
                key={JSON.stringify(item.selectedAttrs)}
                item={item}
              />
            );
          })}
        </div>
        <div id="metrics">
          <div className="tax">
            Tax 21%: <b>$ 42.00</b>
          </div>
          <div className="quantity">
            Quantity: <b>2</b>
          </div>
          <div className="total">
            Total: <b>$ 84.00</b>
          </div>
        </div>
        <button className="bg-primary">ORDER</button>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Cart);
