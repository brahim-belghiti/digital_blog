---
tags:
  - moc
  - reactjs
---
# How React turns state into UI

React's contribution to UI engineering is one idea, committed to completely: **`UI = f(state)`**. Everything else in the framework — components, the virtual DOM, hooks, suspense, server components — exists because that equation creates problems, and React is the set of mechanisms that pay for them. This MOC walks the equation and the bills it creates.

## The idea

When React shipped, the prevailing wisdom was separation of concerns: HTML, CSS, and JavaScript in different files. React rejected that — not because separation is wrong, but because the seam was wrong. [[key Things to Know About React|React's seam is the component]]: a function that takes state and returns UI. [[JSX is a syntax extension for JavaScript used in React to describe the structure of the UI, which gets compiled to React.createElement calls under the hood|JSX]] is how you write the UI part as if it were HTML, but it compiles to plain JavaScript function calls. Once you accept the equation, the rest of the framework follows.

## How you express UI

You build apps by composing functions. [[in React JS components are reusable pieces of UI that can be defined as functions (or classes) that return elements, often written in JSX|Components]] are the units; [[in React JS props are used to pass data from a parent component to a child component|props]] are the typed inputs each one accepts; [[the most important design pattern in React is component composition.|composition]] is the assembly. Data flows parent → child, never the other way.

## How state actually drives UI

The naive reading of `UI = f(state)` is "throw away the DOM and rebuild it on every state change." React doesn't do that — it keeps a [[The virtual DOM is a lightweight representation of the actual DOM|virtual DOM]] and uses [[reconciliation is the process by which React determines what has changed in the virtual DOM and updates the actual DOM efficiently|reconciliation]] to compute the minimal real DOM update. [[React Fiber is the re-implementation of React’s reconciliation algorithm, designed to enable concurrent rendering and make updates more efficient|React Fiber]] is the engine that makes this work interruptible and prioritizable.

## Hooks: making f(state) work in functions

Functional components are pure — but real apps need state, side effects, and connections to the outside world. [[Built-in React hooks let you use different React features from your components|Hooks]] are the answer: [[useState is a hook for managing state|useState]] for state, [[useEffect is a hook for performing side effects|useEffect]] for side effects, and several others for the harder cases. The full landscape lives in [[core concepts to understand in React JS|core React concepts]].

## The cost of re-renders

Every state change re-runs the function. That's the equation honored to its conclusion — and it's expensive when you don't need it. [[useMemo is a hook for memorizing expensive calculations|useMemo]], [[useCallback is a hook for memorizing functions|useCallback]], and the broader optimization toolbox pay this bill: skip work that hasn't changed, defer work that isn't urgent, suspend work that isn't ready. [[React Optimizations and improving performance|Optimizations]] covers the full set.

## Architecture is up to you

React is a library, not a framework: it ships the rendering model and the hook API, then leaves application shape to you. [[react application architecture|React application architecture]] covers the patterns that actually work — composition over inheritance, custom hooks for shared logic, separating containers from presenters — and [[features using third party libraries with React|the ecosystem]] fills in what React itself doesn't ship.

## The rules

Hooks-driven React imposes a small set of [[rules of React JS|rules]] you must obey: hooks at the top level only, single-element returns, keys on lists, unidirectional data flow. They aren't style preferences — breaking them silently corrupts the reconciliation model.

## Re-reading

`UI = f(state)` is the pitch. Components express it, the virtual DOM and fiber implement it, hooks make it work in real apps, optimization hooks pay its bill, and the rules keep you inside the model. Everything React adds — server components, suspense, transitions — is a further commitment to the same equation, not a deviation from it.
