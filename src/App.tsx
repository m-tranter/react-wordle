import { useState } from 'react'
import { getRandomWord } from "./utils"
import Keyboard from './Keyboard'
import BoardRow from './BoardRow.tsx'
import ConfettiContainer from './ConfettiContainer.tsx';
import Results from './Results.tsx';
import { words } from "./six_letter_words.ts"

export interface Letter {
  used: boolean
  correct: boolean
}
export type Letters = { [key: string]: Letter }

export interface RowCell {
  letter: string
  correct: boolean
  wrongPlace: boolean
}

type Freq = { [key: string]: number }

function App() {
  const makeRows = () => Array.from(Array(2)).map(() =>
    Array.from(Array(5)).map(() => {
      return { letter: "", correct: false, wrongPlace: false }
    }));

  function makeLetters(): Letters {
    return Array.from(Array(26)).reduce((acc, _, i) => {
      return { ...acc, [String.fromCharCode(i + 65)]: { used: false, correct: false } };
    }, {})
  }

  const [word, setWord] = useState<string>((): string => getRandomWord())
  const [letters, setLetters] = useState(makeLetters());
  const [boardRows, setBoardRows] = useState(makeRows)
  const [boardIndex, setBoardIndex] = useState(0)
  const [rowIndex, setRowIndex] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [guessedWord, setGuessedWord] = useState('');
  const [isGameWon, setIsGameWon] = useState(false);

  const newGame = () => {
    setIsGameWon(false);
    setIsGameOver(false);
    setWord(getRandomWord)
    setBoardRows(makeRows)
    setRowIndex(0);
    setBoardIndex(0);
    setLetters(makeLetters);
    setGuessedWord('');
  }

  const guess = (l: string) => {
    if (boardIndex < 5) {
      setBoardRows(prev => {
        prev[rowIndex][boardIndex].letter = l;
        return [...prev];
      });
      setBoardIndex(prev => prev + 1)
      setGuessedWord(prev => prev + l);
    }
  };

  const del = () => {
    if (boardIndex) {
      setBoardRows(prev => {
        prev[rowIndex][boardIndex - 1].letter = "";
        return [...prev];
      });
      setBoardIndex(prev => prev - 1)
      setGuessedWord(prev => prev.slice(0, prev.length - 1));
    }
  }

  const freq = (guess: string) => {
    return guess.split('').reduce((acc: Freq, e) => {
      if (!acc[e]) {
        acc[e] = 1;
      } else {
        acc[e] += 1
      }
      return acc;
    }, {})
  }

  const enter = () => {
    if (boardIndex === 5) {
      setBoardIndex(0)
      setIsGameWon(guessedWord === word);
      const rInd = rowIndex;
      const letterFreq = freq(word)
      setBoardRows(prev => {
        prev[rInd] = prev[rInd].map((l, i) => {
          if (l.letter === word[i]) {
            l.correct = true;
            setLetters(prev => {
              prev[l.letter].correct = true;
              return { ...prev }
            })
            letterFreq[l.letter] -= 1;
          }
          else {

            setLetters(prev => {
              prev[l.letter].used = true;
              if (!word.includes(l.letter)) {
                prev[l.letter].correct = false;
              }
              return { ...prev }
            })

          }
          return l
        })
        prev[rInd] = prev[rInd].map((l, i) => {
          if (l.letter !== word[i] && letterFreq[l.letter]) {
            l.wrongPlace = true;
          }
          return l
        })
        return [...prev];
      })
    }
    if (rowIndex < boardRows.length - 1) {
      setRowIndex(prev => prev + 1)
      setGuessedWord('')
    } else {
      setIsGameOver(true)
    }
  }

  return (
    <>
      <ConfettiContainer isGameWon={isGameWon} />
      <div className="container mt-3 text-center">
        <h1 className="">Wordle</h1>
        <h2>{word}</h2>
        {boardRows.map((br, i) => <BoardRow key={i} row={br} />)}
        {isGameOver ?
          <Results newGame={newGame} word={word} isGameWon={isGameWon} /> :
          <>
            <Keyboard letters={letters} guess={guess} />
            <div className="mt-3 row gap-1 justify-content-center">
              <button className="col btn btn-dark control flex-grow-0" onClick={del}>Delete</button>
              <button disabled={!words.includes(guessedWord)} className="col btn btn-dark control flex-grow-0" onClick={enter}>Enter</button>
            </div>
          </>
        }
      </div >
    </>
  )
}

export default App
