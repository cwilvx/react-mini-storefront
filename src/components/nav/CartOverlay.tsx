import React from "react";
import { ReactComponent as PlusSvg } from "../../images/plus.svg";
import { ReactComponent as MinusSvg } from "../../images/minus.svg";

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
          onClick={(e) => {
            e.stopPropagation();
            this.props.hideCart();
          }}
        ></div>
        <div className="content">
          <h3 id="bag-header">
            My bag, <span id="bag-count">3 items</span>
          </h3>
          <div className="cart-item">
            <div className="left">
              <h3 className="item-name">Apollo Running Short</h3>
              <div className="price">$ 50.00</div>

              <div className="sizes">
                <div className="h">Size:</div>
                <div className="content">
                  <div className="size">XS</div>
                  <div className="size">S</div>
                  <div className="size selected-size">M</div>
                  <div className="size">L</div>
                  <div className="size">XL</div>
                </div>
              </div>
              <div className="colors">
                <div className="h">Color:</div>
                <div className="content">
                  <div className="outline">
                    <div className="color"></div>
                  </div>
                  <div className="outline">
                    <div className="color"></div>
                  </div>
                  <div className="outline">
                    <div className="color"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="center">
              <div className="plus">
                <PlusSvg />
              </div>
              <div className="itemcount">0</div>
              <div className="minus">
                <MinusSvg />
              </div>
            </div>
            <div className="right">
              <img src="https://picsum.photos/930/900" alt="" />
            </div>
          </div>
          <div className="total">
            <div className="text">Total</div>
            <div className="total-price">$ 50.00</div>
          </div>
          <div className="buttons">
            <div className="view-bag">VIEW BAG</div>
            <div className="checkout">CHECK OUT</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
