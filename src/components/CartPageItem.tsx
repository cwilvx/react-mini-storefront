import React from "react";
import { ReactComponent as PlusSvg } from "../images/plus.svg";
import { ReactComponent as MinusSvg } from "../images/minus.svg";
import { ReactComponent as ArrowSvg } from "../images/arrow.svg";

interface CartPageItemProps {}

interface CartPageItemState {}

class CartPageItem extends React.Component<
  CartPageItemProps,
  CartPageItemState
> {
  constructor(props: CartPageItemProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="cart-item cart-page-item">
        <div className="left">
          <h2>Apollo</h2>
          <h2 className="item-name">Running Short</h2>
          <div className="price">$ 50.00</div>
          <div className="sizes">
            <div className="h">SIZE:</div>
            <div className="cart-content">
              <button>XL</button>
              <button>L</button>
              <button className="selected-size">M</button>
              <button>S</button>
              <button>XS</button>
            </div>
          </div>
          <div className="colors">
            <div className="h">COLOR:</div>
            <div className="cart-content">
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
          <div className="img-buttons">
            <div className="next">
              <ArrowSvg />
            </div>
            <div className="prev">
              <ArrowSvg />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartPageItem;
