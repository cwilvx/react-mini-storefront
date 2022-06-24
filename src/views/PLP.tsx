import React from "react";
import ItemCard from "../components/ItemCard";
import client from "../graph/getClient";
import { Category } from "../interfaces";
import { getCategories } from "../graph/queries";

interface State {
  categories: Category[];
}

class ProductList extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  async getCategories() {
    client
      .query({
        query: getCategories,
      })
      .then((res) => {
        this.setState({
          categories: res.data.categories,
        });
      });
  }

  componentDidMount() {
    this.getCategories();
  }

  render() {
    return (
      <div id="productlist">
        {this.state.categories.map((category) => {
          return (
            <div key={category.name}>
              <h1>{category.name}</h1>
              <div className="prod-list">
                {category.products.map((product) => {
                  return <ItemCard {...product} key={product.name} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ProductList;
