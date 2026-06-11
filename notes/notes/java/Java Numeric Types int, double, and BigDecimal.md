---
type: definition
tags:
  - java
---

## `int`

Use `int` for whole numbers:

```java
int age = 25;
int quantity = 10;
```

Characteristics:

- Stores only integers.
    
- Exact arithmetic within its range.
    
- Compile-time error if assigned a decimal value.
    

```java
int x = 5.0; // Error
```

This strictness helps catch logic errors early.

---

## `double`

Use `double` for values that can contain fractions:

```java
double temperature = 21.5;
double distance = 3.75;
```

Characteristics:

- Can store both `5` and `5.0`.
    
- Uses floating-point representation (IEEE 754).
    
- Fast and memory efficient.
    
- Cannot represent many decimal values exactly.
    

Example:

```java
double x = 0.1 + 0.2;
System.out.println(x);
```

Output:

```text
0.30000000000000004
```

### Common Pitfall

```java
double a = 0.1 + 0.2;

System.out.println(a == 0.3); // false
```

Floating-point values should usually be compared using a tolerance rather than `==`.

---

## Why Not Use `double` Everywhere?

Although `double` accepts both integers and decimals:

```java
double x = 5;
double y = 5.0;
```

it can hide bugs.

Example:

```java
double people = 5;
people += 0.5;
```

The code compiles, but having `5.5` people likely makes no sense.

Choose a type based on what the value represents, not based on what values might accidentally occur.

---

## `BigDecimal`

Use `BigDecimal` when exact decimal precision is required, especially for money.

```java
BigDecimal price = new BigDecimal("19.99");
```

Advantages:

- Exact decimal arithmetic.
    
- No floating-point rounding errors.
    
- Commonly used in banking, accounting, and financial applications.
    

Example:

```java
BigDecimal a = new BigDecimal("0.1");
BigDecimal b = new BigDecimal("0.2");

System.out.println(a.add(b));
```

Output:

```text
0.3
```

### Important

Avoid:

```java
new BigDecimal(0.1)
```

Prefer:

```java
new BigDecimal("0.1")
```

or

```java
BigDecimal.valueOf(0.1)
```

---

## Rule of Thumb

|Type|Use For|
|---|---|
|`int`|Counts, indexes, quantities|
|`long`|Large whole numbers|
|`double`|Measurements, scientific calculations, graphics|
|`BigDecimal`|Money and exact decimal arithmetic|

## Key Insight

- `int` is exact but only for whole numbers.
    
- `double` is an approximation of real numbers.
    
- `BigDecimal` is exact for decimal arithmetic but slower and more verbose.
    
- Choose the type that matches the meaning of the data, not the one that accepts the most values.