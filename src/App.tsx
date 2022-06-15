import React from "react";
import "./scss/index.scss";
import Test from "./components/Test";
import ProductDisplay from "./views/PDP";
import ProductList from "./views/PLP";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./views/NotFound";

class App extends React.Component {
  TProps = {
    stuff: "Hello",
  };
  render() {
    return (
      <Router>
        <div className="App">
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
