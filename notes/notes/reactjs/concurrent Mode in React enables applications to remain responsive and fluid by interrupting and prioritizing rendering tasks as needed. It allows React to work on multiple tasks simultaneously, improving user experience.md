---
type: definition
tags:
  - reactjs
---

Concurrent Mode in React enables applications to remain responsive and fluid by interrupting and prioritizing rendering tasks as needed. It allows React to work on multiple tasks simultaneously, improving user experience

**Key Features**:

- **Interruptible Rendering**: React can pause rendering work and resume later.
- **Time-Slicing**: React splits rendering work into chunks, ensuring high-priority tasks (e.g., user input) are handled first.
- **Better Loading States**: Works well with features like `Suspense`.

**Usage**:  
Concurrent Mode is gradually being integrated into React, with features like `React.Suspense` and `startTransition` being examples of its application.

Example with `startTransition`:

```typescript
import React, { useState, startTransition } from 'react';

const ConcurrentExample = () => {
  const [input, setInput] = useState('');
  const [list, setList] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    startTransition(() => {
      const newList = Array(10000).fill(value);
      setList(newList);
    });
  };

  return (
    <div>
      <input type="text" value={input} onChange={handleChange} />
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ConcurrentExample;
```

