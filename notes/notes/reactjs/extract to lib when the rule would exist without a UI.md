---
type: claim
tags:
  - reactjs
  - architecture
---
Not every `if` statement is a business rule. The heuristic for deciding whether to extract logic to `lib/`:

- **Extract** if the rule reflects a domain constraint that would exist without a UI. "A savings account can't go negative" is true whether there's a form or not.
- **Keep inline** if it's a UI concern. "Disable the button while submitting" is component state, not a business rule.

The test: would a backend, CLI tool, or API middleware need this same rule? If yes, it's a domain rule and belongs in a pure function. If it only makes sense in the context of this component's UI, it can stay in the component.

Related: [[business rules belong in pure TypeScript functions, not in React components]]
