---
type: definition
tags:
  - reactjs
---

They allow you to abstract away common functionality, such as form handling or fetching data, into a hook that can be reused across multiple components.

example : 
``` js
// Custom hook for data fetching
function useFetchData(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
}

// Using the custom hook in a component
function MyComponent() {
  const { data, loading } = useFetchData('https://api.example.com/data');

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
}
```

In this example, we created a custom hook that accepts an argument and returns two values. The custom hook is a function that takes one parameter (`url`) and returns two values (`data` and `loading`). Inside the function, two state variables are defined using `useState`. The `useEffect` hook is then used to fetch data asynchronously[^1] based on the argument passed (`url`) using the `fetch()` function—a promise-based API for performing HTTP requests. Once the data is fetched, the state is updated, and the hook returns the result of the fetching along with the loading state.


[^1]: [[Fetching data asynchronously in JS means retrieving data without blocking the main thread of execution]]. This allows the application to continue running while the data is being fetched. When we initiate a fetch operation, we send a promise that represents the eventual completion or failure of that operation. The main thread remains free to execute other code until the promise is resolved or rejected. Once the response is received, we need to implement specific control flow in the code to handle each scenario, such as processing the data on successful completion or managing errors when the fetch fails.

