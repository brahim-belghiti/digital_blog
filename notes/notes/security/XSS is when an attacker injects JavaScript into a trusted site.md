---
type: definition
---

XSS (Cross-Site Scripting) is when an attacker gets malicious JavaScript to run inside a site the user trusts. Because the script runs under that site's origin, it has the same access as legitimate scripts on the page: it can read cookies (unless HttpOnly), make requests, steal data, and perform actions as the user.

Three types:

- **Stored XSS** — malicious script is saved in the database and served to all users who load the page
- **Reflected XSS** — script is embedded in a URL or query parameter and reflected back in the response
- **DOM-based XSS** — client-side JavaScript writes attacker-controlled data into the DOM without sanitizing it

Prevention: escape all user-supplied output before rendering it in HTML. Frameworks like React do this by default; the risk comes from bypassing it (dangerouslySetInnerHTML, `{!! !!}` in Blade).

Related: [[HttpOnly cookies cannot be read or modified by JavaScript]], [[CSRF is an attack that tricks the browser into sending authenticated requests]]
