# Getting started with react-formula-visualizer

## Author Notes

- Packaging - ideally, `react-formula-visualizer` should be packaged as a standalone npm react library. In the absence of npm lib, entirety of the component source is abstracted inside [`formula_visualizer`](src/formula_visualizer) directory.
- Component APIs/exports:
  - `FormulaVisualizer` is the main exported component. This react component requires a single prop named `ast`, which conforms to the type `FVExpression`.
  - `type`(s) are exported to the consumer for convenience.
  - A `useFVUtils` custom hook is exported for convenience as well. Hook provides utilities like ID generation and parsing formula.
- Component state management:
  - `FormulaVisualizer` uses an internal React Context named `FVProvider` for its state management.
  - Inner workings of the context is abstracted from the consumer.
- MVP Features:
  - Plaintext visualization - generate a formula string from the tree.
  - Interactive visualization - syntax tree visualized as an interactive formula. Enables deletion of nodes from the tree through UI interactions. Invalid node deletions are highlighted.
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

5. **Skipped:** Run unit test suite

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
