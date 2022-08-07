import React from "react";
import { connect } from "react-redux";

import Switcher from ".";
import { Currency, Store } from "@/interfaces";
import { setCurrency } from "../../../store/actions";
import { getCurrencyState } from "../../../store/selectors";
import drop from "../../../assets/images/drop.svg";

interface CSwitcherProps {
  currencies: Currency[];
  selected: Currency;
  setCurrency: (currency: Currency) => void;
}

interface CSwitcherState {
  show: boolean;
}

function mapStateToProps(store: Store) {
  return getCurrencyState(store);
}

class CSwitcher extends React.Component<CSwitcherProps, CSwitcherState> {
  constructor(props: CSwitcherProps) {
    super(props);

    this.state = {
      show: false,
    };
    this.hideSwitcher = this.hideSwitcher.bind(this);
  }

  hideSwitcher = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div className={`cswitcher ${this.state.show ? "show-switcher" : ""}`}>
        <div
          className="cswitcher-toggle"
          onClick={() => {
            this.setState({ show: !this.state.show });
          }}
        >
          <div className="selected-symbol toggle-handler">
            {this.props.selected.symbol}
          </div>
          <img src={drop} alt="" className="toggle-handler" />
        </div>
        {this.state.show && (
          <Switcher
            currencies={this.props.currencies}
            hideSwitcher={this.hideSwitcher}
            selected={this.props.selected}
            setCurrency={this.props.setCurrency}
          />
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, { setCurrency })(CSwitcher);
