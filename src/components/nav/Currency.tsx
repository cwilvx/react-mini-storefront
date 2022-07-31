import { Currency, Store } from "@/interfaces";
import React from "react";
import { connect } from "react-redux";
import drop from "../../images/drop.svg";
import { setCurrency } from "../../store/actions";
import { getCurrencyState } from "../../store/selectors";
import Switcher from "./Switcher";

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
  }

  switcherProps = {
    currencies: this.props.currencies,
    selected: this.props.selected,
    setCurrency: this.props.setCurrency,
    hideSwitcher: () => {
      this.setState({ show: false });
    },
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
          <div className="selected-symbol">{this.props.selected.symbol}</div>
          <img src={drop} alt="" />
        </div>
        {this.state.show && <Switcher {...this.switcherProps} />}
      </div>
    );
  }
}

export default connect(mapStateToProps, { setCurrency })(CSwitcher);
