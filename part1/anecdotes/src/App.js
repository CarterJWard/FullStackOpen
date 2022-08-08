import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const votes = [1, 0, 0, 0, 0, 0, 0]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(votes)
  const [max, setMax] = useState(votes.indexOf(Math.max(...votes)))

  const randomize = () => {
    const newNumber = Math.floor(Math.random() * (anecdotes.length - 1))
    setSelected(newNumber)
    setMax(points.indexOf(Math.max(...points)))
  }

  const addVote = index => {
    setPoints(existingItems => {
      return existingItems.map((item, j) => {
        return j === index ? item + 1 : item
      })
    })
  }

  return (
    <div>
      <h3>{anecdotes[selected]}</h3>
      <p>Votes {points[selected]}</p>
      <button onClick={randomize}>Next Anecdote</button>
      <button onClick={() => addVote(selected)}>Upvote</button>

      <h1>Most Upvoted Quote:</h1>
      <p>{anecdotes[max]} which has {points[max]} votes</p>
    </div>

  )
}

export default App