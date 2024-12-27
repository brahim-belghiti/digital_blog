---
title: "Techniques to practice about React JS"
description: ""
date: "Mar 17 2024"
tags: ["react-js"]
url: "techniques-to-practice-about-react-js"
---

some of the workflows and best practices.
### passing props
one of the most use design pattern. and used separating logic component from display components, and create composing modular components

### Using a Layout Component
**Problem Statement**  
When multiple pages in an application share common elements (e.g., navigation, footer, or a menu in a dashboard), replicating these components [[in React JS components are reusable pieces of UI that can be defined as functions (or classes) that return elements, often written in JSX|components]] on every page becomes redundant and error-prone. Instead, we can create a root `Layout` component that encapsulates these shared elements and renders specific page content dynamically. 

**Solution**  
Define a `Layout` component that acts as a wrapper for shared components and renders child components dynamically,  the child components are passed as [[in React JS props are used to pass data from a parent component to a child component|props]] :

```typescript

/** the layout component */
const Layout=({children}:{childre: React.ReactNode})=>{
return (
<>
<header>
<nav>
  what whill be shard between all pages
</nav>
</header>
  <main>
  {children}
  </main>
</>
);
}

 /** using the layout component */

 const page = ()=> {
  return (
  <>
    <Layout>
    <section>
     <p>the content of the page</p>
    </section>
    </Layout>
  </>
  )
 
 }
```

**Key Benefits**  
- **Reusability**: Centralizes shared elements in a single component.  
- **Consistency**: Ensures layout elements like navigation or footers remain uniform across pages.  
- **Maintainability**: Any change to shared elements is done in one place.  

### Authentication Flow 
**Problem Statement**  
Authentication ensures that the user requesting access to the application is valid. The goal is to securely validate user credentials while providing feedback and ensuring a good user experience.
**Solution Breakdown**  
1. **UI Management**:  
   - **State Management**: Use `useState` or `useReducer` for managing input values and UI states (loading, errors, etc.).  
   - **Input Validation**: Libraries like [Zod](https://zod.dev/) can ensure input adheres to required schemas.  

1. **Backend Communication**:  
   - **Request Handling**: Use `useEffect` for communicating with the server.  
   - **Custom Hook**: Abstract the request logic into a custom hook for better reusability and encapsulation. 
```typescript
import { useState } from "react";
import { z } from "zod";
# shema validation with zod
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
/** custom hooks for communicating with the backend (Authentification happens on the server) */
const useAuthenticate = ()=>{
const [loading, setLoading] = useState(false)
useEffect(()=>{
   setLoading(true);
   try{
      cnst re
   }
   catch (error) {
   }
   finaly {
   }

}, [])
}
/** component for the UI that handles getting data from the user and displayig back the repsonse */

```

### **Authorization**

**Problem Statement**  
authorization is about making sure the identified user, have access the features of the application in react term, that the user have access to routes.
authorization happens in the back-end first, and then depending on the answer from the server you either give access the user request on not.

**Solution breakdown**
using the concept of **conditional rendering** you can show the parts of the application that user has access to.
**Solution**
- Perform authorization checks on the server.
- On the client, use **conditional rendering** to hide unauthorized features.
- For route protection, use libraries like `react-router` to implement guards.

```typescript
const ProtectedComponent = ({ isAuthorized }: { isAuthorized: boolean }) => {
  return (
    <div>
      {isAuthorized ? (
        <p>Welcome to the protected content.</p>
      ) : (
        <p>You do not have access.</p>
      )}
    </div>
  );
};
```

### fetching data
fetching data, is a site effect, is a state that lives in the server. so you need to use a mechanism to deal with fetching data form the server and synchronize it with client application state. React offers the [[useEffect is a hook for performing side effects|useEffect]] to deal with side Effect. And they are third library for better workflows and patters like SWR and React Query.

**Best Practices**

- fetching date asynchronously  
- having a loading state to use display UI when data is loading
- managing error and have UI to display to the user if an error happens.
- cash the fetched data for better performance 
- re-fetch data periodically to have the data always updated

```typescript
import { useEffect, useState } from "react";

const useFetchData = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

// Usage
const DataComponent = () => {
  const { data, loading, error } = useFetchData("/api/data");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return <div>{JSON.stringify(data)}</div>;
};

```

### Extracting Custom Hooks

**Problem Statement**
As React applications grow in complexity, combining logic and UI in the same component makes the code harder to maintain, test, and reuse. Separating logic into custom hooks can resolve this issue.

**Solution**
[[custom hooks in React abstract reusable logic and separate it from the rendering process in components, enhancing code reuse, readability, and maintainability across the application.]]

**Key Benefits**

- **Reusability**: Logic can be reused across multiple components.
- **Separation of Concerns**: Keeps components focused on UI.
- **Simplified Testing**: Hooks can be tested independently of UI.

### Composing Modular Components

**Problem Statement**
Complex components often become bloated and difficult to manage. Breaking them into smaller, reusable pieces improves readability and maintainability.

**Solution**
[[the most important design pattern in React is component composition.]] and it is done by [[extracting components in React promotes re-usability, adheres to the single responsibility principle, enhances readability, simplifies testing, and improves encapsulation of functionality, resulting in a more maintainable code-base.]]

**Key Benefits**

- **Reusability**: Smaller components can be reused across the app.
- **Readability**: Simplifies understanding of individual components.
- **Scalability**: Easier to manage and extend functionality.


### Separating Logic Components from Display Components

**Problem Statement**
Mixing logic and display code in the same component makes it harder to test, reuse, and maintain.

**Solution**
Create container components for logic and presentation components for UI. Pass data as props from the container to the presentation component.

```typescript
// this the logic component responsile for logic (in this case it has data, but normaly the data will be fetched form a server)
const BlogContainer = () => {
  const blogData = [
    { id: 1, title: "First Post" },
    { id: 2, title: "Second Post" },
  ];

  return <BlogList blogs={blogData} />;
};

// this is the presentation component is only responsible for displaying data passed to it by props.
const BlogList = ({ blogs }: { blogs: { id: number; title: string }[] }) => {
  return (
    <ul>
      {blogs.map((blog) => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </ul>
  );
};
```

**Key Benefits**
- **Readability**: Clear separation between logic and UI.
- **Reusability**: Presentation components can be used in multiple places.
- **Testability**: Logic can be tested independently.

### Routing

**Problem Statement**
Single Page Applications (SPAs) need routing to navigate between different views or pages. Managing routes effectively is essential for user experience and maintainability.

**Solution**
Use libraries like `react-router` or frameworks like Next.js to define routes and handle navigation.

```typescript
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const HomePage = () => <h1>Home</h1>;
const AboutPage = () => <h1>About</h1>;

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/about" component={AboutPage} />
      </Switch>
    </Router>
  );
};
```

**Key Benefits**

- **Navigation**: Enables seamless transitions between views.
- **Scalability**: Simplifies management of multiple pages.
- **SEO**: Frameworks like Next.js improve search engine optimization.

### Form Validation

**Problem Statement**
Forms are integral to web applications, but ensuring user input is valid can be complex without proper validation techniques.

**Solution**
Use libraries like Zod or React Hook Form for robust form validation.

```typescript
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// the schema for validation with zod
const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
// the form component using the zod schema to validate data on the clinent
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <input {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input type="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <button type="submit">Login</button>
    </form>
  );
};
```

**Key Benefits**

- **User Experience**: Provides immediate feedback to users.
- **Consistency**: Ensures data integrity before submission.
- **Efficiency**: Reduces errors with declarative validation schemas.

### Working with Typescript

**Problem Statement**
React applications require a way to ensure type safety, especially in larger projects. Without TypeScript, type-related errors might only surface at runtime, leading to bugs and inefficiencies.

**Solution**
Use Typescript to define the types of props, state, function parameters, and API responses. This helps catch errors during development and improves code clarity.

```typescript
// Typing component props
interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button = ({ label, onClick }: ButtonProps) => {
  return <button onClick={onClick}>{label}</button>;
};

// Typing API responses
interface User {
  id: number;
  name: string;
}

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch("/api/users");
  return response.json();
};

// Typing hooks
const useCounter = (initialValue: number): [number, () => void] => {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount((prev) => prev + 1);
  return [count, increment];
};
```

**Key Benefits**

- **Type Safety**: Prevents runtime errors by enforcing types at compile time.
- **Documentation**: Acts as self-documenting code.
- **Developer Experience**: Improves autocompletion and reduces debugging time.

### Filtering & Searching Data

**Problem Statement**  
Implementing filtering and searching logic in applications can lead to excessive state management and performance bottlenecks if not handled properly. Derived states can often replace redundant state storage.

**Solution**  
Leverage JavaScript's array methods like `filter` and `map` to dynamically process data. Store only the essential query parameters in the state or URL for persistence.

```typescript
const SearchableList = ({ items }: { items: string[] }) => {
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    return items.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  }, [query, items]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

```

**Key Benefits**

- **Efficiency**: Avoids unnecessary state management by deriving filtered data.
- **Flexibility**: Enables dynamic filtering without pre-computation.
- **Persistence**: Query parameters in the URL allow users to share filtered views.


### Working with Tables

**Problem Statement**  
Displaying tabular data is a common use case in web applications. Without proper libraries, managing features like sorting, pagination, and filtering manually can be cumbersome and error-prone.

**Solution**  
Use a library like [TanStack Table](https://tanstack.com/table/v8) to simplify working with tables. TanStack Table is highly customizable and supports advanced features like server-side pagination, sorting, and filtering.

```typescript
import { useTable, Column } from "@tanstack/react-table";

type Data = {
  id: number;
  name: string;
  age: number;
};

const data: Data[] = [
  { id: 1, name: "John", age: 25 },
  { id: 2, name: "Jane", age: 30 },
  { id: 3, name: "Smith", age: 28 },
];

const columns: Column<Data>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
];

const TableComponent = () => {
  const { getHeaderGroups, getRowModel } = useTable({ data, columns });

  return (
    <table>
      <thead>
        {getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>{header.renderHeader()}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>{cell.renderCell()}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
```

**Key Benefits**  
- **Ease of Use**: Simplifies the implementation of common table features.  
- **Customizability**: Provides flexibility for advanced use cases.  
- **Performance**: Optimized for handling large datasets.

### Using External Libraries

**Problem Statement**  
Building complex features from scratch can be time-consuming and may lead to inconsistent implementations. Relying on community-driven libraries can accelerate development while ensuring best practices.

**Solution**  
Identify and integrate trusted external libraries for specific use cases. For example:
- **State Management**: `Redux`, `Zustand`.
- **Data Fetching**: `React Query`, `Axios`.
- **Form Validation**: `React Hook Form`, `Zod`.
- **Styling**: `Tailwind CSS`, `Styled Components`.

**Key Benefits**  
- **Time Efficiency**: Reduces development effort.  
- **Community Support**: Access to documentation and community expertise.  
- **Standardization**: Encourages adherence to widely accepted patterns.

### i18n (Internationalization)

**Problem Statement**  
Supporting multiple languages in a React application can be challenging without a proper framework for managing translations and locale-based content.

**Solution**  
Use libraries like `react-i18next` to manage translations and locale switching.

```typescript
import { useTranslation } from "react-i18next";

const App = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div>
      <h1>{t("welcome_message")}</h1>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("es")}>Español</button>
    </div>
  );
};
```

**Key Benefits**  
- **Scalability**: Simplifies managing multiple languages.  
- **User Experience**: Provides locale-specific content seamlessly.  
- **Community Support**: Popular libraries like `react-i18next` have extensive resour

### Ways to Improve Performance

**Problem Statement**  
React applications can suffer from performance bottlenecks due to unnecessary re-renders, large bundles, and inefficient state management.

**Solution**  
Optimize performance using the following strategies:
- **Code Splitting**: Use dynamic `import()` to load components only when needed.
- **React.memo**: Prevent unnecessary re-renders of functional components.
- **useMemo** and **useCallback**: Optimize expensive calculations and function references.
- **Lazy Loading**: Defer loading of non-critical resources.

```typescript
import React, { memo, useMemo, useCallback } from "react";

const ExpensiveComponent = memo(({ calculate }: { calculate: () => number }) => {
  const result = useMemo(() => calculate(), [calculate]);
  return <div>Calculated Result: {result}</div>;
});

const ParentComponent = () => {
  const calculate = useCallback(() => {
    return heavyComputation();
  }, []);

  return <ExpensiveComponent calculate={calculate} />;
};
```

**Key Benefits**  
- **Efficiency**: Reduces resource usage and enhances responsiveness.  
- **Scalability**: Handles larger datasets and more complex UIs.  
- **User Experience**: Ensures smoother interactions.

### Ways to Improve SEO

**Problem Statement**  
Single Page Applications (SPAs) face SEO challenges as most content is rendered dynamically via JavaScript, which search engines struggle to index effectively.

**Solution**  
- Use server-side rendering (SSR) frameworks like Next.js to deliver pre-rendered HTML to search engines.
- Optimize metadata with tools like `react-helmet`.
- Implement structured data for rich results in search engines.

```typescript
import { Helmet } from "react-helmet";

const SEOComponent = () => {
  return (
    <Helmet>
      <title>My React App</title>
      <meta name="description" content="This is an example of a React app optimized for SEO." />
    </Helmet>
  );
};
```

**Key Benefits**  
- **Improved Search Rankings**: Enhances visibility on search engines.  
- **Accessibility**: Increases discoverability for a wider audience.  
- **Content Indexing**: Ensures search engines can index the application's content.

### Writing Clean Code in React

**Problem Statement**  
Unorganized or inconsistent code reduces readability, maintainability, and scalability.

**Solution**  
Adopt clean coding practices, including:
- Follow the single-responsibility principle (SRP) for components.
- Use descriptive naming for variables and functions.
- Write reusable and modular components.
- Document components and functions for better collaboration.

**Key Benefits**  
- **Maintainability**: Simplifies code updates and debugging.  
- **Readability**: Makes it easier for new developers to understand.  
- **Scalability**: Enables effortless extension of features.

### Styling Pages

**Problem Statement**  
React applications require flexible and maintainable styling approaches that align with the component-based architecture.

**Solution**  
Use modern styling solutions such as:
- **CSS Modules**: Scoped CSS to avoid naming conflicts.
- **Styled Components**: Write CSS-in-JS with dynamic styling capabilities.
- **Tailwind CSS**: Utility-first framework for rapid development.

```typescript
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: blue;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;

  &:hover {
    background-color: darkblue;
  }
`;

const App = () => <StyledButton>Click Me</StyledButton>;
```

**Key Benefits**  
- **Modularity**: Aligns styles with components.  
- **Maintainability**: Reduces style conflicts.  
- **Flexibility**: Supports dynamic and theme-based styling.


### pass data in the routes
you can pass data in the routes and get them with the browser api.

### state management (different states : global, local, server)
local state : use useState or useReducer
global : useContext or state mangement library like redux
server state : state in the server, use useState with useEffect or a third library like swr or React Query


### conditional rendering
[[conditional rendering is conditioning the rendering of UI elements depending on a value]]

### working with arrays
working with arrays is like javascript, the only thing to be aware off is when rendering elements from array is to make sure each component has it own unique key.

### updating state with useState
update state with useState is very straight forward however, it may be tricky with array and object. so for object and array they must be destructed first then be updated
so it always recorded to use the the full syntax that use the current state as an argument.




