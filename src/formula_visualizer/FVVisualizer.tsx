import React from 'react'
import { FVBlock } from './FVBlock'
import { FVProvider, useFV } from './FVProvider'
import type { FVExpression } from './types'
import './fv.styles.css'

const FVVisualizerInner = () => {
  const {
    state: { ast },
  } = useFV()
  return (
    <div className="fv">
      <FVBlock ast={ast} />
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
