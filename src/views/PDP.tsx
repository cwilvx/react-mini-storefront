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
        <div className="thumbs">
          <div className="thumb">
            {" "}
            <img src="https://picsum.photos/90/90" alt="" />
          </div>
          <div className="thumb">
            {" "}
            <img src="https://picsum.photos/90/90" alt="" />
          </div>
          <div className="thumb">
            {" "}
            <img src="https://picsum.photos/90/90" alt="" />
          </div>
        </div>
        <div className="preview">
          <img src="https://picsum.photos/600/400" alt="" />
        </div>
        <div className="details">
          <div className="name">
            <h2 className="company">Apollo</h2>
            <h2 className="light">Running Short</h2>
          </div>
          <div className="sizes">
            <div className="h">SIZE:</div>
            <div className="cart-content">
              <button className="selected-size">XL</button>
              <button>L</button>
              <button>S</button>
              <button>L</button>
            </div>
          </div>
          <div className="colors">
            <div className="h">COLOR:</div>
            <div className="cart-content">
              <div className="outline">
                <div className="color"></div>
              </div>
              <div className="outline">
                <div className="color"></div>
              </div>
              <div className="outline">
                <div className="color"></div>
              </div>
            </div>
          </div>
          <div className="price bold">
            <div className="h">PRICE:</div>
            <div>$ 50</div>
          </div>
          <button className="button bg-primary">ADD TO CART</button>
          <div className="info">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod earum
            omnis cumque doloremque consequuntur hic deserunt ab officia
            corrupti enim distinctio fugit vitae blanditiis recusandae eligendi,
            ut voluptatum inventore magni.
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDisplay;
