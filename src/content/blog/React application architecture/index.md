---
title: "react application architecture"
description: "react application architecture"
date: "Dec 19 2024"
tags: ["react-js"]
url: "react-application-architecture"
---

React is a library not a framework, so React doesn't impose a structure for your application, how many pattern have been established to build maintainable, scale-able React applications

### **Container-Presenter Pattern**

**Detailed Description**

- **Container Component**: Handles all logic, such as fetching data, state management, and event handlers. It passes data and functions as props to the Presenter component.
- **Presenter Component**: Focuses on rendering the UI, accepting props from the container.

 **Why Use This Pattern?**

- Keeps components lean and focused on a single concern.
- Simplifies testing as logic and UI are isolated.
- Promotes reusability, as Presenter components can be reused with different data sources.

 **Example Implementation**

```typescript
// Container Component
const UserContainer = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return <UserList users={users} />;
};

// Presenter Component
const UserList = ({ users }: { users: User[] }) => (
  <ul>
    {users.map((user) => (
      <li key={user.id}>{user.name}</li>
    ))}
  </ul>
);

// App Component
const App = () => <UserContainer />;
```


### **Hooks**

**Detailed Description**

- Encapsulate logic into custom hooks to make it reusable and separate it from rendering concerns.

 **Why Use This Pattern?**

- Makes logic reusable and composable.
- Keeps components cleaner by extracting non-UI logic.

 **Example Implementation**

```typescript
// the custom hook useFetch
const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, loading };
};

// Usage
const App = () => {
  const { data, loading } = useFetch("/api/data");
  return loading ? <p>Loading...</p> : <div>{JSON.stringify(data)}</div>;
};
```



### using a clear folder structure
use a folders to separate concerns.
```
├── components
│   ├── ui
│   │   ├── DataTable.tsx
│   │   ├── accordion.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── alert.tsx
│   │   ├── button.tsx
│   │   ├── checkbox.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   └── table.tsx
│   ├── complex componnents
│   │   ├── Navabar.tsx
│   │   └── ...
├── config
│   ├── env.ts
├── constants
│   ├── data.ts
├── hooks
│   ├── useAuth.tsx
│   ├── useDebounce.tsx
│   ├── useFetch.tsx
│   ├── useLocale.tsx
│   ├── useParams.tsx
│   └── useTranslation.tsx
│   └── ...
├── layouts
│   ├── main.tsx
│   ├── ..
├── pages
│   ├── 404.tsx
│   ├── forgot-password.tsx
│   ├── index.tsx
│   ├── login.tsx
│   └── ...
├── public
│   ├── Assets
├── services
├── styles
├── types
├── utils
│   └── helpers
│   │   ├── index.ts
│   │   └── validators.ts


```

### Using utils and helper functions
extract logic into helpers functions inside a utils folder, and files inside the folder are pure typescript. to avoid being tied to React paradigm if you don't have to (sometime even custom hooks can be just be extracted to be a pure typescript instead of being a React function.) 
