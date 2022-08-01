import React from "react";
import { connect } from "react-redux";
import { incrementQuantity, decrementQuantity } from "../store/actions";

import { CartItem } from "@/interfaces";
import Attrs from "./Attributes";

import { ReactComponent as PlusSvg } from "../assets/images/plus.svg";
import { ReactComponent as MinusSvg } from "../assets/images/minus.svg";
import { ReactComponent as ArrowSvg } from "../assets/images/arrow.svg";
import Price from "./Price";

interface Props {
  item: CartItem;
  incrementQuantity: (item: CartItem) => void;
  decrementQuantity: (item: CartItem) => void;
}

interface State {
  currentImage: number;
}

class CartPageItem extends React.Component<Props, State> {
  constructor(props: Props) {
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
          <div className="price">
            <Price prices={this.props.item.prices} />
          </div>
          <div className="attributes">
            <Attrs
              attrs={this.props.item.attributes}
              selectedAttrs={this.props.item.selectedAttrs}
              selectAttr={() => {}}
            />
          </div>
        </div>
        <div className="center">
          <div
            className="plus"
            onClick={() => this.props.incrementQuantity(this.props.item)}
          >
            <PlusSvg />
          </div>
          <div className="itemcount">{this.props.item.quantity}</div>
          <div
            className="minus"
            onClick={() => this.props.decrementQuantity(this.props.item)}
          >
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

export default connect(null, {
  incrementQuantity,
  decrementQuantity,
})(CartPageItem);
