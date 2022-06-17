import React from "react";
import { ReactComponent as Logo } from "../images/logo.svg";
import { ReactComponent as Dollar } from "../images/dollar.svg";
import { ReactComponent as Cart } from "../images/cart.svg";
import { ReactComponent as Drop } from "../images/drop.svg";

interface Props {}

interface State {}

class NavBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id="navbar">
        <div className="left">
          <div className="nav-item">WOMEN</div>
          <div className="nav-item">MEN</div>
          <div className="nav-item">KIDS</div>
        </div>
        <div className="center">
          <Logo />
        </div>
        <div className="right">
          <div className="cswitcher">
            <Dollar />
            <div className="drop">
              <Drop />
            </div>
            <div className="dropdown">
              <div className="d-item">$ USD</div>
              <div className="d-item">€ EUR</div>
              <div className="d-item">¥ JPY</div>
            </div>
          </div>
          <div className="cart">
            <Cart />
            <div className="cart-count circular">
              <span>3</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
