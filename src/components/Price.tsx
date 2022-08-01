import React from "react";
import { connect } from "react-redux";

import { wrapCurrency } from "../composables";
import { Currency, Price, Store } from "@/interfaces";
import { getSelectedCurrency } from "../store/selectors";

interface Props {
  currency: Currency;
  prices: Price[] | undefined;
}

function mapStateToProps(store: Store) {
  return {
    currency: getSelectedCurrency(store),
  };
}

class ReactivePrice extends React.Component<Props, {}> {
  render() {
    return (
      <div>
        {this.props.prices &&
          this.props.prices.map((p) => {
            return JSON.stringify(p.currency) ===
              JSON.stringify(this.props.currency)
              ? `${wrapCurrency(
                  Math.round(p.amount || 0),
                  this.props.currency
                )}`
              : "";
          })}
      </div>
    );
  }
}

export default connect(mapStateToProps)(ReactivePrice);
