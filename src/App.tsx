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
import { gql } from "@apollo/client";
import client from "./graph/getClient";
import NotFound from "./views/NotFound";

class App extends React.Component<{}, {}> {
  fetchRates() {
    client
      .query({
        query: gql`
          query getSinf {
            categories {
              name
              products {
                name
                id
              }
            }
          }
        `,
      })
      .then((result) => console.log(result.data));
  }

  render() {
    return (
      <Router>
        <div id="app">
          <NavBar />
          <div id="appcontent">
            <Routes>
              <Route exact path="/" component={ProductList} />
              <Route path="/product/:id" component={ProductDisplay} />
              <Route path="/cart" component={Cart} />
              <Route path="*" component={NotFound} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
