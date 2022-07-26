import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import client from "../graph/getClient";
import { getProduct } from "../graph/queries";
import { AttributeSet, CartAttr, cartItem, Product } from "../interfaces";

import { addToCart } from "../store/actions";

interface State {
  product: Product;
  currentImage: number;
  cartItem: cartItem;
}

interface Props {
  match: any;
  location: any;
  history: any;
  addToCart: (product: cartItem) => void;
}

/**
 * Strips Javascript from a string
 * @param {string} html HTML string to be parsed
 * @returns {string} HTML string with stripped scripts
 */
function stripScripts(html: string): string {
  return html.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    ""
  );
}

class ProductDisplay extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      product: {} as Product,
      currentImage: 0,
      cartItem: {} as cartItem,
    };
  }

  fetchProduct(pid: string) {
    client
      .query({
        query: getProduct(pid),
      })
      .then((res) => {
        this.setState({
          product: res.data.product,
          cartItem: {
            id: res.data.product.id,
            attributes: this.extractDefaultAttrs(res.data.product.attributes),
          },
        });
      });
  }

  attrExists(attr: CartAttr) {
    return this.state.cartItem.attributes.some(
      (a: CartAttr) => a.attr_id == attr.attr_id
    );
  }

  replaceAttr(attr: CartAttr) {
    this.setState({
      cartItem: {
        ...this.state.cartItem,
        attributes: this.state.cartItem.attributes.map((a: CartAttr) =>
          a.attr_id === attr.attr_id ? attr : a
        ),
      },
    });
  }

  /**
   * Selects a given attribute. Replaces attributes with the same id.
   * @param attr_id The id of the clicked attribute.
   * @param item_id The id of the clicked attribute option.
   */
  selectAttr(attr_id: string | undefined, item_id: string | undefined) {
    const attr = {
      attr_id,
      item_id,
    } as CartAttr;

    if (this.attrExists(attr)) {
      console.log("somehign");
      this.replaceAttr(attr);
    }

    this.setState({
      cartItem: {
        ...this.state.cartItem,
        attributes: [...this.state.cartItem.attributes, attr],
      },
    });
  }

  extractDefaultAttrs(attrs: AttributeSet[]) {
    return attrs.map((attr) => {
      return {
        attr_id: attr.id,
        item_id: attr.items[0].id,
      } as CartAttr;
    });
  }

  handleAddToCart = () => {
    this.props.addToCart(this.state.cartItem);
  };

  componentDidMount() {
    const pid = this.props.match.params.id as string;
    this.fetchProduct(pid);
  }

  render() {
    return (
      <div id="productdisplay">
        <div className="thumbs">
          {this.state.product.gallery &&
            this.state.product.gallery.map((image, index) => {
              return (
                <div
                  className="thumb"
                  key={image}
                  onClick={() => this.setState({ currentImage: index })}
                >
                  <img src={image} alt="thumbnail preview" />
                </div>
              );
            })}
        </div>
        <div className="preview">
          <img
            src={
              this.state.product.gallery &&
              this.state.product.gallery[this.state.currentImage]
            }
            alt="main preview"
          />
        </div>
        <div className="details">
          <div className="name">
            <h2 className="company">{this.state.product.brand}</h2>
            <h2 className="light">{this.state.product.name}</h2>
          </div>
          <div className="attributes">
            {this.state.product.attributes &&
              this.state.product.attributes.map((attribute) => {
                return (
                  <div key={attribute.id}>
                    <h4 className="attr-h">{attribute.name}</h4>
                    {attribute.type === "swatch" ? (
                      <div className="attr-list is_swatch">
                        {attribute.items.map((item) => {
                          return (
                            <div className="selected" key={item.id}>
                              <button
                                className="color"
                                style={{ backgroundColor: item.value }}
                              ></button>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="attr-list">
                        {attribute.items.map((item) => {
                          return (
                            <button
                              key={item.id}
                              onClick={() =>
                                this.selectAttr(attribute.id, item.id)
                              }
                            >
                              {item.value}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
          <div className="price bold">
            <div className="h">PRICE:</div>
            <div>$ 50</div>
          </div>
          <button className="button bg-primary" onClick={this.handleAddToCart}>
            ADD TO CART
          </button>
          {this.state.product.description && (
            <div
              className="info"
              dangerouslySetInnerHTML={{
                __html: stripScripts(this.state.product.description as string),
              }}
            ></div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(null, { addToCart })(withRouter(ProductDisplay));
