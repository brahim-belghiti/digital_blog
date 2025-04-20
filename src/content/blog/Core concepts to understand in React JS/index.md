---
title: "Core concepts to understand in React JS"
description: "Explore the essential building blocks of React JS, including components, state, props, and lifecycle methods. This guide is perfect for beginners looking to grasp the core concepts that power modern React applications."
date: "Dec 19 2024"
tags: ["react-js"]
url: "core-concepts-to-understand-in-react-js"
---


## Basic concepts 
### Components
 [in React JS components are reusable pieces of UI that can be defined as functions (or classes) that return elements, often written in JSX](./in-react-js-components-are-reusable-pieces-of-ui-that-can-be-defined-as-functions)
### the props
[in React JS props are used to pass data from a parent component to a child component](./in-react-js-props-are-used-to-pass-data-from-a-parent-component-to-a-child-component)
### the state
[in React JS state represents the internal data or condition of a component, which can change over time and affect the rendering of the UI](./in-react-js-state-represents-the-internal-data-or-condition-of-a-component)
- **Types of State**:
    - **Component State**: State specific to a single component, typically managed with `useState` or `useReducer`.
    - **Global State**: State that needs to be shared across multiple components, often managed with the Context API or state management libraries like Redux.
    - **Server State**: external data retrieved from a server often handled through data-fetching libraries (e.g., React Query) or `fetch` in `useEffect`.
    - **Derived State**: derived state is state that is calculated from existing state, instead of managing it separately.
    - **Persistent State**: State stored across sessions, typically saved in `localStorage` or `sessionStorage`.

### Virtual DOM
The virtual DOM is a lightweight representation of the actual DOM. And [React use it to optimize updates to the actual DOM](./react-uses-a-virtual-dom-to-optimize-updates-to-the-actual-dom)

### Built-in React Hooks
[Built-in React hooks let you use different React features from your components](./built-in-react-hooks)

---

## rendering
### client side rendering vs server side rendering
[the difference between client side and server side rendering is in what sources are being sent to the client and when the full rendering of the page happens](./client-side-rendering-vs-server-side-rendering)

#### Server Components
React Server Components allow rendering components on the server, which reduces the amount of JavaScript sent to the client and improves performance

### reconciliation
[reconciliation is the process by which React determines what has changed in the virtual DOM and updates the actual DOM efficiently](./reconciliation-is-the-process-by-which-react-determines-what-has-changed-in-the-virtual-dom-and-updates-the-actual-dom-efficiently)

### life-cycle methods 
in React class components, lifecycle methods are divided into three main phases:
1. **Mounting**: The phase when a component is being created and inserted into the DOM.
2. **Updating**: The phase when a component is being re-rendered due to changes in state or props.
3. **Unmounting**: The phase when a component is being removed from the DOM..

### lifecycle Methods in Functional Components (using Hooks):

In functional components, the equivalent lifecycle methods can be handled using the `useEffect` hook, which allows you to run side effects in different phases of the component's lifecycle.

- `useEffect(() => { ... }, [])`: This is equivalent to `componentDidMount()` and runs once when the component mounts.
- `useEffect(() => { ... }, [dependencies])`: This is equivalent to `componentDidUpdate()` and runs whenever the specified dependencies change.
- `useEffect(() => { return () => { ... } }, [])`: This is equivalent to `componentWillUnmount()` and runs when the component unmounts.

---

## Optimization 
### suspense
[Suspense is React feature that allows you to suspend rendering until certain conditions are met, such as data loading or code splitting](./suspense-is-react-feature-that-allows-you-to-suspend-rendering-until-certain-conditions-are-met)

### Concurrent Mode
[[concurrent Mode in React enables applications to remain responsive and fluid by interrupting and prioritizing rendering tasks as needed. It allows React to work on multiple tasks simultaneously, improving user experience]]

---
## Error handling
### Error Boundaries  
[[Error boundaries are React components that catch JavaScript errors in their child components’ tree and display a fallback UI instead of crashing the app]]
### React Strict Mode
[[React Strict Mode is a tool for highlighting potential issues in a React application, such as deprecated APIs or unintended side effects]]

--- 

## Other
### Controlled and Uncontrolled Inputs
In React applications, handling form inputs can be managed in two ways: controlled and uncontrolled components. Understanding the differences and use cases is essential for writing clean, efficient, and maintainable forms.
**controlled inputs**
[[Controlled inputs are those whose values are managed by React state]]
**Uncontrolled inputs**
[[Uncontrolled inputs are those whose values are managed by the DOM, not React. This approach uses references to access input values]]
### higher order components (HOC)
[[HOCs are a design pattern for reusing component logic]]





