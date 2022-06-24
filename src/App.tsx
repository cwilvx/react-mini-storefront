import React from "react";
import "./scss/index.scss";
import ProductDisplay from "./views/PDP";
import ProductList from "./views/PLP";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./views/NotFound";
import NavBar from "./components/NavBar";
import Cart from "./views/Cart";
import { gql } from "@apollo/client";
import client from "./graph/getClient";

class App extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);
    this.state = {
      rates: [],
    };
  }

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
              <Route path="/" element={<ProductList />} />
              <Route path="/product" element={<ProductDisplay />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
