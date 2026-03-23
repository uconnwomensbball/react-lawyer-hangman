import { useState } from 'react'
import clsx from 'clsx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faGavel, faScaleBalanced } from "@fortawesome/free-solid-svg-icons"
import { criminalLawWords, civilLawWords, caseCheckpoints } from "./data.js"
import './index.css'

function App() {
 
  const randomNumber = Math.floor(Math.random() * criminalLawWords.length)
  const [randomWord, setRandomWord] = useState({word:"", hint:""})
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const [guessedLetters, setGuessedLetters] = useState([])
  const [incorrectGuesses, setIncorrectGuesses] = useState(0)
  
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
    
        setIncorrectGuesses(prevGuesses=>{
          if (!randomWord.word.includes(letter)){
          const nextGuesses = prevGuesses + 1
          if (nextGuesses === 7){
            setIsGameOver(true)}
          return nextGuesses}
        else{
          return prevGuesses
        }}) 
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
    setRandomWord({word:"", hint:""})
    setIncorrectGuesses(0)
    setGuessedLetters([])
}

return (
  <div className="font-bzks bg-slate-50 flex flex-col items-center p-6 min-h-screen">
    
    {/*MAIN*/}
    <main className="sm:max-w-3xl lg:max-w-4xl flex-1 max-w-sm max-w-screen-lg">

    {gameStarted && (
      <div className="flex flex-col items-center justify-center">
        <FontAwesomeIcon icon={faGavel} className="text-2xl sm:text-7xl"></FontAwesomeIcon>
        <h1 className="text-sm mt-2 mb-2 sm:text-4xl sm:mt-4">Lawyer Hangman</h1>
          
        <section className="flex flex-col items-center gap-4 sm:gap-8 sm:mb-8 sm:mt-6 text-sm sm:text-xl">
          <p className="text-center text-xs sm:text-xl">Guess the word before the jury returns its verdict</p>

      <div className="flex flex-wrap justify-center gap-1">
      {/*Case Checkpoints*/}
      {caseCheckpoints.map((checkpoint, index) => (
        <div key={index} className={`border-2 text-xs px-2 py-1 sm:text-xl sm:px-4 sm:py-2 relative ${checkpoint.border} ${checkpoint.background}`}>
          <p class="sr-only" aria-live="polite">{`You have ${7-incorrectGuesses} remaining.`}</p>
          <p className={index < incorrectGuesses ? "opacity-30" : ""}>{checkpoint.checkpoint}</p>
          {index < incorrectGuesses && <span className="absolute inset-0 flex items-center justify-center">
            <FontAwesomeIcon icon={faGavel} size="1x" aria-hidden="true"/>
          </span>}
        </div>))}
      </div>
        </section>

        <section className="flex flex-col justify-center items-center mb-2 sm:mb-8 gap-2 mt-4 md:mt-0">
        <div className="flex flex-row gap-2 mt-2 sm:mb-6 sm:h-10 text-xs sm:text-sm flex-wrap justify-center">
        {!isGameOver && randomWord.word.split("").map((letter, index)=>
        <>
          <p id="announcer" class="sr-only" aria-live="polite">{randomWord.word.includes(letter)? `${letter} is in the word!`:`${letter} is not in the word`}</p>
            <span key={index} className={`px-2 py-1 sm:px-4 sm:py-2 w-10 bold sm:text-xl ${letter === " "? "":"border-b-2"}`} tabindex={0}>

              {guessedLetters.includes(letter)? letter.toUpperCase(): " "}
              </span>
           </>)}
        {isGameOver && randomWord.word.split("").map((letter, index)=>
            <span key={index} className={`px-2 py-1 sm:px-4 sm:py-2 sm:text-xl ${letter === " "? "":"border-b-2"}`}>
              <p className={!guessedLetters.includes(letter) && randomWord.word.includes(letter)? "text-red-500": ""}>
                {letter.toUpperCase()}
              </p>
              <p class = "sr-only" aria-live="polite">{`The word was ${randomWord.word}.`}</p>
              </span>)}
        </div>
        <p className="sm:text-xl mt-4 text-center text-xs mb-2">Hint: {randomWord.hint}</p>
        
      </section>
 
    {/*Keyboard*/}
    <section className="flex flex-col justify-center items-center sm:gap-8 sm:mb-6">
      <div className="flex flex-row justify-center items-center flex-wrap gap-1 text-sm sm:text-sm">
      {!isGameOver && alphabet.split("").map(letter=>{
        return <button key={letter} 
                      className={clsx("border-2 py-1 px-2 text-xs sm:text-xl sm:py-2 sm:px-4", {"border-mist-500 bg-mist-50 hover:font-bold hover:border-slate-900" : !guessedLetters.includes(letter), "border-green-500 bg-green-50": randomWord.word.includes(letter) && guessedLetters.includes(letter), "border-red-500 bg-red-50": !randomWord.word.includes(letter) && guessedLetters.includes(letter)})} onClick={()=>guessLetter(letter)} 
                      disabled={guessedLetters.includes(letter) || isGameOver? true: false} 
                      aria-label={`letter ${letter}`}>{letter.toUpperCase()}</button>
      })}
      {isGameOver && <p className="text-xs sm:text-xl" aria-live="polite">Judge: A verdict has been reached...your client is {civilLawWords.includes(randomWord)? "liable": "guilty"}!</p>}
      </div>
      {isGameOver && <button className="border text-xs sm:text-lg px-2 py-1 mb-4 sm:px-4 sm:py-2 mt-4 rounded-lg shadow-lg hover:bg-blue-50 border-blue-500 border-2 hover:font-semibold" onClick={()=>startNewGame()}>PLAY AGAIN</button>}
    </section>
    </div>)}
    
    {!gameStarted && isInitialScreenDisplayed && (<div className="flex flex-col justify-center items-center min-h-screen">
       <FontAwesomeIcon icon={faGavel} className="text-3xl sm:text-7xl" aria-hidden="true"></FontAwesomeIcon>
      <h1 className="sm:text-4xl sm:mb-6 mb-4 mt-4 tracking-wide font-medium">Lawyer Hangman</h1>
      <h2 className="text-xs text-center sm:text-xl tracking-wide" aria-live="polite">Would you like to guess legal terms related to criminal law or civil law? </h2>
      <div className="flex gap-4 pt-8">
        <button className="text-xs px-2 border-2 border-blue-500 tracking-wide sm:font-medium sm:px-4 sm:py-2 rounded-2xl sm:text-xl shadow-lg hover:bg-blue-50 hover:font-semibold" onClick={()=>startGame(criminalLawWords[randomNumber])}>Criminal Law 🚓</button>
        <button className="text-xs px-2 border-2 border-green-600 tracking-wide font-medium px-4 py-2 rounded-2xl sm:text-xl shadow-lg hover:bg-green-50 hover:font-semibold" onClick={()=>startGame(civilLawWords[randomNumber])}>Civil Law 💰 </button>
      </div>
    </div>)}

    </main>

    <footer className="flex justify-content items-center gap-1 text-sm sm:text-sm">
        <p className= "text-xs sm:text-xl">JDJD Codes</p>
        <FontAwesomeIcon icon={faScaleBalanced} size="lg" aria-hidden="true"></FontAwesomeIcon>
    </footer>
    </div>
  )
}

export default App
