---
tags:
  - anki-cards
---
Think of your program as a **graph of references**, not variables.

**Reachability > Everything**
Garbage collection depends only on **reachability**, not:

- primitive vs object
- mutable vs immutable

**Value vs Reference Semantics**
- Primitives → value semantics (copied)
- Objects → reference semantics (shared)


TARGET DECK
programming languages::language specific concepts

START
Basic
Front: What is a value in JavaScript?  
Back: A piece of data stored in memory (e.g., number, string, object, array).  
Tags: javascript fundamentals memory 
<!--ID: 1777068714521-->
END




TARGET DECK
programming languages::language specific concepts

START
Basic
Front: Do values occupy memory in JavaScript?  
Back: Yes, all values (primitives and objects) occupy memory while they are reachable.  
Tags: javascript memory fundamentals
<!--ID: 1777068819868-->
END



TARGET DECK
programming languages::language specific concepts
START
Basic
Front: What is a variable in JavaScript?  
Back: A binding that associates a name with a value or a reference to a value.  
Tags: javascript variables fundamentals
<!--ID: 1777068886645-->
END



TARGET DECK
programming languages::language specific concepts
START
Basic
Front: What does a variable store for primitive values?  
Back: The actual value (or something very close to it, depending on the engine).  
Tags: javascript primitives memory
<!--ID: 1777068911444-->
END



TARGET DECK
programming languages::language specific concepts
START
Basic
Front: What does a variable store for objects in JavaScript?  
Back: A reference (pointer) to the object in memory.  
Tags: javascript objects references
<!--ID: 1777068934693-->
END




TARGET DECK
programming languages::language specific concepts
START
Basic
Front: What is the relationship between variables and values?  
Back: Variables reference values; values are the actual data stored in memory.  
Tags: javascript fundamentals references
<!--ID: 1777068949169-->
END




TARGET DECK
programming languages::language specific concepts
START
Basic
Front: When is a value removed from memory in JavaScript?  
Back: When it is no longer reachable from any reference (eligible for garbage collection).  
Tags: javascript garbage-collection memory
<!--ID: 1777068965542-->
END




TARGET DECK
programming languages::language specific concepts
START
Basic
Front: What determines if a value stays in memory?  
Back: Reachability from the root set (global scope, stack, closures).  
Tags: javascript garbage-collection fundamentals
<!--ID: 1777068988796-->
END




TARGET DECK
programming languages::language specific concepts
START
Basic
Front: Do values disappear when they are referenced by variables?  
Back: No, values remain in memory as long as they are referenced.  
Tags: javascript misconceptions memory
<!--ID: 1777069007792-->
END




TARGET DECK
programming languages::language specific concepts
START
Basic
Front: Do primitive values live forever in JavaScript?  
Back: No, they are garbage collected when no longer reachable.  
Tags: javascript misconceptions memory
<!--ID: 1777069067948-->
END


TARGET DECK
programming languages::language specific concepts
START
Basic
Front: What does immutability mean for primitive values?  
Back: Their value cannot be changed; any modification creates a new value.   
Tags: javascript immutability primitives
<!--ID: 1777069119344-->
END



TARGET DECK
programming languages::language specific concepts
START
Basic
Front: Are objects immutable in JavaScript? 
Back: No, objects are mutable; their properties can be changed.  
Tags: javascript objects mutability
<!--ID: 1777069202689-->
END



TARGET DECK
programming languages::language specific concepts
START
Basic
Front: Does mutability affect memory lifetime in JavaScript? 
Back: No, memory lifetime depends on reachability, not mutability.  
Tags: javascript objects mutability
<!--ID: 1777069241315-->
END



TARGET DECK
programming languages::language specific concepts
START
Basic
Front: What happens when two variables reference the same object? 
Back: Both point to the same memory location, so changes affect both. 
Tags:  javascript references objects
<!--ID: 1777069340732-->
END


TARGET DECK
programming languages::language specific concepts
START
Basic
Front: What happens when you assign one primitive variable to another?
Back: The value is copied, creating an independent value.  
<!--ID: 1777069965906-->
END



TARGET DECK
programming languages::language specific concepts
START
Basic
Front: What is the conceptual difference between stack and heap in JavaScript?  
Back: Stack stores variable bindings; heap stores objects and complex values.
<!--ID: 1777070004605-->
END


TARGET DECK
programming languages::language specific concepts
START
Basic
Front: What triggers garbage collection in JavaScript?  
Back: When a value becomes unreachable (no references point to it).  
<!--ID: 1777070026790-->
END



TARGET DECK
programming languages::language specific concepts
START
Basic
Front: What is the correct mental model for JavaScript memory?  
Back: A graph of references where variables point to values in memory.  
<!--ID: 1777070046787-->
END



TARGET DECK
programming languages::language specific concepts
START
Basic
Front: What is a common misconception about values and memory?  
Back: That values disappear when referenced; in reality, they disappear when no references remain.  
<!--ID: 1777070063760-->
END





