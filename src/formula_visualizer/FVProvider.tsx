import React, {
  useReducer,
  createContext,
  useContext,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from 'react'
import type { FVExpression, FVExpressionId } from './types'
import {
  convertToPlaintext,
  deleteASTNode,
  parseFormula,
  updateASTNode,
} from './utils'

/**
 * @note
 *  shape of error should come from parser utility
 *  for simplicity using message:string
 */

type FVError = {
  message: string
  id: FVExpressionId
}

export type FVState = {
  ast: FVExpression
  error: FVError | null
}

export type FVAction =
  | {
      type: 'LOAD_AST'
      payload: {
        ast: FVExpression
      }
    }
  /**
   * @note
   *  actions are designed around CRUD principle,
   *  except read action may be treated as a remote getter
   */
  | {
      type: 'UPDATE_AST_NODE'
      payload: {
        id: FVExpressionId
        newAst: FVExpression
      }
    }
  | {
      type: 'DELETE_AST_NODE'
      payload: {
        id: FVExpressionId
      }
    }

const initialFVState: FVState = {
  ast: { type: 'NOOP' },
  error: null,
}

const fvReducer = (state: FVState = initialFVState, action: FVAction) => {
  switch (action.type) {
    case 'LOAD_AST': {
      return {
        ...state,
        ast: { ...action.payload.ast },
      }
    }

    case 'UPDATE_AST_NODE': {
      const {
        payload: { id: updateNodeId, newAst },
      } = action
      return {
        ...state,
        ast: updateASTNode({ ...state.ast }, updateNodeId, { ...newAst }),
      }
    }

    case 'DELETE_AST_NODE': {
      const {
        payload: { id: deleteNodeId },
      } = action
      const tmpAst: FVExpression = deleteASTNode({ ...state.ast }, deleteNodeId)
      const tmpFormulaStr = convertToPlaintext(tmpAst)
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _tmpParsedFormula = parseFormula(tmpFormulaStr)
        return {
          ...state,
          ast: { ...tmpAst },
          error: null,
        }
      } catch (error: unknown) {
        const { message: errorMessage } = error as {
          hash: unknown
          message: string
          stack: unknown
        }
        return {
          ...state,
          error: {
            message: errorMessage,
            id: deleteNodeId,
          },
        }
      }
    }
    default:
      return { ...state }
  }
}

const FVContext = createContext<{
  state: FVState
  dispatch: React.Dispatch<FVAction>
}>({
  state: initialFVState,
  dispatch: () => null,
})

type FVProviderProps = {
  ast: FVExpression
  children: React.ReactNode
}

const FVProvider = ({ ast, children }: FVProviderProps) => {
  const reducer = useCallback(fvReducer, [])
  const [state, dispatch] = useReducer(reducer, initialFVState)
  const isInitialRenderRef = useRef(true)

  const memoizedValue = useMemo(() => {
    return {
      state,
      dispatch,
    }
  }, [state, dispatch])

  useEffect(() => {
    if (isInitialRenderRef.current) {
      dispatch({
        type: 'LOAD_AST',
        payload: { ast },
      })
    }
  }, [ast])

  return (
    <FVContext.Provider value={{ ...memoizedValue }}>
      {children}
    </FVContext.Provider>
  )
}

/**
 * @note
 *  utility hook
 */
const useFV = () => {
  return useContext(FVContext)
}

export { FVContext, FVProvider, useFV }
