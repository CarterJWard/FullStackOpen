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
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
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
      {
        props.parts.map((part) => {
          return (<Part course={part} />)
        })
      }
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
    <p>
      Number of exercises {props.parts.reduce((total, currentValue) => total = total + currentValue.exercises, 0)}
    </p>
  )
}

export default App