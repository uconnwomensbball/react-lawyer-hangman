import { useState } from 'react'
import clsx from 'clsx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faScaleBalanced } from "@fortawesome/free-solid-svg-icons"
import { criminalLawWords, civilLawWords, caseCheckpoints } from "./data.js"
import './index.css'

function App() {
 
  const randomNumber = Math.round(Math.random() * criminalLawWords.length)
  const randomCriminalLawWord = criminalLawWords[randomNumber]

  const randomCivilLawWord = civilLawWords[randomNumber]

  const [randomWord, setRandomWord] = useState({word:"", description:""})
console.log("randomWord", randomWord)
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const [guessedLetters, setGuessedLetters] = useState([])
  const [incorrectGuesses, setIncorrectGuesses] = useState(0)
  console.log(incorrectGuesses)
  const [isInitialScreenDisplayed, setIsInitialScreenDisplayed] = useState(true)
  const [isGameOver, setIsGameOver] = useState(false)

  //function - logic when user guesses a letter 
  function guessLetter(letter){
      setGuessedLetters(prevLetters=>{
        if (!prevLetters.includes(letter)){
          return [...prevLetters, letter]
        }else{
          return prevLetters
        }})
      if (randomWord.word.includes(letter)){
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
    setIsInitialScreenDisplayed(false)
    setGameStarted(true)
    setRandomWord(word)
  }

function startNewGame(){
    setIsInitialScreenDisplayed(true)
    setGameStarted(false)
    setIsGameOver(false)
    setRandomWord({word:"", description:""})
    setIncorrectGuesses(0)
    setGuessedLetters([])
}

  return (
    <div className="flex flex-col justify-center items-center p-6 max-w-4xl mx-auto">

    <main className="">
    {gameStarted? 
      <div className="flex flex-col items-center justify-center">
         <h1 className="text-4xl mb-6">Lawyer Hangman</h1>
        <section className="flex flex-col items-center gap-8 mb-8 mt-6 text-xl">
          <p>Guess the word before the jury returns its verdict</p>
          <div className="flex flex-wrap justify-center">
        {caseCheckpoints.map(checkpoint=><p className="border px-4 py-2">{checkpoint}</p>)}
          </div>
     
        </section>
      <section className="flex flex-col justify-center items-center mb-8 gap-2">
        <div className="flex flex-row gap-2 mb-6">
        {!isGameOver && randomWord.word.split("").map(letter=> <span className={`px-4 py-2 ${letter === " "? "":"border-b-2"}`}>{guessedLetters.includes(letter)? letter.toUpperCase(): " "}</span>)}
        {isGameOver && randomWord.word.split("").map(letter=> <span className={`px-4 py-2 ${letter === " "? "":"border-b-2"}`}><p className={!guessedLetters.includes(letter) && randomWord.word.includes(letter)? "text-red-500": ""}>{letter.toUpperCase()}</p></span>)}
        </div>
        <p className="text-xl">{randomWord.definition}</p>
      </section>
 
    {/*Keyboard*/}
    <section className="flex flex-col justify-center items-center gap-8">
      <div className="flex flex-row justify-center items-center flex-wrap">
      {alphabet.split("").map(letter=>{
        return <button className={clsx( "border-2 py-2 px-4", {"bg-green-500": randomWord.word.includes(letter) && guessedLetters.includes(letter), "bg-red-500": !randomWord.word.includes(letter) && guessedLetters.includes(letter)})} onClick={()=>guessLetter(letter)} disabled={isGameOver? true: false}>{letter.toUpperCase()}</button>
      })}
      </div>
      {isGameOver && <button className="border px-4 py-2 rounded-lg" onClick={()=>startNewGame()}>Play Again</button>}
    </section>
    </div>
   : 
    (isInitialScreenDisplayed && (<div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl mb-6">Lawyer Hangman</h1>
      <h2 className="text-xl">Would you like to guess legal terms related to criminal law or civil law? </h2>
      <div className="flex gap-4 pt-8">
        <button className="border px-4 py-2 rounded-lg text-xl" onClick={()=>startGame(randomCriminalLawWord)}>Criminal Law 🚓</button>
        <button className="border px-4 py-2 rounded-lg text-xl" onClick={()=>startGame(randomCivilLawWord)}>Civil Law 💰 </button>
      </div>
    </div>))}

    </main>
    <footer className="flex justify-content items-center gap-1">
        <p>JDJD Codes</p>
        <FontAwesomeIcon icon={faScaleBalanced}></FontAwesomeIcon>
    </footer>
    </div>
  )
}

export default App
