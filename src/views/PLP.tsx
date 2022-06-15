import React from "react";

interface Props {}

interface State {}

class ProductList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id="productlist">
        <h1>Product list page</h1>
      </div>
    );
  }
}

export default ProductList;
