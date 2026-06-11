---
type: definition
tags:
  - reactjs
---

Derived state is state that depends on other state values. Instead of managing it separately, you calculate it from existing state, often directly in render logic. This reduces redundancy and complexity.
**Example**: Calculating the filtered list of items from a search query rather than storing both the full list and the filtered list in state.

> **Note**: Derived state in React should generally be avoided in state hooks directly if it can be calculated dynamically in the render to keep state management simpler and minimize re-renders.