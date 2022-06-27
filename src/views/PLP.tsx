import React from "react";
import ItemCard from "../components/ItemCard";
import client from "../graph/getClient";
import { Category } from "../interfaces";
import { getCategory } from "../graph/queries";

interface State {
  category: Category;
}

interface Props {
  cat_name: string;
}

class ProductList extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      category: {} as Category,
    };
  }

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
                  return <ItemCard {...product} key={product.id} />;
                })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ProductList;
