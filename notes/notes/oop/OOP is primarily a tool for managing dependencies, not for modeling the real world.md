---
type: opinion
tags:
  - oop
  - software-design
---
OOP is marketed as a way to model the real world — give objects names from the domain, have them behave like their real counterparts. But this framing misleads.

The real value of OOP is that it gives you control over dependency direction. Without OOP, the flow of control in a program runs downward: high-level modules depend on low-level modules. A change in a low-level module forces the high-level module to recompile and change. The code becomes rigid and fragile.

OOP solves this through polymorphism. You introduce an interface between the two modules. The high-level module depends on the interface, not on the implementation. The low-level module implements the interface. Now the source code dependency points against the flow of control. You can change the low-level module without touching the high-level one. You can swap implementations without the high-level module noticing.

This is the actual power of OOP: the ability to selectively invert dependencies at key points in your architecture. Rigidity, fragility, and non-reusability are all symptoms of unmanaged dependencies. OOP is a set of tools for managing them.

The "model the real world" framing sometimes produces good abstractions and sometimes produces ones that fit the world but not the codebase's actual needs.

Related: [[polymorphism inverts the dependency between modules by introducing an interface]], [[the bulk of software design is managing dependencies]]
