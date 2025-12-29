
import type { JSX } from 'react'
import type { Letters } from './App.tsx'
import { classes } from './utils.ts'

type KeyboardProps = {
  letters: Letters,
  guess: (l: string) => void,
}

export default function Keyboard({
  letters,
  guess }: KeyboardProps): JSX.Element {
  const keyboardElements: JSX.Element[] = Object.entries(letters).map(([k, v]): JSX.Element => {
    return (
      <button
        className={classes("btn col flex-grow-0", v.correct ? "btn-success" : v.used ? 'btn-dark' : 'btn-primary')}
        key={k}
        aria-label={`Letter ${k}`}
        onClick={() => guess(k)}
      >
        {k}
      </button>
    )
  })

  return (
    <section className="mt-3 keyboard row gap-1 justify-content-center">
      {keyboardElements}
    </section>
  )
}
