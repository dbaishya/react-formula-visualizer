import { useCallback } from 'react'
import type { FVExpression } from './types'
import { assignUniqIds } from './utils'

export function useFVConverter() {
  const convertToPlaintext = useCallback((ast: FVExpression) => {
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
  }, [])

  return {
    assignUniqIds,
    convertToPlaintext,
  }
}
