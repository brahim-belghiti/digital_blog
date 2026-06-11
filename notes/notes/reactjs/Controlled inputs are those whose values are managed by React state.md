---
type: definition
tags:
  - reactjs
---

**Definition**  
Controlled inputs are those whose values are managed by React state. The component's state acts as the "single source of truth" for the input value.

**Implementation**
```typescript
import React, { useState } from "react";

const ControlledInput = () => {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <label>
        Controlled Input:
        <input type="text" value={value} onChange={handleChange} />
      </label>
      <p>Value: {value}</p>
    </div>
  );
};

export default ControlledInput;
```

**Key Benefits**  
- **Predictability**: React fully controls the input value, making it easy to synchronize with other components or state.
- **Validation**: Input validation logic is straightforward and centralized.
- **Reactivity**: React's re-rendering ensures UI always reflects the current state.