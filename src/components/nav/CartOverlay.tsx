import { getTotalItems, handleClickOutside } from "../../composables";
import { CartItem as ItemType, Store } from "@/interfaces";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCartItems, getCartTotal } from "../../store/selectors";
import CartItem from "../CartItem";

interface CartProps {
  hideCart: () => void;
  cartItems: ItemType[];
  totalPrice: string;
}

const mapStateToProps = (store: Store) => {
  return {
    cartItems: getCartItems(store),
    totalPrice: getCartTotal(store),
  };
};

class Cart extends React.Component<CartProps, {}> {
  constructor(props: CartProps) {
    super(props);
    this.wrapperRef = React.createRef();
    this.onClickOutside = this.onClickOutside.bind(this);
  }

  wrapperRef: React.RefObject<HTMLDivElement>;

  componentDidMount() {
    document.addEventListener("mousedown", this.onClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.onClickOutside);
  }

  onClickOutside(e: MouseEvent) {
    const hideCart = () => {
      this.props.hideCart();
    };

    handleClickOutside(this, e, hideCart);
  }

  render() {
    return (
      <div id="cart-overlay">
        <div className="background"></div>
        <div className="content" ref={this.wrapperRef}>
          <h3 id="bag-header">
            My bag,{" "}
            <span id="bag-count">
              {getTotalItems(this.props.cartItems)} items
            </span>
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
              <div className="total-price">{this.props.totalPrice}</div>
            </div>
            <div
              className="buttons"
              onClick={() => {
                this.props.hideCart();
              }}
            >
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

export default connect(mapStateToProps)(Cart);
