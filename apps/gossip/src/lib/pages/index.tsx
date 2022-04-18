import { getContacts } from "$lib/services/contact";
import React, { Component, Suspense } from "react";

const HomePage = () => {
  return (
    <div className="App">
      <ErrorBoundary fallback="Error">
        <Suspense fallback="Loading...">
          <Contacts />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default HomePage;

class ErrorBoundary extends Component<{
  fallback: React.ReactNode;
  children: React.ReactNode;
}> {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
    };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const contactsSuspender = getContacts();

function Contacts() {
  const contacts = contactsSuspender.read();

  return (
    <div>
      {contacts.map((c) => {
        return <h4 key={c.name}>{c.name}</h4>;
      })}
    </div>
  );
}
