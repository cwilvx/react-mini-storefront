import React from "react";
import { Link } from "react-router-dom";

class NotFound extends React.Component {
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
