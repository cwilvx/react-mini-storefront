import React from "react";
import "./scss/index.scss";
import ProductDisplay from "./views/PDP";
import ProductList from "./views/PLP";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./views/NotFound";
import NavBar from "./components/NavBar";

class App extends React.Component {
  TProps = {
    stuff: "Hello",
  };
  render() {
    return (
      <Router>
        <div id="app">
          <NavBar />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product" element={<ProductDisplay />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
