import * as Parser from 'src/parser/formula-parser'
import type { FVExpression } from 'src/formula_visualizer/types'

export const useFormulaParser = () => {
  return {
    parseFormula: (inputFormula: string) => {
      return Parser.parse(inputFormula) as FVExpression
    },
  }
}
