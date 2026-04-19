import { useState, useEffect } from 'react'
import clsx from 'clsx'
import Confetti from "react-confetti"
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
  const [hint, setHint] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
 
  const gameWon = guessedLetters.length !== 0 && randomWord.word.split("").every(letter=>guessedLetters.includes(letter))
  console.log("guessedLettersLength", guessedLetters.length)
  console.log("gameWon", gameWon)
  const [announcementMessage, setAnnouncementMessage] = useState("")
 //*TODO* fix verdict logic below--simplify! 
  let verdict = ""
  useEffect(()=>{
 
  if (gameWon && civilLawWords.includes(randomWord)){
    verdict = "not liable"}
  else if (gameWon && !civilLawWords.includes(randomWord)){
    verdict = "not guilty"}
  if (!gameWon && civilLawWords.includes(randomWord)){
    verdict = "liable"}
  else if (!gameWon && !civilLawWords.includes(randomWord)){
    verdict = "guilty"}

  }, [isGameOver], [gameWon])



//useEffect - accessibility 
useEffect(()=>{
  let accessibleWord = randomWord.word.split("").map((letter)=>guessedLetters.includes(letter)? letter: "blank").join(" ")
  if (guessedLetters.length > 0){
  let lastLetter = guessedLetters[guessedLetters.length-1]
  setAnnouncementMessage(randomWord.word.includes(lastLetter)? `${lastLetter} is in the word.${accessibleWord}`: `${lastLetter} is not in the word. You have ${7-incorrectGuesses} remaining. ${accessibleWord}`)
  }
}, [randomWord.word, guessedLetters, incorrectGuesses])


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
            isGameLost(true)
            setIsGameOver(true)}
          return nextGuesses}
          else{
          return prevGuesses
        }}) 

  }
console.log("isGameOVer", isGameOver)



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

function showHint(){
  setHint(prevVal=>!prevVal)
}

useEffect(()=>{
        if (gameWon){
      setIsGameOver(true)
     }
}, [gameWon])

return (
  <div className="font-bzks bg-slate-50 flex flex-col items-center p-6 min-h-screen">
    {gameWon && <Confetti/>}
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
            <span key={index} className={`px-2 py-1 sm:px-4 sm:py-2 bold sm:text-xl ${letter === " "? "":"border-b-2"}`}>

              {guessedLetters.includes(letter)? letter.toUpperCase(): " "}
              </span>
           </>)}
           <p id="announcer" className="sr-only" aria-live="polite">{announcementMessage}</p>
        {isGameOver && randomWord.word.split("").map((letter, index)=>
            <span key={index} className={`px-2 py-1 sm:px-4 sm:py-2 sm:text-xl ${letter === " "? "":"border-b-2"}`}>
              <p className={!guessedLetters.includes(letter) && randomWord.word.includes(letter)? "text-red-500": ""}>
                {letter.toUpperCase()}
              </p>
              <p class = "sr-only" aria-live="polite">{`The word was ${randomWord.word}.`}</p>
              </span>)}
        </div>
        
        <div>
          {!hint? <button className="text-xs px-2 border-2 border-green-500 tracking-wide sm:font-medium sm:px-4 sm:py-2 rounded-2xl sm:text-xl shadow-lg hover:bg-green-50 hover:font-semibold" onClick={showHint}>Show Hint?</button>:
          <p className="sm:text-xl mt-4 text-center text-xs mb-2 "> Hint: {randomWord.hint}</p>}
        </div>
        
      </section>
 
    {/*Keyboard*/}
    <section className="flex flex-col justify-center items-center sm:gap-8 sm:mb-6">
      <div className="flex flex-row justify-center items-center flex-wrap gap-1 text-sm sm:text-sm">
      {!isGameOver && alphabet.split("").map(letter=>{
        return <button key={letter} 
                      className={clsx("border-2 py-1 px-2 text-xs sm:text-xl sm:py-2 sm:px-4", {"border-mist-500 bg-mist-50 hover:font-bold hover:border-slate-900" : !guessedLetters.includes(letter), "border-green-500 bg-green-50": randomWord.word.includes(letter) && guessedLetters.includes(letter), "border-red-500 bg-red-50": !randomWord.word.includes(letter) && guessedLetters.includes(letter)})} onClick={()=>guessLetter(letter)} 
                      disabled={guessedLetters.includes(letter) || isGameOver? true: false} 
                      >{letter.toUpperCase()}</button>
      })}
      {isGameOver && <p className="text-xs sm:text-xl" aria-live="polite">Judge: A verdict has been reached...your client is {verdict}!</p>}
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
