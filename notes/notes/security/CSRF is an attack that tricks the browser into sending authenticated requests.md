---
type: definition
---

CSRF works because browsers automatically include cookies in requests to a site where the user is already authenticated. The attacker doesn't need JavaScript access to those cookies — they just need the browser to fire a request (a form submission, an image tag, anything that triggers a cross-site request with credentials attached).

This is why CORS does not prevent CSRF. CORS controls whether JavaScript can *read* responses from another origin. CSRF is about *sending* requests, not reading responses — the two don't overlap.

Protection methods:

- **CSRF tokens** — the server issues a secret token with the session; every state-changing request must include it. A cross-site request can't include it because the attacker can't read it.
- **SameSite cookies** (`Lax` or `Strict`) — the browser won't send the cookie on cross-site requests at all.
- **Checking Origin / Referer headers** — the server verifies the request came from its own origin.

Related: [[CORS controls which origins can read responses in the browser]], [[XSS is when an attacker injects JavaScript into a trusted site]]
