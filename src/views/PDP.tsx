import { createBrowserHistory } from "history";
import * as React from "react";
import { connect } from "react-redux";

import client from "../graph/getClient";
import { getProduct } from "../graph/queries";
import { AttributeSet, CartAttr, CartItem, Product } from "../interfaces";

import { addToCart } from "../store/actions";
import { getCartItemById } from "../store/selectors";

interface State {
  product: Product;
  currentImage: number;
  cartItem: CartItem;
}

interface Props {
  cartItem: CartItem | undefined;
  addToCart: (product: CartItem) => void;
}

function getIdfromUrl() {
  const location = createBrowserHistory().location;
  const url = location.pathname.split("/")[2];
  return url;
}

let mapStatNotExecuted = true;

const mapStateToProps = (store: any) => {
  console.log(store.cart.items);
  if (mapStatNotExecuted) {
    const id = getIdfromUrl();

    mapStatNotExecuted = false;

    return {
      cartItem: getCartItemById(store, id),
    };
  }

  return {};
};

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
      cartItem: {
        selectedAttrs: [],
        gallery: [],
        attributes: [],
        quantity: 0,
      } as CartItem,
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
        });

        return res.data.product as Product;
      })
      .then((product) => {
        this.setDefaultCartItem(product);
      });
  }

  setDefaultCartItem(product: Product) {
    if (this.props.cartItem) {
      this.setState({
        cartItem: this.props.cartItem,
      });
      return;
    }

    this.setState({
      cartItem: {
        ...this.state.product,
        description: null,
        selectedAttrs: this.extractDefaultAttrs(product.attributes),
        quantity: 0,
      },
    });
  }

  // attrExists(attr: CartAttr) {
  //   return this.state.cartItem.attributes.some(
  //     (a: CartAttr) => a.attr_id === attr.attr_id
  //   );
  // }

  replaceAttr(attr: CartAttr) {
    console.log("repl");
    this.setState({
      cartItem: {
        ...this.state.cartItem,
        selectedAttrs: this.state.cartItem.selectedAttrs.map((a: CartAttr) => {
          if (a.attr_id === attr.attr_id) {
            return attr;
          }

          return a;
        }),
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

    this.replaceAttr(attr);
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
    // console.log(this.state.cartItem);
    this.props.addToCart(this.state.cartItem);
  };

  // ================ LIFECYCLE HOOKS =====================

  componentDidMount() {
    const pid = getIdfromUrl();
    this.fetchProduct(pid);
  }

  componentWillUnmount() {
    mapStatNotExecuted = true;
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
    if (!this.props.cartItem) return;

    if (prevProps.cartItem !== this.props.cartItem) {
      this.setState({
        cartItem: this.props.cartItem,
      });
    }
  }

  // ======================================================

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
                      <div className="is_swatch">
                        {attribute.items.map((item) => {
                          return (
                            <div
                              key={item.id}
                              className={
                                this.state.cartItem.selectedAttrs.some(
                                  (a: CartAttr) =>
                                    a.item_id === item.id &&
                                    a.attr_id === attribute.id
                                )
                                  ? "selected"
                                  : ""
                              }
                            >
                              <button
                                className="color"
                                style={{ backgroundColor: item.value }}
                                onClick={() =>
                                  this.selectAttr(attribute.id, item.id)
                                }
                              ></button>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="other-attrs">
                        {attribute.items.map((item) => {
                          return (
                            <button
                              className={
                                this.state.cartItem.selectedAttrs.some(
                                  (a: CartAttr) =>
                                    a.item_id === item.id &&
                                    a.attr_id === attribute.id
                                )
                                  ? "selected"
                                  : ""
                              }
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

export default connect(mapStateToProps, { addToCart })(ProductDisplay);
