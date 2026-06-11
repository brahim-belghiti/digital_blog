---
type: definition
tags:
  - reactjs
---

React.lazy enables loading components only when they’re needed, improving the initial load time
Example:
```typescript
    import React, { Suspense } from 'react';
    
    const LazyComponent = React.lazy(() => import('./LazyComponent'));
    
    const App = () => (
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    );
```  
