import React, { useMemo } from 'react'
import { FVBlock } from './FVBlock'
import { FVProvider, useFV } from './FVProvider'
import { constants } from './constants'
import type { FVExpression } from './types'
import { useFVUtils } from './useFVUtilts'
import './fv.styles.css'

const {
  labels: { interactiveViz, plaintextViz },
} = constants

const FVVisualizerInner = () => {
  const {
    state: { ast },
  } = useFV()
  const { convertToPlaintext } = useFVUtils()

  const plaintextFormula = useMemo(() => {
    return convertToPlaintext(ast)
  }, [ast, convertToPlaintext])

  return (
    <div className="fv">
      <div className="interactive">
        <p>{interactiveViz}</p>
        <FVBlock ast={ast} />
      </div>
      <div className="plaintext">
        <p>{plaintextViz}</p>
        <pre>{plaintextFormula}</pre>
      </div>
    </div>
  )
}

/**
 * @param { ast: FVExpression }
 * @returns JSX.Element
 */
export const FVVisualizer = ({ ast }: { ast: FVExpression }) => {
  return (
    <FVProvider ast={ast}>
      <FVVisualizerInner />
    </FVProvider>
  )
}
