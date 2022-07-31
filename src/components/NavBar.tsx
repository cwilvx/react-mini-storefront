import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { ReactComponent as LogoSvg } from "../images/logo.svg";

import { Category } from "../interfaces";
import CartOverlay from "./nav/CartOverlay";
import CSwitcher from "./nav/Currency";

interface Props {
  categories: Category[];
  changeCat: (cat: string) => void;
}

interface State {
  categories: Category[];
}

class NavBar extends React.Component<Props, State> {
  render() {
    return (
      <div id="navbar">
        <div id="actual-nav">
          <div className="left">
            {this.props.categories &&
              this.props.categories.map((cat) => {
                return (
                  <div className="nav-item" key={cat.name}>
                    <Link to={`/?cat=${cat.name}`}>{cat.name}</Link>
                  </div>
                );
              })}
          </div>
          <div className="center">
            <Link to="/">
              <LogoSvg />
            </Link>
          </div>
          <div className="right">
            <CSwitcher />
            <div className="cart">
              <CartOverlay />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(NavBar);
