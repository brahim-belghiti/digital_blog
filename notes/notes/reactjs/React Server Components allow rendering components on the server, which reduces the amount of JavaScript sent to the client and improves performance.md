---
type: definition
tags:
  - reactjs
---

React Server Components allow rendering components on the server, which reduces the amount of JavaScript sent to the client and improves performance

- **Key Use Cases**:
    - Reduces JavaScript bundle size.
    - Handles heavy lifting on the server.
    - Improves time-to-interactive.

Example (in Next.js):

```typescript
// app/page.tsx (Server Component by default)
export default function Page() {
  const data = fetch('https://api.example.com/data').then((res) => res.json());

  return <div>{JSON.stringify(data)}</div>;
}
```

