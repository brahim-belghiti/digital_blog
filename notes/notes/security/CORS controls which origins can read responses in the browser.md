---
type: definition
---

CORS (Cross-Origin Resource Sharing) is a browser mechanism that controls whether JavaScript on one origin can read responses from another origin. The server sends headers like `Access-Control-Allow-Origin` to tell the browser which origins are permitted. If the origin isn't allowed, the browser blocks JavaScript from reading the response — but the request was still sent and the server still processed it.

Two important clarifications:

- CORS is enforced by the **browser**, not the server. A curl request or a server-to-server request ignores CORS entirely.
- CORS controls **reading responses**, not **sending requests**. The server receives and processes the request regardless. This is why CORS does not protect against CSRF.

CORS is not an API access control. It is a browser-side safety mechanism to prevent one website's JavaScript from silently reading data from another.

Related: [[CSRF is an attack that tricks the browser into sending authenticated requests]]
