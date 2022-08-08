import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  function handleGood() {
    setGood(good + 1)
  }

  function handleNeutral() {
    setNeutral(good + 1)
  }

  function handleBad() {
    setBad(good + 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button name={"Good"} func={handleGood} />
      <Button name={"Neutral"} func={handleNeutral} />
      <Button name={"Bad"} func={handleBad} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

const Button = ({ name, func }) => {
  return (
    <button onClick={func}>{name}</button>
  )
}

const Statistics = ({ good, bad, neutral }) => {
  if ((good + bad + neutral) == 0) {
    return (
      <p>No Feedback given</p>
    )
  }
  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text={"Good"} value={good} />
          <StatisticLine text={"Neutral"} value={neutral} />
          <StatisticLine text={"Bad"} value={bad} />
          <StatisticLine text={"All"} value={bad + neutral + good} />
          <StatisticLine text={"Average"} value={(((good - bad) / (bad + neutral + good)) * 100) + "%"} />
          <StatisticLine text={"Positive"} value={((good / (bad + neutral + good)) * 100) + "%"} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

export default App