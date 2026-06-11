---
tags:
  - anki-cards
source: "[[business rules belong in pure TypeScript functions, not in React components]], [[the RuleResult pattern encodes validation outcomes as a discriminated union]], [[form validation checks structure, domain validation checks permission]], [[extract to lib when the rule would exist without a UI]]"
---

TARGET DECK
programming languages::frameworks and libraries::react js

START
Basic
Front: Where should business rules live in a React application?
Back: In pure TypeScript functions with zero framework dependencies — not in components or hooks. A separate domain layer (lib/rules) holds functions that encode what the application allows and forbids.
Tags: react architecture business-logic domain
<!--ID: 1779385226010-->
END


TARGET DECK
programming languages::frameworks and libraries::react js

START
Basic
Front: Why should business logic not live inside React components? (3 reasons)
Back: Testability — testing a rule in a component requires mounting React, mocking hooks, simulating events; a pure function just needs input and output. Reusability — a rule in a component can't be imported by API middleware or a CLI tool. Readability — mixing "how it looks" and "what's allowed" in one file forces the reader to mentally separate them.
Tags: react architecture business-logic testing
<!--ID: 1779385226022-->
END


TARGET DECK
programming languages::frameworks and libraries::react js

START
Basic
Front: What are the three layers in a React app that separates business logic from UI?
Back: Components (UI layer) — what the user sees and clicks. Hooks (data layer) — where data comes from and goes. lib/rules (domain layer) — pure functions encoding what's allowed and what's not. Each layer only calls the one below it.
Tags: react architecture layers domain
<!--ID: 1779385226031-->
END


TARGET DECK
programming languages::frameworks and libraries::react js

START
Basic
Front: What is the RuleResult pattern?
Back: Every domain rule function returns the same discriminated union: { valid: true } | { valid: false; message: string }. The caller checks valid to branch; message is automatically available on failure. Rules can be composed with early returns without special handling.
Tags: react domain rule-result typescript discriminated-union
<!--ID: 1779385226040-->
END


TARGET DECK
programming languages::frameworks and libraries::react js

START
Cloze
Text: type RuleResult = {{c1::{ valid: true } | { valid: false; message: string }}}
Tags: react typescript rule-result
<!--ID: 1779385226048-->
END


TARGET DECK
programming languages::frameworks and libraries::react js

START
Basic
Front: What is the difference between form validation and domain validation?
Back: Form validation (Zod + React Hook Form) checks input structure — is the format correct, is amount a number? Domain validation (pure rule functions) checks permission and state — does the account have enough balance, is it frozen? They run in sequence: structural check first, then contextual check.
Tags: react validation domain form zod
<!--ID: 1779385226056-->
END


TARGET DECK
programming languages::frameworks and libraries::react js

START
Basic
Front: What is the heuristic for deciding whether to extract logic to lib/ or keep it inline in a component?
Back: Ask: would this rule exist without a UI? If yes — it's a domain constraint (e.g. "savings accounts can't go negative") — extract it. If it only makes sense in the UI context (e.g. "disable the button while submitting") — keep it inline.
Tags: react architecture domain extraction heuristic
<!--ID: 1779385226064-->
END
