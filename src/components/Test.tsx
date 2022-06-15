import React from "react";

class Test extends React.Component<{}, { counter: number }> {
  constructor(props: { stuff: string }) {
    super(props);
    this.state = {
      counter: 10,
    };
    this.increaseCounter = this.increaseCounter.bind(this);
  }

  increaseCounter() {
    this.setState({
      counter: this.state.counter + 1,
    });
  }

  render() {
    return (
      <div>
        <h1>Test</h1>
        <p>This is a test component</p>
        <p onMouseOver={this.increaseCounter}>{this.state.counter}</p>
      </div>
    );
  }
}

export default Test;
