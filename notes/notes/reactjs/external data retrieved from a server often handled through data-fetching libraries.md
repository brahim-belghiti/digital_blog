---
type: definition
tags:
  - reactjs
---

external data retrieved from a server often handled through data-fetching libraries (e.g., React Query) or `fetch` in `useEffect`.
When fetching state we should take this issues into consideration.
- Asynchronous nature: Fetching data from a remote source is usually an asynchronous operation. This adds complexity in terms of timing, especially when you have to synchronize multiple pieces of remote data.
- Error handling: Connections to remote sources might fail or the server might return errors. Properly managing these scenarios for a smooth user experience can be challenging.
- Loading states: While waiting for data to arrive from a remote source, the application needs to handle “loading” states effectively. This usually involves showing loading indicators or fallback UIs (when the requesting component isn’t available, we use a default one temporarily).
- Consistency: Keeping the frontend state in sync with the backend can be difficult, especially in real-time applications or those that involve multiple users altering the same piece of data.
- Caching: Storing some remote state locally can improve performance but bring its own challenges, such as invalidation and staleness. In other words, if the remote data is altered by others, we need a mechanism to receive updates or perform a refetch to update our local state, which introduces a lot of complexity.
- Updates and optimistic UI: When a user makes a change, you can update the UI optimistically assuming the server call will succeed. But if it doesn’t, you’ll need a way to roll back those changes in your frontend state.