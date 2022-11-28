import React, { useCallback, useRef, useState } from 'react'
import type { FVExpression } from './types'
import { useFV } from './FVProvider'

const labels = {
  deleteBlock: 'X',
}

/**
 * @param { ast: Expression }
 * @returns JSX.Element
 */
export const FVBlock = ({ ast }: { ast: FVExpression }) => {
  const {
    dispatch,
    state: { error },
  } = useFV()
  const [isHover, setIsHover] = useState(false)
  const ref = useRef(null)

  const handleMouseOver = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (ref.current) {
        const target = event.target
        if (ref.current === target) {
          setIsHover((_) => true)
        }
      }
    },
    []
  )

  const handleMouseOut = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault()
      setIsHover((_) => false)
    },
    []
  )

  const handleDeleteBlock = useCallback(
    (event: React.MouseEvent<HTMLDivElement>, nodeId?: string) => {
      event.stopPropagation()
      if (nodeId) {
        dispatch({
          type: 'DELETE_AST_NODE',
          payload: {
            id: nodeId,
          },
        })
      }
    },
    [dispatch]
  )

  const { id: nodeId, type } = ast
  const isHoverClass = isHover ? 'is-hover' : ''
  const isErrorClass = error && error.id === nodeId ? 'is-error' : ''

  const childBlocks = (ast: FVExpression) => {
    switch (ast.type) {
      case 'PAREN': {
        const expression = ast.expression
        return (
          <>
            <pre>(</pre>
            <FVBlock ast={expression} />
            <pre>)</pre>
          </>
        )
      }

      case 'DIVISION': {
        const leftOperand = ast.left
        const rightOperand = ast.right
        const operator = '/'
        return (
          <>
            <FVBlock ast={leftOperand} />
            <pre>{operator}</pre>
            <FVBlock ast={rightOperand} />
          </>
        )
      }

      case 'MULTIPLICATION': {
        const leftOperand = ast.left
        const rightOperand = ast.right
        const operator = '*'
        return (
          <>
            <FVBlock ast={leftOperand} />
            <pre>{operator}</pre>
            <FVBlock ast={rightOperand} />
          </>
        )
      }

      case 'ADDITION': {
        const leftOperand = ast.left
        const rightOperand = ast.right
        const operator = '+'
        return (
          <>
            <FVBlock ast={leftOperand} />
            <pre>{operator}</pre>
            <FVBlock ast={rightOperand} />
          </>
        )
      }

      case 'SUBTRACTION': {
        const leftOperand = ast.left
        const rightOperand = ast.right
        const operator = '-'
        return (
          <>
            <FVBlock ast={leftOperand} />
            <pre>{operator}</pre>
            <FVBlock ast={rightOperand} />
          </>
        )
      }

      case 'FUNCTION': {
        const funcName = ast.name
        const funcArgs = ast.arguments
        return (
          <>
            <pre>{funcName}</pre>
            <pre>(</pre>
            {funcArgs.map((arg, index) => {
              return <FVBlock ast={arg} key={index} />
            })}
            <pre>)</pre>
          </>
        )
      }

      case 'VARIABLE': {
        const variableName = ast.name
        return (
          <>
            <pre>{variableName}</pre>
          </>
        )
      }

      case 'NUMBER': {
        const numberValue = ast.value
        return (
          <>
            <pre>{numberValue}</pre>
          </>
        )
      }

      case 'PI':
        return (
          <>
            <pre>{ast.value}</pre>
          </>
        )

      default:
        return <></>
    }
  }

  if (type === 'NOOP') {
    return null
  }

  return (
    <div
      ref={ref}
      className={`fv-block ${isHoverClass} ${isErrorClass} fv-${type.toLowerCase()}`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={(event) => handleDeleteBlock(event, nodeId)}
    >
      {isHover && (
        <button className="delete-block">{labels.deleteBlock}</button>
      )}
      {childBlocks(ast)}
    </div>
  )
}
