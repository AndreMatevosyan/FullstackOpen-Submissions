import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(8))
  const [mostIndex, setMostIndex] = useState(1)
  const copy = {...points}

  const nextAnecdote = () => setSelected(Math.round(Math.random()*7))

  const findMax = () => {
    let maxIndex = 0
    for(let i = 0; i < 8; i++) {
      maxIndex = (copy[i] >= copy[maxIndex]) ? i : maxIndex
    }
    return maxIndex
  }

  const addVote = () => {
    copy[selected] += 1
    setPoints(copy)
    setMostIndex(findMax)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={addVote}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostIndex]}</p>
      <p>has {points[mostIndex]} votes</p>
    </div>
  )
}

export default App
