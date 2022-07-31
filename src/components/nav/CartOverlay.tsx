import { getTotalItems, handleClickOutside } from "../../composables";
import { CartItem as ItemType, Store } from "@/interfaces";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCartItems, getCartTotal } from "../../store/selectors";
import CartItem from "../CartItem";
import { ReactComponent as CartSvg } from "../../images/cart.svg";
import Overlay from "./Overlay";

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

  overlayProps = {
    hideOverlay: this.hideCart,
    cartItemCount: this.props.itemCount,
    cartPriceTotal: this.props.totalPrice,
    cartItems: this.props.cartItems,
  };

  render() {
    return (
      <div className="cart">
        {this.state.showCart && <div className="overlay-bg"></div>}
        <div>
          <div onClick={this.toggleCart}>
            <CartSvg />

            {this.props.cartItems.length > 0 && (
              <div className="cart-count circular">
                <span>{this.props.itemCount}</span>
              </div>
            )}
          </div>
          {this.state.showCart && <Overlay {...this.overlayProps} />}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Cart);
