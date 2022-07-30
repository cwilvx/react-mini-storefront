import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCartItems, getCartItemsCount } from "../../store/selectors";
import { CartItem as ItemType } from "@/interfaces";
import CartItem from "../CartItem";

interface CartProps {
  hideCart: () => void;
  count: number;
  cartItems: ItemType[];
}

const mapStateToProps = (store: any) => {
  console.log(store);
  return {
    count: getCartItemsCount(store),
    cartItems: getCartItems(store),
  };
};

class Cart extends React.Component<CartProps, {}> {
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
            My bag, <span id="bag-count">{this.props.count} items</span>
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
              <div className="total-price">$ 50.00</div>
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
