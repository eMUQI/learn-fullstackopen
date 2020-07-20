import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, name }) => (
  <button onClick={handleClick}>{name}</button>
)

const Statistic = ({ text, value }) => (<p>{text} {value}</p>)

const Statistics = ({ good, neutral, bad }) => {
  let avaerage = (good - bad) / (good + neutral + bad)
  let positive = good / (good + neutral + bad) * 100
  let all = good + neutral + bad

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <Statistic text="good" value={good}/>
      <Statistic text="neutral" value={neutral}/>
      <Statistic text="bad" value={bad}/>
      <Statistic text="all" value={all}/>
      <Statistic text="avaerag" value={avaerage}/>
      <Statistic text="positive" value={positive.toString()+"%"}/>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }

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