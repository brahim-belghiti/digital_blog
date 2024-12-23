---
title: "Built-in React hooks"
description: "Built-in React hooks let you use different React features from your components"
date: "Dec 19 2024"
tags: ["React"]
---

Hooks were introduced in React 16.8 and are functions that let use different React features from your components. They can separated into different categories.

## State hooks
**useState**
A hook to manage local state inside a component. It returns an array with two elements: **state**, which represents the current value of the state, and **setState**, a function used to directly update that value.

**useReducer**
is a powerful tool for managing complex state within functional components. Unlike useState, which is sufficient for simpler state management scenarios, useReducer employs the reducer pattern, similar to Redux. so the variable declared to store the state is not updated directly but inside a reducer function. The fundamental structure involves an initial state and an action that modifies it. Developers can define custom actions and implement a switch statement in the reducer function to determine how to update the state based on the received action.

## side effect hooks
**useEffect**
 A hook for handling side effects (like data fetching, subscriptions, or manually interacting with the DOM) in functional components.
	- **Without a dependency array**: Runs after every render.
	- **With an empty dependency array**: Runs only once, immediately after the initial render.
	- **With dependencies**: Runs whenever any value in the array changes.

## context hooks
**useContext**
is to store state that can be accessed any where form the application, you wrap the application with the context and then you have access to it. So it is a way to share data (like themes or authentication state) between components without passing props manually down the component tree.

## performance hooks
**useMemo**
is a React Hook that lets you cache the result of a calculation between re-renders.by memorising expensive calculations so that they are only recalculated when necessary (e.g., when dependencies change).

**useCallback** 
is a React Hook that lets you cache a function definition between re-renders. by memorizing functions so that they don’t get recreated on every render unless their dependencies change.
> **Note**: The need for `useMemo` and `useCallback` has reduced with improvements in React 19, but they can still be useful in performance-critical situations.

## Ref hooks
**useRef**
_Refs_ let a component [hold some information that isn’t used for rendering,](https://react.dev/learn/referencing-values-with-refs) like a DOM node or a timeout ID. Unlike with state, updating a ref does not re-render your component. Refs are an “escape hatch” from the React paradigm. They are useful when you need to work with non-React systems, such as the built-in browser APIs.

## Other Hooks 
## custom hooks
[[custom hooks in React abstract reusable logic and separate it from the rendering process in components, enhancing code reuse, readability, and maintainability across the application.]]









