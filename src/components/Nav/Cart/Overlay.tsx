import React from "react";
import { Link } from "react-router-dom";

import CartItem from "../../CartItem";
import { CartItem as ItemType } from "../../../interfaces";
import { handleClickOutside } from "../../../composables";

interface OverlayProps {
  hideOverlay: () => void;
  cartItemCount: number;
  cartPriceTotal: string;
  cartItems: ItemType[];
}

class Overlay extends React.Component<OverlayProps, {}> {
  constructor(props: OverlayProps) {
    super(props);
    this.onClickOutside = this.onClickOutside.bind(this);
  }

  wrapperRef: React.RefObject<HTMLDivElement> = React.createRef();

  componentDidMount() {
    document.addEventListener("mousedown", this.onClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.onClickOutside);
  }

  onClickOutside(e: MouseEvent) {
    handleClickOutside(this.wrapperRef, e, this.props.hideOverlay);
  }
  render() {
    return (
      <div id="cart-overlay" ref={this.wrapperRef}>
        <div className="content">
          <h3 id="bag-header">
            My bag, <span id="bag-count">{this.props.cartItemCount} items</span>
          </h3>
          <div className="cart-items">
            {this.props.cartItems.map((item) => {
              return (
                <div
                  className="cart-overlay-item"
                  key={`${item.id + JSON.stringify(item.selectedAttrs)}`}
                >
                  <CartItem item={item} hideCart={this.props.hideOverlay} />
                </div>
              );
            })}
          </div>
          <div className="bottom">
            <div className="total">
              <div className="text">Total</div>
              <div className="total-price">{this.props.cartPriceTotal}</div>
            </div>
            <div className="buttons" onClick={this.props.hideOverlay}>
              <Link to="/cart">
                <button className="view-bag button">VIEW BAG</button>
              </Link>

              <button className="bg-primary button">CHECK OUT</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Overlay;
