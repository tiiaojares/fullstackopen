
const Header = (props) => {
    console.log(props);
    return <h2> {props.name} </h2>
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
    return <b> Total of {totalAmount} exercises </b>
  }
  
  const Course = ({courses}) => {
    return (
      courses.map(course =>
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
      )
    )
  }

  export default Course;