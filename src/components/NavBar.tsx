import React from "react";
import { ReactComponent as DropSvg } from "../images/drop.svg";
import { ReactComponent as LogoSvg } from "../images/logo.svg";
import { ReactComponent as DollarSvg } from "../images/dollar.svg";
import { ReactComponent as CartSvg } from "../images/cart.svg";

import CSwitcher from "./nav/Switcher";
import CartOverlay from "./nav/CartOverlay";
import { Link } from "react-router-dom";

interface Props {}

interface State {
  showCart: boolean;
}

class NavBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showCart: false,
    };
    this.toggleCart = this.toggleCart.bind(this);
    this.hideCart = this.hideCart.bind(this);
  }

  toggleCart() {
    this.setState({
      showCart: !this.state.showCart,
    });
  }

  hideCart = () => {
    this.setState({
      showCart: false,
    });
  };

  cartProps = {
    hideCart: this.hideCart,
  };
  render() {
    return (
      <div id="navbar">
        <div className="left">
          <div className="nav-item active">WOMEN</div>
          <div className="nav-item">MEN</div>
          <div className="nav-item">KIDS</div>
        </div>
        <div className="center">
          <Link to="/">
            <LogoSvg />
          </Link>
        </div>
        <div className="right">
          <div className="cswitcher">
            <DollarSvg />
            <div className="drop">
              <DropSvg />
            </div>
            <CSwitcher />
          </div>
          <div className="cart">
            <div
              onClick={() => {
                this.toggleCart();
              }}
            >
              <CartSvg />
              <div className="cart-count circular">
                <span>3</span>
              </div>
            </div>
            {this.state.showCart ? <CartOverlay {...this.cartProps} /> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
