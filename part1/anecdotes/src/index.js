import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({ text, onClick }) => (
  < button onClick={onClick} > {text}</button>
)

const Anecdote = ({ text, vote }) => (
  <div>
    <p>{text}</p>
    <p>has {vote} votes </p>
  </div>
)

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0])
  const [mostVoteIndex, setMostVoteIndex] = useState(0)

  let mostVote = -1
  let max

  const updateMostVote = (newPoints) => {
    for (let i = 0; i < newPoints.length; i++) {
      if (newPoints[i] > mostVote) {
        mostVote = newPoints[i]
        max = i
      }
    }
    setMostVoteIndex(max)
  }

  const handleNextClick = () => {
    let randomindex = Math.floor(Math.random() * 10) % 6
    setSelected(randomindex)
  }

  const handleVoteClick = () => {
    const newPoints = [...points]
    newPoints[selected] += 1
    setPoints(newPoints)
    updateMostVote(newPoints)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} vote={points[selected]} />
      <Button text="vote" onClick={() => handleVoteClick()} />
      <Button text="next anecdote" onClick={handleNextClick} />
      <h1>Anecdote with most votes</h1>
      <Anecdote text={anecdotes[mostVoteIndex]} vote={points[mostVoteIndex]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
