---
type: definition
tags:
  - javascript
---

Because JavaScript is single-threaded, to fetch data from a server without blocking the main thread, we can use a promise and continue executing the main thread. A promise is an object that eventually resolves with a response or an error, and that result is communicated back to the main thread, which then handles the result of the asynchronous operation accordingly.