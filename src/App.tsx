import React from "react";
import "./scss/index.scss";
import ProductDisplay from "./views/PDP";
import ProductList from "./views/PLP";
import {
  BrowserRouter as Router,
  Switch as Routes,
  Route,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Cart from "./views/Cart";
import client from "./graph/getClient";
import NotFound from "./views/NotFound";
import { getCategories } from "./graph/queries";
import { Category } from "./interfaces";

interface AppState {
  categories: Category[];
  current_cat: string;
}

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      categories: [],
      current_cat: "",
    };
  }

  changeCat = (cat: string) => {
    console.log(cat);
    this.setState({ current_cat: cat });
  };

  async fetchCategories() {
    const res = await client.query({
      query: getCategories,
    });
    return res.data.categories;
  }

  getCategories() {
    this.fetchCategories().then((categories) => {
      this.setState({
        categories,
        current_cat: categories[0].name,
      });
    });

    setTimeout(() => {
      console.log(this.state.categories);
    }, 1000);
  }

  componentDidMount() {
    this.getCategories();
  }

  render() {
    return (
      <div>
        {this.state.categories && (
          <Router>
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
          </Router>
        )}
      </div>
    );
  }
}

export default App;
