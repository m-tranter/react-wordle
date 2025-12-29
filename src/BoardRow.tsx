import type { JSX } from 'react'
import type { RowCell } from './App.tsx'
import { classes } from './utils.ts'

type BoardRowProps = {
  row: RowCell[]
}

export default function BoardRow({ row }: BoardRowProps): JSX.Element {
  return (
    <div className="row gap-1 mb-1 justify-content-center">
      {row.map((l: RowCell, index: number) => (
        <span key={index} className={classes("col flex-grow-0 row-cell", l.correct ? "correct" : "", l.wrongPlace ? "wrong-place" : "")} >
          {l.letter.length ? l.letter : '\u00A0'}
        </span>
      ))
      }
    </div >
  )
}
