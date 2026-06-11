---
type: definition
tags:
  - reactjs
---

React Portals allow rendering children into a DOM node that exists outside the DOM hierarchy of the parent component
    
Example:
```typescript
    import React from 'react';
    import ReactDOM from 'react-dom';
    
    const Modal = ({ children }: { children: React.ReactNode }) => {
      return ReactDOM.createPortal(
        <div className="modal">{children}</div>,
        document.getElementById('modal-root')!
      );
    };
    ``
```