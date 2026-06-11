---
type: definition
tags:
  - reactjs
---

The Transition API in React allows marking updates as non-urgent, enabling smoother UI transitions without blocking interactions

Example:

```typescript
import { useState, startTransition } from 'react';

const TransitionExample = () => {
  const [text, setText] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    // Simulate heavy computation
    const matches = Array(1000).fill(query);
    setResults(matches);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setText(query);

    startTransition(() => {
      handleSearch(query);
    });
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleChange} />
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};
```
