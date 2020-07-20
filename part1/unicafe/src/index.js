import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, name }) => (
  <button onClick={handleClick}>{name}</button>
)

const Statistics = ({good,neutral,bad}) => (
  <div>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
  </div>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => (setGood(good + 1))
  const handleNeutralClick = () => (setNeutral(neutral + 1))
  const handleBadClick = () => (setBad(bad + 1))


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => handleGoodClick()} name="good" />
      <Button handleClick={() => handleNeutralClick()} name="neutral" />
      <Button handleClick={() => handleBadClick()} name="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)