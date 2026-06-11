---
type: opinion
tags:
  - reactjs
  - architecture
  - domain-driven-design
---
Business rules — the logic that defines what an application allows and forbids — should live in pure TypeScript functions with zero framework dependencies, not inside React components or hooks.

A component has one job: render UI and handle user interaction. A hook has one job: manage data fetching and state. When business logic leaks into either, three things break:

- **Testability** — testing a rule inside a component means mounting React, mocking hooks, simulating events. Testing a pure function means calling it with input and asserting output.
- **Reusability** — a rule buried in a component can't be reused by API middleware, a CLI tool, or a different UI. A pure function can be imported anywhere.
- **Readability** — when a component contains both "how it looks" and "what's allowed," developers have to mentally separate the two. When they're in different files, the separation is physical.

The structure that enforces this:

```
Components (UI Layer)     → what the user sees and clicks
Hooks (Data Layer)        → where data comes from and goes
lib/rules (Domain Layer)  → what's allowed and what's not
```

Each layer only calls the one below it. A component calls a hook, a hook calls a rule function. Never the reverse.

```typescript
// ❌ logic inside the component
function TransferForm({ from, to }: Props) {
  const onSubmit = (data: TransferData) => {
    if (from.status === "frozen") { setError("Ce compte est gelé"); return }
    if (from.type === "savings" && from.balance < data.amount) { setError("Solde insuffisant"); return }
    if (from.id === to.id) { setError("Même compte"); return }
  }
}

// ✅ pure domain functions in src/lib/transaction-rules.ts
function validateTransfer(from: Account, to: Account, request: TransferRequest): RuleResult {
  const fromCheck = canTransact(from)
  if (!fromCheck.valid) return fromCheck
  if (from.id === to.id) return { valid: false, message: "Impossible de transférer vers le même compte" }
  if (request.amount <= 0) return { valid: false, message: "Le montant doit être supérieur à 0" }
  if (from.type === "savings" && from.balance < request.amount) return { valid: false, message: "Solde insuffisant" }
  return { valid: true }
}

// ✅ component stays thin
function TransferForm({ from, to }: Props) {
  const onSubmit = (data: TransferData) => {
    const check = validateTransfer(from, to, data)
    if (!check.valid) { setError(check.message); return }
    mutation.mutate(data)
  }
}
```

This is the frontend application of Clean Architecture, DDD, and Hexagonal Architecture: the part of the code that encodes how things work should not depend on how things are displayed.

Related: [[the RuleResult pattern encodes validation outcomes as a discriminated union]], [[form validation checks structure, domain validation checks permission]], [[extract to lib when the rule would exist without a UI]]
