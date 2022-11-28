import * as Parser from 'src/parser/formula-parser'
import type { FVExpression, FVExpressionId } from './types'

export const parseFormula = (inputFormula: string) => {
  return Parser.parse(inputFormula) as FVExpression
}

export const uniq = () => {
  return Math.ceil(Math.random() * 1000000).toString()
}

export const assignUniqIds = (ast: FVExpression): FVExpression => {
  // BODMAS
  switch (ast.type) {
    case 'PAREN': {
      const expression = ast.expression
      return {
        ...ast,
        id: uniq(),
        expression: assignUniqIds(expression),
      }
    }

    case 'DIVISION':
    case 'MULTIPLICATION':
    case 'ADDITION':
    case 'SUBTRACTION': {
      const leftOperand = ast.left
      const rightOperand = ast.right
      return {
        ...ast,
        id: uniq(),
        left: assignUniqIds(leftOperand),
        right: assignUniqIds(rightOperand),
      }
    }

    case 'FUNCTION': {
      const funcArgs = ast.arguments
      return {
        ...ast,
        id: uniq(),
        arguments: funcArgs.map((arg: any) => assignUniqIds(arg)),
      }
    }

    case 'VARIABLE':
    case 'NUMBER':
    case 'PI':
    case 'NOOP':
      return {
        ...ast,
        id: uniq(),
      }
  }
}

export const convertToPlaintext = (ast: FVExpression) => {
  let plaintextFormula = ''
  const { type } = ast

  // BODMAS
  switch (type) {
    case 'PAREN':
      {
        const expression = ast.expression
        plaintextFormula += `( ${convertToPlaintext(expression)} )`
      }
      break
    case 'DIVISION':
      {
        const leftOperand = ast.left
        const rightOperand = ast.right
        const operator = '/'
        plaintextFormula += `${convertToPlaintext(
          leftOperand
        )} ${operator} ${convertToPlaintext(rightOperand)}`
      }
      break

    case 'MULTIPLICATION':
      {
        const leftOperand = ast.left
        const rightOperand = ast.right
        const operator = '*'
        plaintextFormula += `${convertToPlaintext(
          leftOperand
        )} ${operator} ${convertToPlaintext(rightOperand)}`
      }
      break

    case 'ADDITION':
      {
        const leftOperand = ast.left
        const rightOperand = ast.right
        const operator = '+'
        plaintextFormula += `${convertToPlaintext(
          leftOperand
        )} ${operator} ${convertToPlaintext(rightOperand)}`
      }

      break

    case 'SUBTRACTION':
      {
        const leftOperand = ast.left
        const rightOperand = ast.right
        const operator = '-'
        plaintextFormula += `${convertToPlaintext(
          leftOperand
        )} ${operator} ${convertToPlaintext(rightOperand)}`
      }
      break

    case 'FUNCTION':
      {
        const funcName = ast.name
        const funcArgs = ast.arguments
        plaintextFormula += funcName
        plaintextFormula += ' ('
        funcArgs.forEach((arg) => {
          plaintextFormula += `${convertToPlaintext(arg)},`
        })
        plaintextFormula = plaintextFormula.substring(
          0,
          plaintextFormula.length - 1
        )
        plaintextFormula += ') '
      }
      break

    case 'VARIABLE':
      {
        const variableName = ast.name
        plaintextFormula += `${variableName}`
      }
      break

    case 'NUMBER':
      {
        const numberValue = ast.value
        plaintextFormula += `${numberValue}`
      }
      break

    case 'PI':
      plaintextFormula += `${ast.value}`
      break

    default:
      break
  }

  return plaintextFormula
}

export const updateASTNode = (
  ast: FVExpression,
  updateNodeId: FVExpressionId,
  newAst: FVExpression
): FVExpression => {
  const { id } = ast

  if (id === updateNodeId) {
    return {
      ...newAst,
      id: updateNodeId,
    }
  }

  // BODMAS
  switch (ast.type) {
    case 'PAREN': {
      const { id, expression } = ast
      return id !== updateNodeId
        ? {
            ...ast,
            expression: updateASTNode(expression, updateNodeId, newAst),
          }
        : { ...newAst, id: updateNodeId }
    }

    case 'DIVISION':
    case 'MULTIPLICATION':
    case 'ADDITION':
    case 'SUBTRACTION': {
      const { left: leftOperand, right: rightOperand, id } = ast
      return id !== updateNodeId
        ? {
            ...ast,
            left: updateASTNode(leftOperand, updateNodeId, newAst),
            right: updateASTNode(rightOperand, updateNodeId, newAst),
          }
        : { ...newAst, id: updateNodeId }
    }

    case 'FUNCTION': {
      const { arguments: funcArgs, id } = ast
      return id !== updateNodeId
        ? {
            ...ast,
            arguments: funcArgs.map((arg: any) =>
              updateASTNode(arg, updateNodeId, newAst)
            ),
          }
        : { ...newAst, id: updateNodeId }
    }

    case 'VARIABLE':
    case 'NUMBER':
    case 'PI': {
      const { id } = ast
      return id !== updateNodeId
        ? {
            ...ast,
          }
        : { ...newAst, id: updateNodeId }
    }

    case 'NOOP': {
      return {
        ...ast,
      }
    }
  }
}

export const deleteASTNode = (
  ast: FVExpression,
  deleteNodeId: FVExpressionId
): FVExpression => {
  const { id, type } = ast

  if (id === deleteNodeId) {
    return { type: 'NOOP', id: uniq() }
  }

  // BODMAS
  switch (type) {
    case 'PAREN': {
      const { expression } = ast
      return id !== deleteNodeId
        ? {
            ...ast,
            expression: deleteASTNode(expression, deleteNodeId),
          }
        : { type: 'NOOP', id: uniq() }
    }

    case 'DIVISION':
    case 'MULTIPLICATION':
    case 'ADDITION':
    case 'SUBTRACTION': {
      const { left: leftOperand, right: rightOperand } = ast
      return id !== deleteNodeId
        ? {
            ...ast,
            left: deleteASTNode(leftOperand, deleteNodeId),
            right: deleteASTNode(rightOperand, deleteNodeId),
          }
        : { type: 'NOOP', id: uniq() }
    }

    case 'FUNCTION': {
      const { arguments: funcArgs } = ast
      return id !== deleteNodeId
        ? {
            ...ast,
            arguments: funcArgs.map((arg: any) =>
              deleteASTNode(arg, deleteNodeId)
            ),
          }
        : { type: 'NOOP', id: uniq() }
    }

    case 'VARIABLE':
    case 'NUMBER':
    case 'PI': {
      return id !== deleteNodeId
        ? {
            ...ast,
          }
        : { type: 'NOOP', id: uniq() }
    }

    case 'NOOP': {
      return { ...ast }
    }
  }
}
