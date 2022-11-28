import * as Parser from 'src/parser/formula-parser'
import type { FVExpression } from './types'
import { assignUniqIds, convertToPlaintext } from './utils'

export function useFVUtils() {
  return {
    assignUniqIds,
    convertToPlaintext,
    parseFormula: (inputFormula: string) => {
      return Parser.parse(inputFormula) as FVExpression
    },
  }
}
