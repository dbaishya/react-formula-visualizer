import React, { useState, useCallback, ChangeEvent } from 'react'
import {
  FormulaVisualizer,
  FVExpression,
  useFVUtils,
} from './formula_visualizer'
import './formulizer.css'

const labels = {
  title: 'React Formulizer',
  inputFormula: 'Input formula',
  parseAST: 'Parse and update AST View',
  syntaxTree: 'Syntax tree',
  vizToFormula: 'Visualizer-to-Formula',
}

export default function Formulizer() {
  const { assignUniqIds, parseFormula } = useFVUtils()

  /**
   * @note
   *  local states
   */
  const [formula, setFormula] = useState(
    '($b + SQRT (SQR($b) - 4 * $a)) / (2 * $a)'
  )
  const [syntaxTree, setSyntaxTree] = useState<FVExpression | null>(null)
  const [syntaxTreeJson, setSyntaxTreeJson] = useState<string | null>(null)

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

  return (
    <div className="formulizer">
      <div className="input-formula">
        <h1>{labels.title}</h1>
        <h3>{labels.inputFormula}</h3>
        <p>
          <textarea
            cols={100}
            rows={4}
            value={formula}
            onChange={handleFormulaInput}
          />
        </p>
      </div>
      <div className="plaintext-to-ast">
        <h3>
          {labels.syntaxTree}
          <button onClick={convertFormulaToAst}>{labels.parseAST}</button>
        </h3>
        <pre
          style={{
            maxHeight: '240px',
            overflow: 'auto',
            backgroundColor: '#eeeeee',
          }}
        >
          {syntaxTreeJson}
        </pre>
      </div>
      <div className="ast-to-formula">
        <h3>{labels.vizToFormula}</h3>
        {syntaxTree && <FormulaVisualizer ast={syntaxTree as FVExpression} />}
      </div>
    </div>
  )
}
