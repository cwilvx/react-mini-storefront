import React from "react";
import { ReactComponent as PlusSvg } from "../images/plus.svg";
import { ReactComponent as MinusSvg } from "../images/minus.svg";
import { ReactComponent as ArrowSvg } from "../images/arrow.svg";
import { CartItem } from "@/interfaces";
import Attrs from "./Attrs";

interface CartPageItemProps {
  item: CartItem;
}

interface CartPageItemState {
  currentImage: number;
}

class CartPageItem extends React.Component<
  CartPageItemProps,
  CartPageItemState
> {
  constructor(props: CartPageItemProps) {
    super(props);
    this.state = {
      currentImage: 0,
    };
  }

  nextImage = () => {
    this.setState({
      currentImage:
        this.state.currentImage === this.props.item.gallery.length - 1
          ? 0
          : this.state.currentImage + 1,
    });
  };

  prevImage = () => {
    this.setState({
      currentImage:
        this.state.currentImage === 0
          ? this.props.item.gallery.length - 1
          : this.state.currentImage - 1,
    });
  };
  render() {
    return (
      <div className="cart-item cart-page-item">
        <div className="left">
          <h2>{this.props.item.brand}</h2>
          <h2 className="item-name">{this.props.item.name}</h2>
          <div className="price">$ 50.00</div>
          <div className="attributes">
            <Attrs
              attrs={this.props.item.attributes}
              selectedAttrs={this.props.item.selectedAttrs}
              selectAttr={() => {}}
            />
          </div>
        </div>
        <div className="center">
          <div className="plus">
            <PlusSvg />
          </div>
          <div className="itemcount">{this.props.item.quantity}</div>
          <div className="minus">
            <MinusSvg />
          </div>
        </div>
        <div className="right">
          <img src={this.props.item.gallery[this.state.currentImage]} alt="" />
          {this.props.item.gallery.length > 1 && (
            <div className="img-buttons">
              <div className="next" onClick={this.nextImage}>
                <ArrowSvg />
              </div>
              <div className="prev" onClick={this.prevImage}>
                <ArrowSvg />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CartPageItem;
