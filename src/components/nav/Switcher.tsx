import React from "react";

interface CSwitcherProps {}

interface CSwitcherState {}

class CSwitcher extends React.Component<CSwitcherProps, CSwitcherState> {
  constructor(props: CSwitcherProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="dropdown">
        <div className="d-item">$ USD</div>
        <div className="d-item">€ EUR</div>
        <div className="d-item">¥ JPY</div>
      </div>
    );
  }
}

export default CSwitcher;
