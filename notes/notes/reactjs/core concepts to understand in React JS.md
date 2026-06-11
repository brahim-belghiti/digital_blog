---
type: definition
tags:
  - reactjs
---

# Core React concepts

This note walks through what happens when a React component renders. For the bigger picture about why React works this way, see [[how-react-turns-state-into-ui]].

## Components, props, and state

A [[in React JS components are reusable pieces of UI that can be defined as functions (or classes) that return elements, often written in JSX|component]] is a function that returns UI. It takes [[in React JS props are used to pass data from a parent component to a child component|props]] (read-only inputs from the parent) and can hold [[in React JS state represents the internal data or condition of a component, which can change over time and affect the rendering of the UI|state]] (internal mutable values). Hooks, side effects, and lifecycle all happen inside this unit.

## JSX and the virtual DOM

When a component runs, its JSX returns a tree of plain JavaScript objects called the [[The virtual DOM is a lightweight representation of the actual DOM|virtual DOM]]. React works with this tree, not the real DOM. [[React uses a virtual DOM to optimize updates to the actual DOM|React uses the virtual DOM to compute the smallest change needed]] and only then updates the real DOM.

## What triggers a re-render

A component re-runs when:
- its state changes (via [[useState is a hook for managing state|useState]] or [[useReducer is a hook for managing complex state with a reducer function|useReducer]])
- its parent re-renders and passes new props

If neither happens, the component does not run. 

useEffect doesn't automatically trigger a re-render, effect run after a re-render.

## Reconciliation

After a re-render, React has two trees: the old virtual DOM and the new one. [[reconciliation is the process by which React determines what has changed in the virtual DOM and updates the actual DOM efficiently|Reconciliation]] is the algorithm that compares them and produces the smallest real-DOM update. [[React Fiber is the re-implementation of React’s reconciliation algorithm, designed to enable concurrent rendering and make updates more efficient|React Fiber]] is the engine that runs reconciliation. It can pause and prioritize work, which is what makes concurrent rendering possible.

## Side effects

A component is a pure function, so it cannot fetch data, set timers, or touch the DOM directly. [[useEffect is a hook for performing side effects|useEffect]] is for those things. It runs after the render commits, not during it. [[useRef is a React Hook that lets you reference a value that's not needed for rendering.|useRef]] holds values you want to keep across renders without triggering a re-render.

## Types of state in React

- **Component state** — local to one component. Use [[useState is a hook for managing state|useState]] or [[useReducer is a hook for managing complex state with a reducer function|useReducer]].
- **Global state** — shared across components. Use [[Context lets a component receive information from distant parents without passing it as props|context]] or a library like Redux.
- **Server state** — [[external data retrieved from a server often handled through data-fetching libraries|data from a server]], usually managed by libraries like React Query.
- **Derived state** — [[derived state is state that is calculated from existing state, instead of managing it separately|computed from other state]], not stored.
- **Persistent state** — saved in `localStorage` or `sessionStorage` between sessions.

## Client and server rendering

Rendering can happen in the browser or on the server. The [[the difference between client side and server side rendering is in what sources are being sent to the client and when the full rendering of the page happens|difference between client and server rendering]] is what reaches the client and when. With server rendering, the browser receives ready-made HTML and then runs [[Hydration is the process of transforming served static html pages into interactive pages by letting the client side take over|hydration]] to attach event handlers and React state. [[React Server Components allow rendering components on the server, which reduces the amount of JavaScript sent to the client and improves performance|Server Components]] go further: they render on the server and never ship their JavaScript to the client.

## Controlled and uncontrolled inputs

Form inputs have their own state in the DOM. There are two ways to handle this:

- [[Controlled inputs are those whose values are managed by React state|Controlled inputs]]: React owns the value. Every keystroke updates state, and state drives the input.
- [[Uncontrolled inputs are those whose values are managed by the DOM, not React. This approach uses references to access input values|Uncontrolled inputs]]: the DOM owns the value. Read it with a ref when needed.

Controlled is the default. Uncontrolled is for cases where you don't need React to know about every keystroke.

## Error boundaries and Strict Mode

If a component throws during render, the whole tree unmounts by default. [[Error boundaries are React components that catch JavaScript errors in their child components’ tree and display a fallback UI instead of crashing the app|Error boundaries]] catch errors in their subtree and render a fallback. [[React Strict Mode]] is a development-only tool. It double-renders components and runs effects twice to surface impure code and accidental side effects.

## Fragments and portals

[[react fragments are a lightweight wrapper for grouping multiple elements without adding extra nodes to the DOM|Fragments]] let a component return multiple elements without adding a wrapper div to the DOM. [[react Portals allow rendering children into a DOM node that exists outside the DOM hierarchy of the parent component|Portals]] render children into a different part of the DOM (modals, tooltips) while keeping them inside the React tree for events and context.

## Suspense, transitions, and concurrent mode

The default render is synchronous and uninterruptible. That blocks input on slow renders. Three features solve this:

- [[Suspense is React feature that allows you to suspend rendering until certain conditions are met, such as data loading or code splitting|Suspense]]: a component can declare it isn't ready and show a fallback while it waits.
- [[The Transition API in React allows marking updates as non-urgent, enabling smoother UI transitions without blocking interactions|Transitions]]: mark updates as non-urgent so React can defer them.
- [[concurrent Mode in React enables applications to remain responsive and fluid by interrupting and prioritizing rendering tasks as needed. It allows React to work on multiple tasks simultaneously, improving user experience|Concurrent Mode]]: the general name for interruptible, prioritized rendering. Made possible by Fiber.

## Hooks and reuse

[[Built-in React hooks let you use different React features from your components|Built-in hooks]] cover most cases. [[custom hooks in React abstract reusable logic and separate it from the rendering process in components, enhancing code reuse, readability, and maintainability across the application.|Custom hooks]] let you extract reusable logic without tying it to a component. [[HOCs are a design pattern for reusing component logic|Higher-order components]] are the older pattern for the same problem — wrapping a component to add behavior. [[useMemo is a hook for memorizing expensive calculations|useMemo]] and [[useCallback is a hook for memorizing functions|useCallback]] cache values across renders for performance.
