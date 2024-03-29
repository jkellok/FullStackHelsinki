import { useState } from 'react'

const Heading = (props) => (
  <h1>{props.text}</h1>
)

const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
)

const MostVoted = ({ points, anecdotes }) => {
  // points array passed as parameter
  let arr = points

  // if every element is 0, return null so that we don't render anything
  const someIsNotZero = arr.some(item => item !== 0)
  if (!someIsNotZero)
    return null

  let maxIndex = 0; // initialize for holding index of max value
  for (let i = 1; i < arr.length; i++) {
    // if larger than current maxIndex, assign as new maxIndex
    if (arr[i] > arr[maxIndex]) {
      maxIndex = i
    }
  }
  console.log("maxIndex is", maxIndex)

  return (
    <div>
      <AnecdotesDisplay anecdote={anecdotes[maxIndex]} />
      <VoteCount amount={points[maxIndex]} />
    </div>
  )
}

const VoteCount = (props) => (
  <div>has {props.amount} votes</div>
)

const AnecdotesDisplay = (props) => (
  <div>{props.anecdote}</div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(8)) // zero-filled array

  // random number between 0-7 based on length of array
  const getRandomNumber = () => {
    setSelected(() => Math.floor(Math.random() * anecdotes.length))
  }

  console.log("selected", selected)
  console.log("points", points)

  const incrementVote = (props) => {
    const copy = [...points]
    // increment value in position based on selected state
    copy[props] += 1
    setPoints(copy)
  }

  return (
    <div>
      <Heading text="Anecdote of the day" />
      <AnecdotesDisplay anecdote={anecdotes[selected]} />
      <VoteCount amount={points[selected]} />
      <Button handleClick={() => incrementVote(selected)} text="vote" />
      <Button handleClick={() => getRandomNumber()} text="next anecdote" />
      <Heading text="Anecdote with most votes" />
      <MostVoted points={points} anecdotes={anecdotes} />
    </div>
  )
}

export default App
