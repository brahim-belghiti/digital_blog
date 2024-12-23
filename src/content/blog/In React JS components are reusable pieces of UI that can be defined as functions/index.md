---
title: "in React JS components are reusable pieces of UI that can be defined as functions"
description: "in React JS components are reusable pieces of UI that can be defined as functions"
date: "Dec 19 2024"
tags: ["React"]
---

In React, components are reusable pieces of the UI that can be defined as functions or classes. They return elements that describe what should appear on the screen, often written in JSX (JavaScript XML).

- **Functional Components**: These are functions that return JSX and can manage their own state using hooks like `useState` and lifecycle methods via `useEffect`.

```JSX
const Paragraph = () => {
return (
<>
<p> basic paragraph component </p>
</>
)}
```

- **Class Components**: Older components in React that extend from `React.Component` and implement lifecycle methods such as `componentDidMount`, `componentDidUpdate`, etc. (Note: Class components are becoming less common with the rise of hooks.)

- **Rules**:
    - (Component names must start with a capital letter).
    - Each component must return a single root element.







