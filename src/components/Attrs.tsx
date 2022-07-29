import { AttributeSet, CartAttr } from "@/interfaces";
import React from "react";

interface AttrsProps {
  attrs: AttributeSet[];
  selectedAttrs: CartAttr[];
  selectAttr: (
    attr_id: string | undefined,
    item_id: string | undefined
  ) => void;
}

interface AttrsState {}

class Attrs extends React.Component<AttrsProps, AttrsState> {
  constructor(props: AttrsProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="attributes">
        {this.props.attrs &&
          this.props.attrs.map((attribute) => {
            return (
              <div key={attribute.id} className="attr">
                <h4 className="attr-h">{attribute.name}:</h4>
                {attribute.type === "swatch" ? (
                  <div className="is_swatch">
                    {attribute.items.map((item) => {
                      return (
                        <div
                          key={item.id}
                          className={
                            this.props.selectedAttrs.some(
                              (a: CartAttr) =>
                                a.item_id === item.id &&
                                a.attr_id === attribute.id
                            )
                              ? "selected"
                              : ""
                          }
                        >
                          <button
                            className="color"
                            style={{ backgroundColor: item.value }}
                            onClick={() =>
                              this.props.selectAttr(attribute.id, item.id)
                            }
                          ></button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="other-attrs">
                    {attribute.items.map((item) => {
                      return (
                        <button
                          className={
                            this.props.selectedAttrs.some(
                              (a: CartAttr) =>
                                a.item_id === item.id &&
                                a.attr_id === attribute.id
                            )
                              ? "selected"
                              : ""
                          }
                          key={item.id}
                          onClick={() =>
                            this.props.selectAttr(attribute.id, item.id)
                          }
                        >
                          {item.value}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    );
  }
}

export default Attrs;
