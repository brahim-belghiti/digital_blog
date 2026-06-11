---
type: definition
tags:
  - reactjs
---

is a powerful tool for managing complex state within functional components. Unlike useState, which is sufficient for simpler state management scenarios, useReducer employs the reducer pattern, similar to Redux. so the variable declared to store the state is not updated directly but inside a reducer function. The fundamental structure involves an initial state and an action that modifies it. Developers can define custom actions and implement a switch statement in the reducer function to determine how to update the state based on the received action.


