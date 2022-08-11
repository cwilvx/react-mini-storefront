import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Price from "../components/Price";
import { addToCart } from "../store/actions";
import { CartItem, Product } from "../interfaces";
import { extractDefaultAttrs, fetchProduct } from "../composables";

import { ReactComponent as Cart } from "../assets/images/cart-white.svg";

interface Props {
  product: Product;
  addToCart: (product: CartItem) => void;
}

class ItemCard extends React.Component<Props, {}> {
  /**
   * Adds a product to the cart with the default attributes
   * @param e Mouse event
   */
  handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!this.props.product.id) return;

    // fetch product and select default attributes
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
        className={`itemcard h-shadow ${
          !this.props.product.inStock ? "out-of-stock" : ""
        }`}
      >
        <div className="image">
          <img src={this.props.product.gallery[0]} alt="" />
          {!this.props.product.inStock && <div className="img-overlay"></div>}
        </div>

        <div className="item-name">
          {this.props.product.brand + " " + this.props.product.name}
          {}
        </div>
        <Price prices={this.props.product.prices} />
        <div className="add-to-cart-btn" onClick={this.handleAddToCart}>
          <Cart />
        </div>
      </Link>
    );
  }
}

export default connect(null, { addToCart })(ItemCard);
