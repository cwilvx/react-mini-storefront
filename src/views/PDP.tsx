import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  extractDefaultAttrs,
  fetchProduct,
  replaceAttrs,
  stripScripts,
} from "../composables";
import Price from "../components/Price";
import Attrs from "../components/Attributes";
import Gallery from "../components/PDP/Gallery";
import { addToCart } from "../store/actions";
import { getCartItemById } from "../store/selectors";
import { CartAttr, CartItem, Product } from "../interfaces";

interface State {
  product: Product;
  cartItem: CartItem;
  getCartItem: (pid: string) => CartItem | undefined;
}

interface Props {
  match: any;
  location: any;
  history: any;
  addToCart: (product: CartItem) => void;
  getCartItem: (pid: string) => CartItem | undefined;
}

function getItemIdfromUrl(location: Location) {
  const id = location.pathname.split("/")[2];
  return id;
}

const mapStateToProps = (store: any) => {
  function getCartItem(pid: string) {
    return getCartItemById(store, pid);
  }

  return {
    getCartItem,
  };
};

/**
 * The function to remove history listener
 * when this component unmounts
 */
let StopHistoryListener: Function;

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
      getCartItem: this.props.getCartItem,
    };
  }

  parseProductFromCart(pid: string) {
    const cartItem = this.props.getCartItem(pid);

    if (cartItem) {
      this.setState({
        cartItem: cartItem,
        product: cartItem,
      });
      return true;
    }

    return false;
  }

  getProduct(pid: string) {
    if (this.parseProductFromCart(pid)) return;

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
    this.setState({
      cartItem: {
        ...this.state.cartItem,
        selectedAttrs: replaceAttrs(this.state.cartItem.selectedAttrs, attr),
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
    let pid = getItemIdfromUrl(this.props.history.location);
    this.getProduct(pid);

    StopHistoryListener = this.props.history.listen((location: any) => {
      pid = getItemIdfromUrl(location);

      if (pid) {
        this.getProduct(pid);
      }
    });
  }

  componentWillUnmount() {
    StopHistoryListener();
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
            <div>
              <Price prices={this.state.product.prices} />
            </div>
          </div>
          <button
            className={`button bg-primary
            ${this.state.product.inStock ? "" : "btn-disabled"}`}
            onClick={this.handleAddToCart}
          >
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

export default connect(mapStateToProps, { addToCart })(
  withRouter(ProductDisplay)
);
