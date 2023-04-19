
// tehtävät 1.3-1.5:


const Header = (props) => {
  console.log(props);
  return <h1> {props.name} </h1>
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part ={props.parts[0]} />
      <Part part ={props.parts[1]} />
      <Part part ={props.parts[2]} />
    </div>
  )
}
const Total = (props) => {
  let number = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises;
  return <p>Number of exercises {number}</p>
}



const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

// tehtävät 1.1-1.2:
/*

const Header = (props) => {
  console.log(props);
  return <h1> {props.course} </h1>
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part ={props.part1} exercise={props.exercise1} />
      <Part part ={props.part2} exercise={props.exercise2} />
      <Part part ={props.part3} exercise={props.exercise3} />
    </div>
  )
}

const Total = (props) => {
  return <p>Number of exercises {props.number}</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14


  return (
    <div>
      <Header course={course} />
      <Content part1={part1} exercise1={exercises1} part2={part2} exercise2={exercises2} part3={part3} exercise3={exercises3}/>
      <Total number={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}
*/

export default App



