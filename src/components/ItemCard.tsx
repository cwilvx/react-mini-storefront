import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { addToCart } from "../store/actions";

import { extractDefaultAttrs, fetchProduct } from "../composables";
import { CartItem, Product } from "../interfaces";
import { ReactComponent as Cart } from "../images/cart-white.svg";

interface Props {
  product: Product;
  addToCart: (product: CartItem) => void;
}

class ItemCard extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!this.props.product.id) return;

    fetchProduct(this.props.product.id).then((res) => {
      const prod = res.data.product as Product;
      const cartItem = {
        ...prod,
        selectedAttrs: extractDefaultAttrs(prod.attributes),
        quantity: 0,
      } as CartItem;
      this.props.addToCart(cartItem);
    });
  };
  render() {
    return (
      <Link
        to={`/product/${this.props.product.id}`}
        className="itemcard h-shadow"
      >
        <img src={this.props.product.gallery[0]} alt="" />
        <div className="item-name">{this.props.product.name}</div>
        {this.props.product.prices && (
          <div className="item-price">
            {this.props.product.prices[0].amount}
          </div>
        )}
        <div className="cart-overlay" onClick={this.handleAddToCart}>
          <Cart />
        </div>
      </Link>
    );
  }
}

export default connect(null, { addToCart })(ItemCard);
