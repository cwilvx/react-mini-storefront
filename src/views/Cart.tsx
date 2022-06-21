import React from "react";
import CartPageItem from "../components/CartPageItem";
interface CartProps {}

interface CartState {}

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
          <CartPageItem />
          <CartPageItem />
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

export default Cart;
