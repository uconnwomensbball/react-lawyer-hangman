import { useState } from 'react'
import { criminalLawWords, civilLawWords, caseCheckpoints } from "./data.js"
import './index.css'

function App() {
  console.log(criminalLawWords)
  const randomNumber = Math.round(Math.random() * criminalLawWords.length)
  console.log(randomNumber)
  const randomCriminalLawWord = criminalLawWords[randomNumber].word
  console.log(randomCriminalLawWord)
   const randomCivilLawWord = civilLawWords[randomNumber].word
  const [randomWord, setRandomWord] = useState("")
  console.log(randomWord)
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const [guessedLetter, setGuessedLetters] = useState([])
  function guessLetter(letter){
      setGuessedLetters(prevLetters=>{
        if (!prevLetters.includes(letter)){
          return [...prevLetters, letter]
        }else{
          return prevLetters
        }}
      )
  }

  const [gameStarted, setGameStarted] = useState(false)

  function startGame(word){
    setGameStarted(true)
    setRandomWord(word)
  }

  return (
    <div className="flex flex-col justify-center items-center">
    
    <h1>Lawyer Hangman</h1>
      <main>
  {gameStarted? 
    <div>
      <section className="flex flex-row">
        <p>Guess the word before the jury returns its verdict</p>
        {caseCheckpoints.map(checkpoint=><p className="border">{checkpoint}</p>)}
      </section>
    <section>
    {randomWord.split("").map(letter=> <span>{letter}</span>)}
    <label>Your guesses:
    {guessedLetter.length > 0 && guessedLetter.map(letter=><p>{letter}</p>)}
    </label>
    </section>
 
    {/*Keyboard*/}
    <section>
      {alphabet.split("").map(letter=>{
        return <button className="border-2 p-2 px-4" onClick={()=>guessLetter(letter)}>{letter.toUpperCase()}</button>
      })}
    </section>
    </div>
   : 
    <div className="flex flex-col justify-center items-center">
      <h2>Would you like to guess words involving criminal law or civil law? </h2>
      <div className="flex gap-4">
        <button onClick={()=>startGame(randomCriminalLawWord)}>Criminal Law</button>
        <button onClick={()=>startGame(randomCivilLawWord)}>Civil Law</button>
      </div>
      </div>
    }
    </main>
    <footer></footer>
    </div>
  )
}

export default App
