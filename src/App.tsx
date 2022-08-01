import React from "react";
import { connect } from "react-redux";

import { Route, Switch as Routes, withRouter } from "react-router-dom";

import NavBar from "./components/Nav/NavBar";
import client from "./graph/getClient";
import { getCategories, getCurrency } from "./graph/queries";
import { Category, Currency, CurrencyStore } from "./interfaces";
import "./assets/scss/index.scss";
import { initializeCurrency } from "./store/actions";
import Cart from "./views/Cart";
import NotFound from "./views/NotFound";
import ProductDisplay from "./views/PDP";
import ProductList from "./views/PLP";

interface AppState {
  categories: Category[];
  current_cat: string | null;
}

interface AppProps {
  match: any;
  location: any;
  history: any;
  initializeCurrency: (state: CurrencyStore) => void;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      categories: [],
      current_cat: null,
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

  async fetchCurrency(): Promise<Currency[]> {
    const res = await client.query({
      query: getCurrency,
    });

    return res.data.currencies;
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
    if (location.pathname !== "/") return;
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

  getCurrency() {
    this.fetchCurrency().then((currencies: Currency[]) => {
      this.props.initializeCurrency({
        currencies: currencies,
        selected: currencies[0],
      });
    });
  }

  // ======================================================

  componentDidMount() {
    this.getCategories();
    this.getCurrency();
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
              currentCat={this.state.current_cat}
            />
            <div id="appcontent">
              <Routes>
                <Route exact path="/">
                  <ProductList cat_name={this.state.current_cat} />
                </Route>
                <Route path="/product/:id">
                  <ProductDisplay />
                </Route>
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

export default connect(null, { initializeCurrency })(withRouter(App));
