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
console.log(randomCivilLawWord.word)
  const [randomWord, setRandomWord] = useState({word:"", description:""})
console.log("randomWord", randomWord)
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const [guessedLetters, setGuessedLetters] = useState([])
  const [incorrectGuesses, setIncorrectGuesses] = useState(1)

  
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
        console.log("incorrectGuesses", incorrectGuesses)
          setIncorrectGuesses(prevGuesses=>{
            if (prevGuesses < 7){
              return prevGuesses + 1
        }
        else if (prevGuesses === 7){
          setIsGameOver(true)
        }}
      )
      }
    
  }

  const [gameStarted, setGameStarted] = useState(false)

  function startGame(word){
    console.log("word", word)
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
    
    {/*MAIN*/}
    <main className="md:max-w-3xl lg:max-w-4xl flex-1 max-w-sm">

    {gameStarted && (
      <div className="flex flex-col items-center justify-center">
        <FontAwesomeIcon icon={faGavel} className="text-2xl md:text-7xl"></FontAwesomeIcon>
        <h1 className="text-sm mt-2 mb-2 md:text-4xl md:mt-4">Lawyer Hangman</h1>
          
        <section className="flex flex-col items-center gap-4 md:gap-8 md:mb-8 md:mt-6 text-sm md:text-xl">
          <p className="text-center text-xs md:text-xl">Guess the word before the jury returns its verdict</p>

      <div className="flex flex-wrap justify-center gap-1">
      {/*Case Checkpoints*/}
      {caseCheckpoints.map((checkpoint, index) => (
        <div key={index} className={`border-2 text-xs px-2 py-1 md:text-xl md:px-4 md:py-2 relative ${checkpoint.border} ${checkpoint.background}`}>
          <p className={index < incorrectGuesses ? "opacity-30" : ""}>{checkpoint.checkpoint}</p>
          {index < incorrectGuesses && <span className="absolute inset-0 flex items-center justify-center">
            <FontAwesomeIcon icon={faGavel} size="1x" />
          </span>}
        </div>))}
      </div>
        </section>

        <section className="flex flex-col justify-center items-center mb-2 md:mb-8 gap-2">
        <div className="flex flex-row gap-2 mt-2 md:mb-6 md:h-10 text-xs md:text-md flex-wrap justify-center">
        {!isGameOver && randomWord.word.split("").map(letter=> <span className={`px-2 py-1 md:px-4 md:py-2 w-10 bold md:text-xl ${letter === " "? "":"border-b-2"}`}>{guessedLetters.includes(letter)? letter.toUpperCase(): " "}</span>)}
        {isGameOver && randomWord.word.split("").map(letter=> <span className={`px-2 py-1 md:px-4 md:py-2 md:text-xl ${letter === " "? "":"border-b-2"}`}><p className={!guessedLetters.includes(letter) && randomWord.word.includes(letter)? "text-red-500": ""}>{letter.toUpperCase()}</p></span>)}
        </div>
        <p className="md:text-xl text-center text-xs mt-2 mb-2">Hint: {randomWord.definition}</p>
      </section>
 
    {/*Keyboard*/}
    <section className="flex flex-col justify-center items-center md:gap-8 md:mb-6">
      <div className="flex flex-row justify-center items-center flex-wrap gap-1 text-sm md:text-md">
      {!isGameOver && alphabet.split("").map(letter=>{
        return <button className={clsx("border-2 py-1 px-2 text-xs md:text-xl md:py-2 md:px-4", {"border-mist-500 bg-mist-50 hover:font-bold hover:border-slate-900" : !guessedLetters.includes(letter), "border-green-500 bg-green-50": randomWord.word.includes(letter) && guessedLetters.includes(letter), "border-red-500 bg-red-50": !randomWord.word.includes(letter) && guessedLetters.includes(letter)})} onClick={()=>guessLetter(letter)} disabled={isGameOver? true: false}>{letter.toUpperCase()}</button>
      })}
      {isGameOver && <p className="text-xs md:text-xl">Judge: A verdict has been reached...your client is {civilLawWords.includes(randomWord)? "liable": "guilty"}!</p>}
      </div>
      {isGameOver && <button className="border text-xs md:text-lg px-2 py-1 mb-4 md:px-4 md:py-2 mt-4 rounded-lg shadow-lg hover:bg-blue-50 border-blue-500 border-2 hover:font-semibold" onClick={()=>startNewGame()}>PLAY AGAIN</button>}
    </section>
    </div>)}
    
    {!gameStarted && isInitialScreenDisplayed && (<div className="flex flex-col justify-center items-center min-h-screen">
       <FontAwesomeIcon icon={faGavel} className="text-3xl md:text-7xl"></FontAwesomeIcon>
      <h1 className="md:text-4xl md:mb-6 mb-4 mt-4 tracking-wide font-medium">Lawyer Hangman</h1>
      <h2 className="text-xs text-center md:text-xl tracking-wide">Would you like to guess legal terms related to criminal law or civil law? </h2>
      <div className="flex gap-4 pt-8">
        <button className="text-xs px-2 border-2 border-blue-500 tracking-wide md:font-medium md:px-4 md:py-2 rounded-2xl text-xl shadow-lg hover:bg-blue-50 hover:font-semibold" onClick={()=>startGame(randomCriminalLawWord)}>Criminal Law 🚓</button>
        <button className="text-xs px-2 border-2 border-green-600 tracking-wide font-medium px-4 py-2 rounded-2xl text-xl shadow-lg hover:bg-green-50 hover:font-semibold" onClick={()=>startGame(randomCivilLawWord)}>Civil Law 💰 </button>
      </div>
    </div>)}

    </main>

    <footer className="flex justify-content items-center gap-1 text-sm md:text-md">
        <p className= "text-xs md:text-xl">JDJD Codes</p>
        <FontAwesomeIcon icon={faScaleBalanced} size="lg"></FontAwesomeIcon>
    </footer>
    </div>
  )
}

export default App
