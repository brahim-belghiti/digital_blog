---
type: definition
tags:
  - ai
---
Every time an AI model generates a response, it processes the entire context: system instructions, the full conversation history, and the current prompt. This context is bounded — the context window is the maximum amount of text the model can see at once.

The model has no persistent memory outside of what's in the context window. Older messages don't get retained; they're either still in the window or they're gone.

This has practical consequences:

- A large context window increases token usage and cost on every request.
- Old messages that are no longer relevant to the current task add noise without benefit.
- Starting a new conversation (or trimming context) when the history is no longer useful keeps responses focused and cost lower.

The right size of context is the minimum needed to produce good responses for the current task.

Related: [[AI models are probabilistic not deterministic]]
