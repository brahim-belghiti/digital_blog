---
type: definition
tags:
  - reactjs
---

Error boundaries are React components that catch JavaScript errors in their child components’ tree and display a fallback UI instead of crashing the app.
Example  :  
```typescript
    import React from 'react';
    
    class ErrorBoundary extends React.Component {
      state = { hasError: false };
    
      static getDerivedStateFromError() {
        return { hasError: true };
      }
    
      render() {
        if (this.state.hasError) {
          return <h1>Something went wrong.</h1>;
        }
    
        return this.props.children;
      }
    }
```
