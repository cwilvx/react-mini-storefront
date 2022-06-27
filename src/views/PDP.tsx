import * as React from "react";
import { withRouter } from "react-router-dom";
import client from "../graph/getClient";
import { getProduct } from "../graph/queries";
import { Product } from "../interfaces";

interface State {
  product: Product;
  currentImage: number;
}

interface Props {
  match: any;
  location: any;
  history: any;
}

/**
 *
 * @param {string} html HTML string to be parsed
 * @returns {string} HTML string with stripped scripts
 */
function stripScripts(html: string): string {
  return html.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    ""
  );
}

class ProductDisplay extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      product: {} as Product,
      currentImage: 0,
    };
  }

  fetchProduct(pid: string) {
    client
      .query({
        query: getProduct(pid),
      })
      .then((res) => {
        this.setState({
          product: res.data.product,
        });
      });
  }

  componentDidMount() {
    const pid = this.props.match.params.id as string;
    this.fetchProduct(pid);
  }

  render() {
    return (
      <div id="productdisplay">
        <div className="thumbs">
          {this.state.product.gallery &&
            this.state.product.gallery.map((image, index) => {
              return (
                <div
                  className="thumb"
                  key={image}
                  onClick={() => this.setState({ currentImage: index })}
                >
                  <img src={image} alt="thumbnail preview" />
                </div>
              );
            })}
        </div>
        <div className="preview">
          <img
            src={
              this.state.product.gallery &&
              this.state.product.gallery[this.state.currentImage]
            }
            alt="main preview"
          />
        </div>
        <div className="details">
          <div className="name">
            <h2 className="company">{this.state.product.brand}</h2>
            <h2 className="light">{this.state.product.name}</h2>
          </div>
          <div className="attributes">
            {this.state.product.attributes &&
              this.state.product.attributes.map((attribute) => {
                return (
                  <div key={attribute.id}>
                    <h4 className="attr-h">{attribute.name}</h4>
                    {attribute.type === "swatch" ? (
                      <div className="attr-list is_swatch">
                        {attribute.items.map((item) => {
                          return (
                            <button
                              className="color"
                              style={{ backgroundColor: item.value }}
                              key={item.id}
                            ></button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="attr-list">
                        {attribute.items.map((item) => {
                          return <button key={item.id}>{item.value}</button>;
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
          <div className="price bold">
            <div className="h">PRICE:</div>
            <div>$ 50</div>
          </div>
          <button className="button bg-primary">ADD TO CART</button>
          {this.state.product.description && (
            <div
              className="info"
              dangerouslySetInnerHTML={{
                __html: stripScripts(this.state.product.description as string),
              }}
            ></div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(ProductDisplay);
