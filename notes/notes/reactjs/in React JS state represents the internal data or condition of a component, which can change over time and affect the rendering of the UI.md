---
type: definition
tags:
  - reactjs
---

**Definition**: State represents the internal data or condition of a component, which can change over time and directly affects the rendering of the UI. It is used to store information such as user inputs, the index of the current image displayed in a gallery, or the data in a table.

- **Types of State**:
    
    - **Component State**: State specific to a single component, typically managed with `useState` or `useReducer`.
    - **Global State**: State that needs to be shared across multiple components, often managed with the Context API or state management libraries like Redux.
    - **Server State**: External data retrieved from a server, often handled through data-fetching libraries (e.g., React Query) or `fetch` in `useEffect`.
    - **Derived State**: State derived from other existing state or props, calculated dynamically as needed to avoid redundancy.
    - **Persistent State**: State stored across sessions, typically saved in `localStorage` or `sessionStorage`.
- **How to Manage State in React**:
    
    - **useState**: The most common hook for managing simple or isolated state.
    - **useReducer**: Useful for complex state logic, where state transitions depend on specific actions (e.g., form steps).
    - **useMemo**: Not a state hook but useful to optimize derived state by memoizing complex calculations.

In addition, React provides other hooks and APIs to support broader state-sharing or data persistence needs:

- **Context API with useContext**: For sharing global state across components. To minimize re-renders, consider using selector functions to access specific state slices only.
- **useRef**: Primarily for referencing DOM elements, but also useful for storing mutable values that don't cause re-renders when updated, like timers or previous state.











