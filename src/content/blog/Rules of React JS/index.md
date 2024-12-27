---
title: "rules of React JS"
description: "rules of React JS"
date: "Mar 20 2024"
tags: ["react-js"]
url: "rules-of-react-js"
---

### React Component Must Return a Single Element 
React enforces that components return a single root element. To include multiple elements, wrap them in a parent element like a `<div>` or use a React fragment (`<>...</>`).

```typescript
const MyComponent = () => {
  return (
    <>
      <header>Header</header>
      <main>Content</main>
    </>
  );
};
```


### React is a JavaScript Library  
Anything that can be achieved using JavaScript can be implemented in React since React is fundamentally a JavaScript library for building user interfaces.

### Unidirectional Data Flow  
In React, data flows in a single direction: from parent to child via props. Props are read-only and should not be modified by child components. 

```typescript
const Parent = () => {
  const [data, setData] = useState("Hello");

  return <Child message={data} />;
};

const Child = ({ message }: { message: string }) => {
  return <p>{message}</p>;
};
```

Note: you can update the state of the parent component from the child component by passing setState as props.

(use callbacks to send data back to the parent if needed.) ???


### JSX Expressions  
Within JSX, you can only write JavaScript expressions inside `{}`. Statements like `if` or `for` must be rewritten as expressions or moved outside JSX.

```typescript
const MyComponent = ({ condition }: { condition: boolean }) => {
  return <div>{condition ? "True" : "False"}</div>;
};
```


### Key for Array Items  
When rendering lists using `map`, ensure each element has a unique `key` to help React identify which items have changed, added, or removed.
and avoid using index, use the the id if it exist.

```typescript
const List = ({ items }: { items: string[] }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};
```

 **Why Avoid Using Index as a Key?**

1. **Re-rendering Issues**:  
    When the list order changes, React may not correctly associate the previous state with the new element, leading to unexpected behavior.
    
2. **State Preservation**:  
    Keys help React identify which items have changed, are added, or are removed. Using the index can confuse React if the list order changes, causing incorrect state persistence.
    
3. **Performance**:  
    Using unique and stable keys ensures React performs updates efficiently.

### Hooks Must Not Be Conditioned  
React hooks must be called at the top level of a component or custom hook. They cannot be placed inside loops, conditions, or nested functions.

```typescript
const MyComponent = ({ condition }: { condition: boolean }) => {
  // This is incorrect:
  // if (condition) {
  //   const [state, setState] = useState(false);
  // }

  const [state, setState] = useState(false); // Correct usage

  return <p>{state.toString()}</p>;
};
```



### Accessing Browser APIs  
React has access to all browser APIs because it is JavaScript. However, be cautious with server-side rendered components (like in Next.js), as they do not have access to browser-specific APIs.

```typescript
const WindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <p>Window width: {width}</p>;
};
```


### Exporting Components  
For a component to be usable in other files, you must export it. Typically, React components are exported as default exports.

```typescript
const MyComponent = () => {
  return <h1>Hello World</h1>;
};

export default MyComponent;
```

