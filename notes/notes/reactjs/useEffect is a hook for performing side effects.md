---
type: definition
tags:
  - reactjs
---

 A hook for handling side effects (like data fetching, subscriptions, or manually interacting with the DOM) in functional components.
	- **Without a dependency array**: Runs after every render.
	- **With an empty dependency array**: Runs only once, immediately after the initial render.
	- **With dependencies**: Runs whenever any value in the array changes.

