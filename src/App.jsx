import { useState } from 'react'
import { criminalLawWords, civilLawWords, caseCheckpoints } from "./data.js"
import './index.css'

function App() {
 
  const randomNumber = Math.round(Math.random() * criminalLawWords.length)
  const randomCriminalLawWord = criminalLawWords[randomNumber].word
  const randomCivilLawWord = civilLawWords[randomNumber].word
  const [randomWord, setRandomWord] = useState("")

  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const [guessedLetter, setGuessedLetters] = useState([])
  const [incorrectGuesses, setIncorrectGuesses] = useState(0)
  console.log(incorrectGuesses)

  const [isGameOver, setIsGameOver] = useState(false)

  //function - logic when user guesses a letter 
  function guessLetter(letter){
      setGuessedLetters(prevLetters=>{
        if (!prevLetters.includes(letter)){
          return [...prevLetters, letter]
        }else{
          return prevLetters
        }})
      if (randomWord.includes(letter)){
          console.log(`${letter} is in the word!`)
      }
      else{
        console.log(`${letter} is not in the word!`)
      
          setIncorrectGuesses(prevGuesses=>{
            if (prevGuesses < 7){
              return prevGuesses + 1
        }
        else if (prevGuesses === 7){
          console.log("You lose!")
          setIsGameOver(true)
        }}
      )
      }
    
  }

  const [gameStarted, setGameStarted] = useState(false)

  function startGame(word){
    setGameStarted(true)
    setRandomWord(word)
  }

  return (
    <div className="flex flex-col justify-center items-center p-6">
  

    <main>
    {gameStarted? 
      <div className="flex flex-col items-center justify-center">
         <h1 className="text-4xl mb-6">Lawyer Hangman</h1>
        <section className="flex flex-col items-center gap-8 mb-8 mt-6 text-xl">
          <p>Guess the word before the jury returns its verdict</p>
          <div className="flex flex-wrap justify-center">
        {caseCheckpoints.map(checkpoint=><p className="border px-4 py-2">{checkpoint}</p>)}
          </div>
          <label className="flex gap-2">Your guesses:
          {guessedLetter.length > 0 && guessedLetter.map(letter=><p>{letter}</p>)}
        </label>
        </section>
      <section className="flex flex-row justify-center mb-8 gap-2">
        {randomWord.split("").map(letter=> <span className="border-b-2 px-4 py-2">{letter.toUpperCase()}</span>)}
        
      </section>
 
    {/*Keyboard*/}
    <section className="flex flex-col justify-center items-center gap-8">
      <div className="flex flex-row justify-center items-center flex-wrap">
      {alphabet.split("").map(letter=>{
        return <button className="border-2 py-2 px-4" onClick={()=>guessLetter(letter)}>{letter.toUpperCase()}</button>
      })}
      </div>
      {isGameOver && <button className="border px-4 py-2 rounded-lg">Play Again</button>}
    </section>
    </div>
   : 
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl mb-6">Lawyer Hangman</h1>
      <h2 className="text-xl">Would you like to guess words related to criminal law or civil law? </h2>
      <div className="flex gap-4 pt-8">
        <button className="border px-4 py-2 rounded-lg text-xl" onClick={()=>startGame(randomCriminalLawWord)}>Criminal Law 🚓</button>
        <button className="border px-4 py-2 rounded-lg text-xl" onClick={()=>startGame(randomCivilLawWord)}>Civil Law 💰 </button>
      </div>
    </div>
    }
    </main>
    <footer></footer>
    </div>
  )
}

export default App
