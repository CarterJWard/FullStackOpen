const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }


  return (
    <>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total part1={part1.exercises} part2={part2.exercises} part3={part3.exercises} />
    </>
  )
}
const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part course={props.part1} />
      <Part course={props.part2} />
      <Part course={props.part2} />
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.course.name} {props.course.number}</p>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.part1 + props.part2 + props.part3}</p>
  )
}

export default App