---
type: claim
tags:
  - ai
---
A deterministic program produces the same output for the same input every time. AI language models don't — the same prompt can produce different responses across runs. This is because the model doesn't compute a fixed answer; it predicts each next token by sampling from a probability distribution learned from training data.

Both the input and output are represented as tokens — not exactly words, but smaller units. The model reads the input as tokens and generates output one token at a time, each token conditioned on everything before it.

This matters in practice: AI outputs should be reviewed, not trusted as deterministic. Testing AI behavior means testing distributions, not exact strings.

Related: [[The context window is the AI model's working memory]]
