---
title: "Features using third party libraries with React"
description: ""
date: "Mar 16 2024"
tags: ["react-js"]
url: "features-using-third-party-libraries-with-react"
---

### React Router

**Problem Statement**  
Managing navigation and routing in single-page applications (SPAs) can become complex as the application grows.

**Solution**  
Use [React Router](https://reactrouter.com/) to manage routing and navigation. It supports dynamic routes, nested routes, and route guards.

```typescript
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Home = () => <h1>Home</h1>;
const About = () => <h1>About</h1>;

const App = () => (
  <Router>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </Router> // This was missing the closing tag
);

export default App;

```

---

### Payment with React

**Problem Statement**  
Integrating payment systems in React applications requires secure, seamless, and user-friendly implementation to handle sensitive payment data and transactions.

**Solution**  
Use Stripe's React library (`@stripe/react-stripe-js`) for secure and easy integration of payment systems. It offers pre-built UI components and APIs for managing payment flows.

```typescript
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("your-publishable-key");

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: card!,
    });

    if (error) {
      console.error(error);
    } else {
      console.log("Payment successful", paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

const App = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default App;
```

**Key Benefits**  
- **Security**: Handles sensitive payment data securely.  
- **User Experience**: Provides pre-built, customizable UI components.  
- **Ease of Integration**: Simplifies payment system implementation.

---

### Animation with Framer Motion

**Problem Statement**  
Adding animations to React applications can enhance user experience but requires a balance between simplicity and flexibility.

**Solution**  
Use [Framer Motion](https://www.framer.com/motion/) to implement animations. It offers an intuitive API for declarative animations and gestures.

```typescript
import { motion } from "framer-motion";

const AnimatedComponent = () => (
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    transition={{ duration: 0.5 }}
  >
    <h1>Welcome to the Animated Page</h1>
  </motion.div>
);

export default AnimatedComponent;
```

**Key Benefits**  
- **Ease of Use**: Simple syntax for implementing animations.  
- **Flexibility**: Supports complex animations and gestures.  
- **Performance**: Optimized for smooth and performant animations.

---

### React Hook Form

**Problem Statement**  
Managing form state, validation, and submission in React applications can quickly become complex as forms grow in size and complexity.

**Solution**  
Use [React Hook Form](https://react-hook-form.com/) to simplify form handling. It offers a lightweight API for managing inputs, validations, and submission.

```typescript
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  name: string;
  email: string;
};

const MyForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input {...register("name", { required: "Name is required" })} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>Email</label>
        <input {...register("email", { required: "Email is required", pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: "Invalid email address" } })} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
```

**Key Benefits**  
- **Lightweight**: Minimal impact on application performance.  
- **Validation**: Built-in validation support for common patterns.  
- **Developer Experience**: Simplifies form handling.

---

### React Query

**Problem Statement**  
Fetching, caching, and synchronizing server state in React applications can be complex.

**Solution**  
Use [React Query](https://tanstack.com/query) to manage server state efficiently. It provides hooks for fetching, caching, and synchronizing data.

```typescript
import { useQuery } from "@tanstack/react-query";

const fetchUsers = async () => {
  const response = await fetch("/api/users");
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

const Users = () => {
  const { data, isLoading, error } = useQuery(["users"], fetchUsers);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.map((user: { id: number; name: string }) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default Users;
```

**Key Benefits**  
- **Performance**: Caches server state to minimize redundant requests.  
- **Developer Experience**: Simplifies complex data-fetching logic.  
- **Reactivity**: Automatically refetches stale data.

---

### React Table

**Problem Statement**  
Displaying and managing tabular data in React applications can be tedious and repetitive.

**Solution**  
Use [TanStack Table](https://tanstack.com/table/v8) to implement feature-rich tables.

```typescript
import { useTable, Column } from "@tanstack/react-table";

const data = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
];

const columns: Column[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "age", header: "Age" },
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

export default TableComponent;
```

**Key Benefits**  
- **Customizability**: Easily extendable for advanced features.  
- **Efficiency**: Optimized for performance with large datasets.  
- **Developer Experience**: Simplifies implementation of sorting, filtering, and pagination.

---

### working with Redux
A library based on the reduce function, you have store that component can subscribe too, and update values from it