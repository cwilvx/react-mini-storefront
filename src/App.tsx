import React from "react";
import "./scss/index.scss";
import ProductDisplay from "./views/PDP";
import ProductList from "./views/PLP";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./views/NotFound";
import NavBar from "./components/NavBar";
import Cart from "./views/Cart";

class App extends React.Component {
  TProps = {
    stuff: "Hello",
  };
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
