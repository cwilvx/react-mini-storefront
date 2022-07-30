import { Currency, CurrencyStore, Store } from "@/interfaces";
import React from "react";
import { connect } from "react-redux";
import { setCurrency } from "../../store/actions";
import { getCurrency } from "../../store/selectors";

interface CSwitcherProps {
  currencies: Currency[];
  selected: string;
  setCurrency: (currency: string) => void;
}

interface CSwitcherState {}

function mapStateToProps(store: Store) {
  console.log(getCurrency(store));
  return getCurrency(store);
}

class CSwitcher extends React.Component<CSwitcherProps, CSwitcherState> {
  constructor(props: CSwitcherProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        {this.props.currencies && (
          <div className="dropdown">
            {this.props.currencies.map((currency: Currency) => {
              return (
                <div
                  className={`d-item ${
                    this.props.selected === currency.label
                      ? "selected-currency"
                      : ""
                  }`}
                  key={currency.label}
                  onClick={() => {
                    this.props.setCurrency(currency.label);
                  }}
                >
                  {currency.symbol} {currency.label}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, { setCurrency })(CSwitcher);
