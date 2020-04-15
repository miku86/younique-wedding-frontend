import React, { Component } from "react";
import { logError } from "../../utils/error";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    logError(error, errorInfo);
  }

  render() {
    return this.state.hasError ? (
      <div className="ErrorBoundary">
        <h3>Sorry there was a problem loading this page</h3>
      </div>
    ) : (
      this.props.children
    );
  }
}
