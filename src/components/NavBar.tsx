import React from "react";

interface Props {}

interface State {}

class NavBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id="navbar">
        <div id="nav">NavBar</div>
      </div>
    );
  }
}

export default NavBar;
