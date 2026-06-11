---
type: definition
---

The `HttpOnly` flag on a cookie tells the browser to keep it inaccessible to JavaScript. `document.cookie` won't show it. This is a defense against XSS token theft — even if an attacker injects a script that runs on the page, it can't read the cookie value.

But HttpOnly does not stop the browser from *sending* the cookie in requests. The cookie still gets attached to every matching request automatically. This means an XSS attack can still use the session (by triggering requests from the page), it just can't exfiltrate the raw cookie value.

The combination of `HttpOnly` and `SameSite` covers both directions: HttpOnly prevents reading the token, SameSite prevents it from being sent on cross-origin requests.

Related: [[XSS is when an attacker injects JavaScript into a trusted site]], [[CSRF is an attack that tricks the browser into sending authenticated requests]]
