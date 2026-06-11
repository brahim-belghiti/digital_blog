---
type: definition
tags:
  - reactjs
---

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
