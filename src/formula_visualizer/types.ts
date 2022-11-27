/**
 * @note
 *  adopted naming convention - using `FV` as the prefix
 *  for various type and variable names, which are internal
 *  to the formula visualizer component.
 *  @example -
 *    FVProvider and FVContext to represent formula visualizer
 *      provider and context.
 */

export type FVExpression =
  | Paren
  | Division
  | Multiplication
  | Addition
  | Subtraction
  | Function
  | Variable
  | Number
  | Pi
  | Noop

export type FVExpressionId = string

/**
 * @note
 *  since sample data doesn't have any example of unary expression
 *  UnaryExpression type are excluded from the implementation.
 */
type UnaryExpression = unknown

type Paren = {
  type: 'PAREN'
  expression: FVExpression
  id?: string
}

type Division = {
  type: 'DIVISION'
  left: FVExpression
  right: FVExpression
  id?: string
}

type Multiplication = {
  type: 'MULTIPLICATION'
  left: FVExpression
  right: FVExpression
  id?: string
}

type Addition = {
  type: 'ADDITION'
  left: FVExpression
  right: FVExpression
  id?: string
}

type Subtraction = {
  type: 'SUBTRACTION'
  left: FVExpression
  right: FVExpression
  id?: string
}

type Function = {
  type: 'FUNCTION'
  name: Uppercase<string>
  arguments: Array<FVExpression>
  id?: string
}

type Variable = {
  type: 'VARIABLE'
  name: `$${string}`
  id?: string
}

type Number = {
  type: 'NUMBER'
  value: number
  id?: string
}

/**
 * @note
 *  sample data doesn't have any example for String.
 *  skipped from implementation
 */
type String = unknown

/**
 * @note
 *  sample data doesn't have any example for PI
 *  assumption: shape of PI data is
 *  {
 *    type: 'PI',
 *  }
 */
type Pi = {
  type: 'PI'
  value: 3.141592653589793
  id?: string
}

/**
 * @note
 *  Noop expressions are used as an alias for
 *  AST nodes which are flagged for deletion
 */
type Noop = {
  type: 'NOOP'
  id?: string
}
