import React from "react";
import { Link } from "react-router-dom";
interface Props {}

interface State {}

class NotFound extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="notfound">
        <h1>404</h1>
        <h2>Page not found</h2>
        <Link to="/">Go back to the homepage</Link>
      </div>
    );
  }
}

export default NotFound;
