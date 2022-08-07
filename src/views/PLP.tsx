import React from "react";

import client from "../graph/getClient";
import { Category } from "../interfaces";
import ItemCard from "../components/ItemCard";
import { getCategory } from "../graph/queries";

interface State {
  category: Category;
}

interface Props {
  cat_name: any;
}

class ProductList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      category: {} as Category,
    };
  }

  /**
   * Fetches category products from the GraphQL server and sets the state
   */
  async getCategory() {
    const res = await client.query({
      query: getCategory(this.props.cat_name),
    });

    this.setState({
      category: res.data.category,
    });
  }

  componentDidMount() {
    this.getCategory();
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.cat_name !== this.props.cat_name) {
      this.getCategory();
    }
  }

  render() {
    return (
      <div id="productlist">
        {this.state.category && (
          <div>
            <h1>{this.state.category.name}</h1>
            <div className="prod-list">
              {this.state.category.products &&
                this.state.category.products.map((product) => {
                  return <ItemCard product={product} key={product.id} />;
                })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ProductList;
