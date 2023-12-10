import { useState } from 'react'

const Button = (props) => {
  return(
  <button onClick={props.onClick}>
    {props.text}
  </button>
  )
}

const StatisticLine = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </tbody>
  )
}

const Statistics = ({good, neutral, bad, total}) => {
  if (total === 0) return <p>No feedback given</p>
  return(
  <table>
    <StatisticLine text='good' value={good} />
    <StatisticLine text='neutral' value={neutral} />
    <StatisticLine text='bad' value={bad} />
    <StatisticLine text='all' value={total} />
    <StatisticLine text='average' value={(good-bad)/total} />
    <StatisticLine text='positive' value={good/total * 100 + '%'} />
  </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const addRating = (choice) => {
    setTotal(total + 1)
    return choice + 1
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(addRating(good))} text='good'/>
      <Button onClick={() => setNeutral(addRating(neutral))} text='neutral'/>
      <Button onClick={() => setBad(addRating(bad))} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  )
}

export default App
