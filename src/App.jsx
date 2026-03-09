import { useState } from 'react'
import clsx from 'clsx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faGavel, faScaleBalanced } from "@fortawesome/free-solid-svg-icons"
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
     <div className="font-bzks bg-slate-50 flex flex-col items-center p-6 min-h-screen">

    <main className="md:max-w-3xl lg:max-w-4xl flex-1 max-w-sm">
    {gameStarted? 
      <div className="flex flex-col items-center justify-center">
        <FontAwesomeIcon icon={faGavel} size="1x"></FontAwesomeIcon>
         <h1 className="text-md mt-2 md:text-4xl md:mt-4">Lawyer Hangman</h1>
          
        <section className="flex flex-col items-center gap-4 md:gap-8 md:mb-8 md:mt-6 text-sm md:text-xl">
          <p>Guess the word before the jury returns its verdict</p>
          <div className="flex flex-wrap justify-center gap-1">
          {/*Case Checkpoints*/}
        {caseCheckpoints.map(checkpoint=><p className={`border-2 px-4 py-2 ${checkpoint.border} ${checkpoint.background}`}>{checkpoint.checkpoint}</p>)}
          </div>
     
        </section>
      <section className="flex flex-col justify-center items-center mb-2 md:mb-8 gap-2">
        <div className="flex flex-row gap-2 md:mb-6 md:h-10 text-sm md:text-md">
        {!isGameOver && randomWord.word.split("").map(letter=> <span className={`px-4 py-2 w-10 bold ${letter === " "? "":"border-b-2"}`}>{guessedLetters.includes(letter)? letter.toUpperCase(): " "}</span>)}
        {isGameOver && randomWord.word.split("").map(letter=> <span className={`px-4 py-2 ${letter === " "? "":"border-b-2"}`}><p className={!guessedLetters.includes(letter) && randomWord.word.includes(letter)? "text-red-500": ""}>{letter.toUpperCase()}</p></span>)}
        </div>
        <p className="text-sm md:text-xl">Hint: {randomWord.definition}</p>
      </section>
 
    {/*Keyboard*/}
    <section className="flex flex-col justify-center items-center gap-8">
      <div className="flex flex-row justify-center items-center flex-wrap gap-1 text-sm md:text-md">
      {alphabet.split("").map(letter=>{
        return <button className={clsx("border-2 py-2 px-4", {"border-mist-500 bg-mist-50 hover:font-bold hover:border-slate-900" : !guessedLetters.includes(letter), "border-green-500 bg-green-50": randomWord.word.includes(letter) && guessedLetters.includes(letter), "border-red-500 bg-red-50": !randomWord.word.includes(letter) && guessedLetters.includes(letter)})} onClick={()=>guessLetter(letter)} disabled={isGameOver? true: false}>{letter.toUpperCase()}</button>
      })}
      </div>
      {isGameOver && <button className="border px-4 py-2 rounded-lg shadow-lg hover:bg-blue-50 border-blue-500 border-2 hover:font-semibold" onClick={()=>startNewGame()}>PLAY AGAIN</button>}
    </section>
    </div>
   : 
    (isInitialScreenDisplayed && (<div className="flex flex-col justify-center items-center min-h-screen">
       <FontAwesomeIcon icon={faGavel} size="5x"></FontAwesomeIcon>
      <h1 className="text-4xl mb-6 mt-4 tracking-wide font-medium">Lawyer Hangman</h1>
      <h2 className="text-xl tracking-wide">Would you like to guess legal terms related to criminal law or civil law? </h2>
      <div className="flex gap-4 pt-8">
        <button className="border-2 border-blue-500 tracking-wide font-medium px-4 py-2 rounded-2xl text-xl shadow-lg hover:bg-blue-50 hover:font-semibold" onClick={()=>startGame(randomCriminalLawWord)}>Criminal Law 🚓</button>
        <button className="border-2 border-green-600 tracking-wide font-medium px-4 py-2 rounded-2xl text-xl shadow-lg hover:bg-green-50 hover:font-semibold" onClick={()=>startGame(randomCivilLawWord)}>Civil Law 💰 </button>
      </div>
    </div>))}

    </main>
    <footer className="flex justify-content items-center gap-1 text-sm md:text-md">
        <p>JDJD Codes</p>
        <FontAwesomeIcon icon={faScaleBalanced}></FontAwesomeIcon>
    </footer>
    </div>
  )
}

export default App
