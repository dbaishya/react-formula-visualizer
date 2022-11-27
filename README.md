# Getting started with react-formula-visualizer

## Formula spec

The language is built using the following rules (note that these are not formally correct, rather, an illustration):

```
EXPR = BINARY_EXPR
    | FUNCTION
    | UNARY_EXPR
    | NUMBER
    | STRING
    | PARAMETER
    | PI
    | "(" EXPR ")"

BINARY_EXPR = EXPR + EXPR
    | EXPR - EXPR
    | EXPR * EXPR
    | EXPR / EXPR

FUNCTION = <FunctionName>"(" (EXPR (EXPR)*)? ")"

UNARY_EXPR = "-" EXPR

NUMBER = [Float or Integer Number]

STRING = "'"[String]"'"

PARAMETER = "$"[PARAMETER_NAME]

PI = "PI"
```

The following examples are valid queries

```
PI * SQR($r)

($b + SQRT (SQR($b) - 4 * $a)) / (2 * $a)
```

## Notes

- Unary Expression - sample data doesn't have any example of unary expression. Unary expression type are excluded from the implementation.
- String value - sample data doesn't have any example of string expression. String type are excluded from the implementation.

### **@note** - look for `@note` in the source code for additional comments on author's design decisions.

---

## Installation

- Option 1. Using github bundle

1. Clone repo

```
$: git clone react-formula-visualizer.bundle react-formula-visualizer
```

2. Go to project directory

```
$: cd react-formula-visualizer
```

3. Install project dependencies

```
$: yarn install
```

4. Start project in local webserver

```
$: yarn start
```

5. **Optional:** Run unit test suite

```
$: yarn test
```

6. **Skipped:** Production build version not tested

```
$: yarn build
```

---

- Option 2. Using source zip file

1. Download and unzip source zip file

2. Go to project directory

```
$: cd react-formula-visualizer
```

3. Install project dependencies

```
$: yarn install
```

4. Start project in local webserver

```
$: yarn start
```

---
