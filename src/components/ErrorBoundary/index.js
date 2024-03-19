import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // componentDidCatch(error, errorInfo) {
  //   if (error){console.error('Error caught by ErrorBoundary:', error, errorInfo)}
  //   else{
  //     console.log("no error")
  //   };
  // }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Oops! Something went wrong.</h2>
          <p>We're sorry, an unexpected error occurred.</p>
          <p>Please try refreshing the page or contact support.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
