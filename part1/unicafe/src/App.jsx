import { useState } from 'react'

const Heading = (props) => (
  <h1>{props.text}</h1>
)

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = ((1 * good) + (0 * neutral) + (-1 * bad)) / all
  const positive = (good / all) * 100

  if (all === 0) {
    return (
      <div>No feedback given</div>
    )
  }

  return (
    <table>
      <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
      </tbody>
    </table>
  )
}

const StatisticLine = ({text, value}) => {
  // render % if statistics is "positive"
  if (text === "positive") {
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    )

  }
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Heading text="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Heading text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App