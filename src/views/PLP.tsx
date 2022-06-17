import React from "react";
import ItemCard from "../components/ItemCard";

interface Props {}

interface State {}

class ProductList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  items = [
    {
      name: "Product 1",
      price: 10,
      image: "https://picsum.photos/930/900",
    },
    {
      name: "Product 2",
      price: 20,
      image: "https://picsum.photos/920/900",
    },
    {
      name: "Product 3",
      price: 30,
      image: "https://picsum.photos/900/900",
    },
  ];

  render() {
    return (
      <div id="productlist">
        <h1>Category name</h1>
        <div id="prod-list">
          {this.items.map((item) => {
            return <ItemCard {...item} key={item.name} />;
          })}
        </div>
      </div>
    );
  }
}

export default ProductList;
