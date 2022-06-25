import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Cart } from "../images/cart-white.svg";
import { Product } from "../interfaces";

class ItemCard extends React.Component<Product, { counter: number }> {
  render() {
    return (
      <Link to="/product" className="itemcard h-shadow">
        <img src={this.props.gallery[0]} alt="" />
        <div className="item-name">{this.props.name}</div>
        {this.props.prices && (
          <div className="item-price">{this.props.prices[0].amount}</div>
        )}
        <div className="cart-overlay">
          <Cart />
        </div>
      </Link>
    );
  }
}

export default ItemCard;
