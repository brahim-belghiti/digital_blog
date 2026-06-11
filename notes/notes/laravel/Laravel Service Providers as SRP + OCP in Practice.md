---
type: claim
tags:
  - solid
  - srp
  - ocp
---
Laravel Service Providers are where you tell the framework how to wire dependencies — "when someone asks for X, give them Y." For example, binding `PaymentGateway::class` to `StripeGateway::class` means the rest of the application only knows about the interface, never the concrete implementation. This is OCP — switching to PayPal means changing one line in the provider, not modifying any code that uses the gateway. Each Service Provider also handles one area: `AuthServiceProvider` wires authentication, `EventServiceProvider` wires events. This is SRP — each provider has one reason to change. Together, Service Providers show both principles working at the same time: OCP through interface-to-implementation binding, SRP through focused providers that each own one area of wiring.

**Connections:** [[Open Close Principle, Extend Without Modifying]] — the binding mechanism is what makes code open for extension without modification. [[Single responsibility principle - One Reason to Change, Not One Thing]] — each provider changing for one reason. [[How SRP and OCP Relate to Each Other]] — a concrete example of both principles reinforcing each other.

