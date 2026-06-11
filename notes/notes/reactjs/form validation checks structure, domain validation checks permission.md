---
type: claim
tags:
  - reactjs
  - architecture
---
Two kinds of validation exist in a React application and they answer different questions:

| Layer | Tool | Question |
|---|---|---|
| Form validation | Zod + React Hook Form | Is the input well-formed? (valid email format, amount is a number) |
| Domain validation | Pure rule functions | Is this operation permitted? (account has enough balance, account is not frozen) |

Form validation is structural — it checks shape and type. Domain validation is contextual — it checks state and business rules. They run at different moments and fail for different reasons.

The flow:

```
User submits form
  → Zod validates form shape (structural)
  → Rule functions validate business logic (contextual)
  → Both pass → hook calls the API
  → Either fails → show error, don't call API
```

A common confusion: "isn't Zod already handling validation?" Zod can confirm that `amount` is a positive number. It cannot confirm that the account has sufficient balance — that requires live data and domain knowledge.

Related: [[business rules belong in pure TypeScript functions, not in React components]], [[the RuleResult pattern encodes validation outcomes as a discriminated union]]
