import * as React from "react";
import { connect } from "react-redux";

import { addToCart } from "../store/actions";
import { getCartItemById } from "../store/selectors";

import Gallery from "../components/PDP/Gallery";
import {
  extractDefaultAttrs,
  fetchProduct,
  getItemIdfromUrl,
  stripScripts,
} from "../composables";
import { CartAttr, CartItem, Product } from "../interfaces";
import Attrs from "../components/PDP/Attrs";

interface State {
  product: Product;
  cartItem: CartItem;
}

interface Props {
  cartItem: CartItem | undefined;
  addToCart: (product: CartItem) => void;
}

let mapStatNotExecuted = true;

const mapStateToProps = (store: any) => {
  if (mapStatNotExecuted) {
    const id = getItemIdfromUrl();

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

class ProductDisplay extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      product: {} as Product,
      cartItem: {
        selectedAttrs: [],
        gallery: [],
        attributes: [],
        quantity: 0,
      } as CartItem,
    };
  }

  parseProductFromCart() {
    if (this.props.cartItem) {
      this.setState({
        cartItem: this.props.cartItem,
        product: this.props.cartItem,
      });
      return true;
    }

    return false;
  }

  getProduct(pid: string) {
    if (this.parseProductFromCart()) return;

    fetchProduct(pid).then((res) => {
      this.setState({
        product: res.data.product,
      });

      this.setDefaultCartItem(res.data.product);
    });
  }

  setDefaultCartItem(product: Product) {
    this.setState({
      cartItem: {
        ...this.state.product,
        selectedAttrs: extractDefaultAttrs(product.attributes),
        quantity: 0,
      },
    });
  }

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

  handleAddToCart = () => {
    this.props.addToCart(this.state.cartItem);
  };

  // ================ LIFECYCLE HOOKS =====================

  componentDidMount() {
    const pid = getItemIdfromUrl();
    this.getProduct(pid);
  }

  componentWillUnmount() {
    mapStatNotExecuted = true;
  }

  // ======================================================

  render() {
    return (
      <div id="productdisplay">
        {<Gallery images={this.state.product.gallery} />}
        <div className="details">
          <div className="name">
            <h2 className="company">{this.state.product.brand}</h2>
            <h2 className="light">{this.state.product.name}</h2>
          </div>
          <Attrs
            attrs={this.state.product.attributes}
            selectedAttrs={this.state.cartItem.selectedAttrs}
            selectAttr={this.selectAttr.bind(this)}
          />
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
