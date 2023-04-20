import { useState } from 'react'
import './App.css'


// tehtävä 1.6-1.11

const StatisticLine = (props) => {
  return (
  <tr> 
    <td> {props.text} </td> 
    <td> {props.value} </td>
  </tr>
  )
}

const Statistics = ({good, bad, neutral, all}) => {
  const positive = good / all * 100 + " %" ;
  const average = ( good * 1 + bad * -1 + neutral * 0 ) / all;

  if(all === 0) {
    return (
      <p> No feedback given </p>
    )
  }

  return (
  <table>
    <tbody>
    <StatisticLine text="Good" value={good}/>
    <StatisticLine text="Neutral" value={neutral}/>
    <StatisticLine text="bad" value={bad}/>
    <StatisticLine text="All" value={all}/>
    <StatisticLine text="Average" value={average}/>
    <StatisticLine text="Positive" value={positive}/>   
    </tbody>
  </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  

  const updateGood = () => {
    setGood(good + 1);
    setAll(all + 1);
  }

  const updateNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  }

  const updateBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
  }

  const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

  return (
    <div>
      <div>
        <h1>Give feedback</h1>
        <Button handleClick={updateGood} text='good' />
        <Button handleClick={updateNeutral} text='neutral' />
        <Button handleClick={updateBad} text='bad' />
      </div>
      <div>
        <h2> Statics</h2>
        <Statistics good={good} bad={bad} neutral={neutral} all={all}/>
      </div>
    </div>
  )
}

export default App
