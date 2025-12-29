type ResultsProps = {
  isGameWon: boolean
  word: string
  newGame: () => void
}
export default function Results({ isGameWon, word, newGame }: ResultsProps) {
  return (
    <div className="results mt-3 py-3">
      {isGameWon ?
        <>
          <h2>Well done!</h2>
        </> :
        <>
          <h2>You didn't get it this time.</h2>
          <p>The answer was: {word} </p>
        </>
      }
      <button className="btn btn-primary" onClick={newGame}>New game</button>
    </div >
  )
}
