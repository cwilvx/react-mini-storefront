import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


import CartOverlay from "./Cart";
import CSwitcher from "./Currency/Overlay";
import { Category } from "../../interfaces";

import { ReactComponent as LogoSvg } from "../../assets/images/logo.svg";

interface Props {
  categories: Category[];
  changeCat: (cat: string) => void;
  currentCat: string | null;
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
                  <Link to={`/?cat=${cat.name}`} key={cat.name}>
                    <div
                      className={`nav-item ${
                        this.props.currentCat === cat.name ? "active" : ""
                      }`}
                      key={cat.name}
                    >
                      {cat.name}
                    </div>
                  </Link>
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
