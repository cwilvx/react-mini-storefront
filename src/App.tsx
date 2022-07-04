import React from "react";
import { Switch as Routes, Route, withRouter } from "react-router-dom";

import "./scss/index.scss";
import ProductDisplay from "./views/PDP";
import ProductList from "./views/PLP";
import NavBar from "./components/NavBar";
import Cart from "./views/Cart";
import client from "./graph/getClient";
import NotFound from "./views/NotFound";
import { getCategories } from "./graph/queries";
import { Category } from "./interfaces";
interface AppState {
  categories: Category[];
  current_cat: string | null;
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
    };
  }

  changeCat = (cat: string) => {
    this.setState({ current_cat: cat });
  };

  async fetchCategories() {
    const res = await client.query({
      query: getCategories,
    });
    return res.data.categories;
  }

  handleCat(location: any) {
    const cat = location.search.split("=")[1];
    this.changeCat(cat ? cat : this.state.categories[0].name);
  }

  getCategories() {
    this.fetchCategories().then((categories) => {
      this.setState(
        {
          categories,
        },
        () => this.handleCat(this.props.location)
      );
    });
  }

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
