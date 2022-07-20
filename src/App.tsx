import React from "react";
import { Route, Switch as Routes, withRouter } from "react-router-dom";

import NavBar from "./components/NavBar";
import client from "./graph/getClient";
import { getCategories } from "./graph/queries";
import { cartItem, Category } from "./interfaces";
import "./scss/index.scss";
import Cart from "./views/Cart";
import NotFound from "./views/NotFound";
import ProductDisplay from "./views/PDP";
import ProductList from "./views/PLP";

interface AppState {
  categories: Category[];
  current_cat: string | null;
  cart: cartItem[];
}

interface AppProps {
  match: any;
  location: any;
  history: any;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      categories: [],
      current_cat: null,
      cart: [],
    };
  }

  // ================ CATEGORY METHODS =================

  /**
   * Fetches categories from the GraphQL server
   * @returns {Promise<Category[]>}
   */
  async fetchCategories(): Promise<Category[]> {
    const res = await client.query({
      query: getCategories,
    });

    return res.data.categories as Category[];
  }

  /**
   * Sets a new category in the state
   * @param {string} cat the category to set as the current category
   */
  changeCat = (cat: string): void => {
    this.setState({ current_cat: cat });
  };

  /**
   * Sets the url `?cat=` param as the current category
   * @param location the location of the current page
   */
  handleCat(location: any): void {
    const cat = location.search.split("=")[1];
    this.changeCat(cat ? cat : this.state.categories[0].name);
  }

  /**
   * Fetches categories from the GraphQL server and sets them in the state
   */
  getCategories(): void {
    this.fetchCategories().then((categories) => {
      this.setState(
        {
          categories,
        },
        () => this.handleCat(this.props.location)
      );
    });
  }

  // ================ CART METHODS =================

  /**
   * Sets the cart in the state
   * @param {cartItem[]} cart the cart to set in the state
   */
  setCart = (cart: cartItem[]): void => {
    this.setState({ cart });
  };

  /**
   * Adds an item to the cart
   * @param {cartItem} item the item to add to the cart
   */
  addCartItem = (item: cartItem): void => {
    if (this.itemInCart(item.id)) {
      this.replaceCartItem(item);
    }

    this.setCart([...this.state.cart, item]);
  };

  /**
   * Replaces an item in the cart
   * @param {cartItem} item the item to replace in the cart
   */
  replaceCartItem = (item: cartItem): void => {
    const newCart = this.state.cart.filter((i) => i.id !== item.id);
    this.setCart([...newCart, item]);
  };

  /**
   * Removes an item from the cart
   * @param {cartItem} item the item to remove from the cart
   */
  removeCartItem = (item: cartItem): void => {
    this.setCart(this.state.cart.filter((i) => i.id !== item.id));
  };

  /**
   * Checks if an item is in the cart using the item's id
   * @param item_id the id of the item to check for in the cart
   * @returns {boolean} true if the item is in the cart, false otherwise
   */
  itemInCart = (item_id: string): boolean => {
    return this.state.cart.some((i) => i.id === item_id);
  };

  // ================================================

  componentDidMount() {
    this.getCategories();
    this.props.history.listen((location: any) => {
      this.handleCat(location);
    });
  }

  render() {
    return (
      <div>
        {this.state.categories && (
          <div id="app">
            <NavBar
              categories={this.state.categories}
              changeCat={this.changeCat}
            />
            <div id="appcontent">
              <Routes>
                <Route exact path="/">
                  <ProductList cat_name={this.state.current_cat} />
                </Route>
                <Route path="/product/:id" component={ProductDisplay} />
                <Route path="/cart" component={Cart} />
                <Route path="*" component={NotFound} />
              </Routes>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(App);
