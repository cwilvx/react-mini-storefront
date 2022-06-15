import * as React from "react";

interface Props {}

interface State {}

class ProductDisplay extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id="productdisplay">
        <h1>Product display page</h1>
      </div>
    );
  }
}

export default ProductDisplay;
