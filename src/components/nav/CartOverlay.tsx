import React from "react";
import CartItem from "./CartItem";

interface CartProps {
  hideCart: () => void;
}

interface CartState {}

class Cart extends React.Component<CartProps, CartState> {
  constructor(props: CartProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id="cart-overlay">
        <div
          className="background"
          onClick={() => {
            this.props.hideCart();
          }}
        ></div>
        <div className="content">
          <h3 id="bag-header">
            My bag, <span id="bag-count">3 items</span>
          </h3>
          <div className="cart-items">
            <CartItem />
          </div>
          <div className="total">
            <div className="text">Total</div>
            <div className="total-price">$ 50.00</div>
          </div>
          <div className="buttons">
            <button className="view-bag button">VIEW BAG</button>
            <button className="bg-primary button">CHECK OUT</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
