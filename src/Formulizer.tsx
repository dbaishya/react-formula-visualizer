import React, { useState, useCallback, ChangeEvent } from 'react'
import { useFormulaParser } from './parser'
import {
  FormulaVisualizer,
  FVExpression,
  useFVConverter,
} from './formula_visualizer'
import './formulizer.css'

const labels = {
  title: 'React Formulizer',
  inputFormula: 'Input formula',
  parseAST: 'Parse and update AST View',
  syntaxTree: 'Syntax tree',
  convertToFormula: 'Convert AST to Formula',
  vizToFormula: 'Visualizer-to-Formula',
  plaintextViz: 'Plain text visualization',
  interactiveViz: 'Interactive visualization',
}

export default function Formulizer() {
  const { parseFormula } = useFormulaParser()
  const { assignUniqIds, convertToPlaintext } = useFVConverter()

  /**
   * @note
   *  local states
   */
  const [formula, setFormula] = useState(
    '($b + SQRT (SQR($b) - 4 * $a)) / (2 * $a)'
  )
  const [syntaxTree, setSyntaxTree] = useState<FVExpression | null>(null)
  const [syntaxTreeJson, setSyntaxTreeJson] = useState<string | null>(null)
  const [plaintextFormula, setPlaintextFormula] = useState<string | null>(null)

  const handleFormulaInput = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      e.preventDefault()
      const inputVal = e.target.value
      setFormula((_) => inputVal)
    },
    []
  )

  const convertFormulaToAst = useCallback(() => {
    const newSyntaxTree = parseFormula(formula)
    const newSyntaxTreeWithIds = assignUniqIds(newSyntaxTree as FVExpression)
    setSyntaxTree((_) => newSyntaxTreeWithIds)
    setSyntaxTreeJson((_) => JSON.stringify(newSyntaxTree, null, 2))
  }, [formula, parseFormula, assignUniqIds])

  const convertAstToFormula = useCallback(() => {
    const formulaStr = convertToPlaintext(syntaxTree as FVExpression)
    setPlaintextFormula((_) => formulaStr)
  }, [syntaxTree, convertToPlaintext])

  return (
    <div className="formulizer">
      <div className="input-formula">
        <h1>{labels.title}</h1>
        <h3>{labels.inputFormula}</h3>
        <p>
          <textarea
            cols={100}
            rows={8}
            value={formula}
            onChange={handleFormulaInput}
          />
        </p>
      </div>
      <div className="plaintext-to-ast">
        <h3>
          {labels.syntaxTree} |
          <button onClick={convertFormulaToAst}>{labels.parseAST}</button>
        </h3>
        <pre
          style={{
            maxHeight: '300px',
            overflow: 'auto',
            backgroundColor: '#eeeeee',
          }}
        >
          {syntaxTreeJson}
        </pre>
      </div>
      <div className="ast-to-formula">
        <h3>
          {labels.vizToFormula} |
          <button onClick={convertAstToFormula}>
            {labels.convertToFormula}
          </button>
        </h3>
        <div className="interactive-formula">
          <h4>{labels.interactiveViz}</h4>
          {syntaxTree && <FormulaVisualizer ast={syntaxTree as FVExpression} />}
        </div>
        <div className="plaintext-formula">
          <h4>{labels.plaintextViz}</h4>
          <pre>{plaintextFormula}</pre>
        </div>
      </div>
    </div>
  )
}
