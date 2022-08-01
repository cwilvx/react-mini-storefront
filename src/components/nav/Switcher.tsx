import { Currency } from "../../interfaces";
import React from "react";
import { handleClickOutside } from "../../composables";

interface SwitcherProps {
  currencies: Currency[];
  selected: Currency;
  setCurrency: (currency: Currency) => void;
  hideSwitcher: () => void;
}

class Switcher extends React.Component<SwitcherProps, {}> {
  constructor(props: SwitcherProps) {
    super(props);
    this.onClickOutside = this.onClickOutside.bind(this);
  }

  wrapperRef: React.RefObject<HTMLDivElement> = React.createRef();

  componentDidMount() {
    document.addEventListener("mousedown", this.onClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.onClickOutside);
  }

  onClickOutside(e: MouseEvent) {
    handleClickOutside(this.wrapperRef, e, this.props.hideSwitcher);
  }

  render() {
    return (
      <div className="dropdown" ref={this.wrapperRef}>
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
                this.props.hideSwitcher();
              }}
            >
              {currency.symbol} {currency.label}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Switcher;
