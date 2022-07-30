import { Currency, Price, Store } from "@/interfaces";
import React from "react";
import { connect } from "react-redux";
import { getSelectedCurrency } from "../store/selectors";

interface Props {
  currency: Currency | undefined;
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
              ? `${p.currency?.symbol} ${Math.round(p.amount || 0)}.00`
              : "";
          })}
      </div>
    );
  }
}

export default connect(mapStateToProps)(ReactivePrice);
