---
type: claim
tags:
  - reactjs
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

This applies especially to business rules: [[business rules belong in pure TypeScript functions, not in React components|business rules belong in pure TS, not components]]. The domain layer (`lib/rules`) is separate from utils — utils are helpers, rules encode what the application allows and forbids.

### **Higher-Order Components (HOCs)** #torevise
[[HOCs are a design pattern for reusing component logic]]

### **Render Props** #torevise

#### **Detailed Description**

- A pattern where a function is passed as a prop to a component, allowing the caller to define how content is rendered.
- Useful for sharing logic without enforcing component hierarchies.

#### **Why Use This Pattern?**

- Provides greater flexibility compared to HOCs.
- Allows for fine-grained control over rendering.

#### **Example Implementation**

```typescript
const DataFetcher = ({ url, children }: { url: string; children: (data: any) => JSX.Element }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, [url]);

  return data ? children(data) : <p>Loading...</p>;
};

// Usage
const App = () => (
  <DataFetcher url="/api/users">
    {(users) => (
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    )}
  </DataFetcher>
);
```

###  **Compound Components** #torevise

#### **Detailed Description**

- A pattern where components work together to share internal state or context, creating flexible and composable APIs.
- Often used for components like Tabs, Drop downs, or Wizards.

#### **Why Use This Pattern?**

- Simplifies the API for complex components.
- Provides flexibility for consumers to use sub components in any order or combination.

#### **Example Implementation**

```typescript
const Tabs = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child as React.ReactElement<any>, {
          isActive: index === activeTab,
          onActivate: () => setActiveTab(index),
        })
      )}
    </div>
  );
};

const Tab = ({ isActive, onActivate, children }: { isActive: boolean; onActivate: () => void; children: React.ReactNode }) => (
  <button
    style={{
      fontWeight: isActive ? "bold" : "normal",
    }}
    onClick={onActivate}
  >
    {children}
  </button>
);

// Usage
const App = () => (
  <Tabs>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
    <Tab>Tab 3</Tab>
  </Tabs>
);
```

