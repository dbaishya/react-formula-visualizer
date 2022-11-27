import type { FVExpression } from '../types'

export const mockAST: FVExpression = {
  type: 'DIVISION',
  left: {
    type: 'PAREN',
    expression: {
      type: 'ADDITION',
      left: {
        type: 'VARIABLE',
        name: '$b',
      },
      right: {
        type: 'FUNCTION',
        name: 'SQRT',
        arguments: [
          {
            type: 'SUBTRACTION',
            left: {
              type: 'FUNCTION',
              name: 'SQR',
              arguments: [
                {
                  type: 'VARIABLE',
                  name: '$b',
                },
              ],
            },
            right: {
              type: 'MULTIPLICATION',
              left: {
                type: 'NUMBER',
                value: 4,
              },
              right: {
                type: 'VARIABLE',
                name: '$a',
              },
            },
          },
        ],
      },
    },
  },
  right: {
    type: 'PAREN',
    expression: {
      type: 'MULTIPLICATION',
      left: {
        type: 'NUMBER',
        value: 2,
      },
      right: {
        type: 'VARIABLE',
        name: '$a',
      },
    },
  },
}
