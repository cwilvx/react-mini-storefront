import React from "react";
import { connect } from "react-redux";

import Overlay from "./Overlay";
import { CartItem as ItemType, Store } from "@/interfaces";
import { getCartItems, getCartTotal } from "../../../store/selectors";
import { getTotalItems } from "../../../composables";
import { ReactComponent as CartSvg } from "../../../assets/images/cart.svg";

interface CartProps {
  cartItems: ItemType[];
  totalPrice: string;
  itemCount: number;
}

interface CartState {
  showCart: boolean;
}

const mapStateToProps = (store: Store) => {
  const cartItems = getCartItems(store);
  const totalPrice = getCartTotal(store);
  const itemCount = getTotalItems(cartItems);

  return {
    cartItems: cartItems,
    itemCount: itemCount,
    totalPrice: totalPrice,
  };
};

class Cart extends React.Component<CartProps, CartState> {
  constructor(props: CartProps) {
    super(props);
    this.state = {
      showCart: false,
    };

    this.hideCart = this.hideCart.bind(this);
    this.showCart = this.showCart.bind(this);
    this.toggleCart = this.toggleCart.bind(this);
  }

  hideCart = () => {
    this.setState({
      showCart: false,
    });
  };

  showCart() {
    this.setState({
      showCart: true,
    });
  }

  toggleCart() {
    this.setState({
      showCart: !this.state.showCart,
    });
  }

  render() {
    return (
      <div className="cart">
        {this.state.showCart && <div className="overlay-bg"></div>}
        <div>
          <div onClick={this.toggleCart} className="toggle-handler">
            <CartSvg className="toggle-handler" />

            {this.props.cartItems.length > 0 && (
              <div className="cart-count circular toggle-handler">
                <span className="toggle-handler">{this.props.itemCount}</span>
              </div>
            )}
          </div>
          {this.state.showCart && (
            <Overlay
              cartItemCount={this.props.itemCount}
              cartItems={this.props.cartItems}
              cartPriceTotal={this.props.totalPrice}
              hideOverlay={this.hideCart}
            />
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Cart);
