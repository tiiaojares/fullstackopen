
// tehtävät 2.1-2.3:


const Header = (props) => {
  console.log(props);
  return <h1> {props.name} </h1>
}

const Part = ({part}) => {
  return (
    <p key={part.id}>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({parts}) => {
  return (
    parts.map(part => 
      <Part part={part} />)
  )
}

const Total = ({parts}) => { 
  const totalAmount = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p> Total of {totalAmount} exercises </p>
}

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}



const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />

}

export default App



