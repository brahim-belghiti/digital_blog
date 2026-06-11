---
type: claim
tags:
  - reactjs
  - typescript
  - architecture
---
Every rule function in the domain layer returns the same shape:

```typescript
type RuleResult = { valid: true } | { valid: false; message: string }
```

This is a discriminated union. The caller checks `valid` to branch, and gets `message` automatically when it's `false`. The caller doesn't need to know which rule failed — only whether it passed and what to show.

Three consequences of this consistency:

- Any rule can be composed with any other rule — `if (!check.valid) return check` chains them without special handling.
- The UI handles all failures the same way regardless of which rule triggered.
- New rules can be added without changing the component.

This is the Result pattern (also called Either in functional programming): encoding success and failure in the type system rather than relying on thrown exceptions.

Related: [[business rules belong in pure TypeScript functions, not in React components]]
