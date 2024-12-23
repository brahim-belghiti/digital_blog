---
title: "Suspense is React feature that allows you to suspend rendering until certain conditions are met"
description: "Suspense is React feature that allows you to suspend rendering until certain conditions are met, such as data loading or code splitting"
date: "Dec 19 2024"
tags: ["React"]
---

introduced in react 16.6 to improve performance. Suspense is React feature that allows you to suspend rendering until certain conditions are met, such as data loading or code splitting. It’s commonly used with `React.lazy()` for code splitting, allowing React to wait for a component to be loaded before rendering it. 
Additionally, **Suspense** lets you define a fallback component that will be displayed while the suspended component is being loaded, providing a smoother user experience.

Code splitting is used to dynamically import a dependency, instead of directly importing in it. So it does not impact the initial render of the component. 

#### React Suspense for Data Fetching
Suspense can be used with data fetching libraries like Relay or React Query to pause rendering until data is available

Example with Suspense and a custom `fetchData` hook:

```typescript
import React, { Suspense } from 'react';

const fetchData = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve('Data loaded!'), 2000)
  );

const DataComponent = () => {
  const data = fetchData();
  return <div>{data}</div>;
};

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DataComponent />
    </Suspense>
  );
}
```

#### Lazy Loading with React.lazy
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






