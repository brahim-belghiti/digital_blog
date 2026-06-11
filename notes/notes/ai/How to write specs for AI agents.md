---
type: claim
tags:
  - specs
  - ai
  - software-engineering
---

AI agents are literal. A human developer infers intent and asks when something is unclear. An agent builds exactly what you described, filling gaps with its own defaults. Vague input produces output that reflects the agent's assumptions, not your constraints.

A spec that works with an agent needs to close those gaps in advance.

**State all constraints explicitly.** Framework, styling system, database, what not to use — "TypeScript, PostgreSQL, Tailwind, no Redux." Anything unstated gets improvised.

**Define inputs and outputs for each piece.** What the user does, what the system responds, what the data shapes look like. Don't describe intent — describe behavior.

**Add acceptance criteria.** Define what done means before building starts. Inline validation, loading states, retry handling, mobile support. If you can't write a test for it, it isn't specified yet.

**Break into layers.** Frontend, backend, database, auth, infrastructure — keep them separate in the spec. A mixed spec forces the agent to infer boundaries between concerns.

**Specify edge cases.** API timeout, empty results, duplicate submission, expired auth, offline mode. These are the cases that become bugs when unspecified.

**Think like a tester.** Ask "how would I verify this?" before writing the feature. If you can answer it precisely, the spec is solid enough to build from.

This approach also works for organizing your own thinking before building — the act of writing a spec surfaces gaps before they become implementation problems.

Related: [[A spec is a precise description of what a system should do]]
