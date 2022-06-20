import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Cart } from "../images/cart-white.svg";

interface ItemCardProps {
  name: string;
  price: number;
  image: string;
}

class ItemCard extends React.Component<ItemCardProps, { counter: number }> {
  render() {
    return (
      <Link to="/product" className="itemcard h-shadow">
        <img src={this.props.image} alt="" />
        <div className="item-name">{this.props.name}</div>
        <div className="item-price">{this.props.price}</div>
        <div className="cart-overlay">
          <Cart />
        </div>
      </Link>
    );
  }
}

export default ItemCard;
