import React, { Component, ReactNode } from "react";

// Define the state type for the ErrorBoundary
interface ErrorBoundaryState {
  hasError: boolean;
}

// Define the props type for the ErrorBoundary
interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // Initialize the state
  state: ErrorBoundaryState = { hasError: false };

  // This is used to update the state when an error is caught
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.log("error", error)
    return { hasError: true };
  }

  // This is used to log the error information
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong. Please try again later.</h1>;
    }

    // Render the children if no error occurred
    return this.props.children;
  }
}

export default ErrorBoundary;
