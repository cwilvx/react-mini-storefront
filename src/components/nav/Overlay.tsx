import { CartItem as ItemType } from "../../interfaces";
import React from "react";
import CartItem from "../CartItem";
import { Link } from "react-router-dom";
import { handleClickOutside } from "../../composables";

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
    console.log(this.wrapperRef);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.onClickOutside);
  }

  onClickOutside(e: MouseEvent) {
    const hideCart = () => {
      this.props.hideOverlay();
    };

    handleClickOutside(this.wrapperRef, e, hideCart);
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
                  <CartItem item={item} />
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
