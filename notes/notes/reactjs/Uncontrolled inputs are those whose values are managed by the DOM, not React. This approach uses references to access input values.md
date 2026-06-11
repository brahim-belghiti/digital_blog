---
type: definition
tags:
  - reactjs
---

**Definition**  
Uncontrolled inputs are those whose values are managed by the DOM, not React. This approach uses references to access input values

**Implementation**
```typescript
import React, { useRef } from "react";

const UncontrolledInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (inputRef.current) {
      console.log("Input value:", inputRef.current.value);
    }
  };

  return (
    <div>
      <label>
        Uncontrolled Input:
        <input type="text" ref={inputRef} />
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default UncontrolledInput;
```

**Key Benefits**  
- **Performance**: Fewer React re-renders as the state is not managed by React.
- **Simplicity**: Useful for simple forms or when integrating third-party libraries.

**Choosing Between Controlled and Uncontrolled Inputs**
- Use **controlled inputs** when:
  - You need form validation.
  - You want to synchronize input state with other components or logic.
  - Inputs are part of a complex form.

- Use **uncontrolled inputs** when:
  - Performance is a concern for simple forms.
  - You need quick integration with third-party libraries.
  - Minimal React state management is desired.

By understanding the strengths and trade-offs of both approaches, you can choose the most appropriate solution for your specific use case.