import { Currency, Price, Store } from "@/interfaces";
import { getCurrency } from "../store/selectors";
import React from "react";
import { connect } from "react-redux";

interface Props {
  currency: Currency | undefined;
  prices: Price[] | undefined;
}

function mapStateToProps(store: Store) {
  return {
    currency: getCurrency(store).selected,
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
              ? `${p.currency?.symbol} ${p.amount}`
              : "";
          })}
      </div>
    );
  }
}

export default connect(mapStateToProps)(ReactivePrice);
