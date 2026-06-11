---
type: definition
tags:
  - reactjs
---

React uses a [[The virtual DOM is a lightweight representation of the actual DOM|virtual DOM]] to optimize updates to the actual DOM. When the state or props of component change, React first updates the virtual DOM. Then, it compares the virtual DOM with the actual DOM (using a process called "**[[reconciliation is the process by which React determines what has changed in the virtual DOM and updates the actual DOM efficiently|reconciliation]]**") and applies only the changes (the "diff") to the real DOM. This approach improves performance.

TO GO in depth : 
[[how does having virtual dom improve performance ?]]
[[why react don't update to the DOM directly ?]]


