import { handleClickOutside } from "../../composables";
import { Currency, Store } from "@/interfaces";
import React from "react";
import { connect } from "react-redux";
import drop from "../../images/drop.svg";
import { setCurrency } from "../../store/actions";
import { getCurrencyState } from "../../store/selectors";

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

    this.wrapperRef = React.createRef();
    this.onClickOutside = this.onClickOutside.bind(this);
  }

  wrapperRef: React.RefObject<HTMLDivElement>;

  componentDidMount() {
    document.addEventListener("mousedown", this.onClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.onClickOutside);
  }

  onClickOutside(e: MouseEvent) {
    const hideSwitcher = () => {
      this.setState({ show: false });
    };

    handleClickOutside(this, e, hideSwitcher);
  }

  render() {
    return (
      <div
        className={`cswitcher ${this.state.show ? "show-switcher" : ""}`}
        ref={this.wrapperRef}
      >
        <div
          className="cswitcher-toggle"
          onClick={() => {
            this.setState({ show: !this.state.show });
          }}
        >
          <div className="selected-symbol">{this.props.selected.symbol}</div>
          <img src={drop} alt="" />
        </div>
        {this.props.currencies && (
          <div className="dropdown">
            {this.props.currencies.map((currency: Currency) => {
              return (
                <div
                  className={`d-item ${
                    this.props.selected.label === currency.label
                      ? "selected-currency"
                      : ""
                  }`}
                  key={currency.label}
                  onClick={() => {
                    this.props.setCurrency(currency);
                    this.setState({ show: !this.state.show });
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
