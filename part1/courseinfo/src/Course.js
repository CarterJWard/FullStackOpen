const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum.reduce((total, currentValue) => total = total + currentValue.exercises, 0)}</p>

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Content = ({ parts }) => {
    return (
        parts.map(part =>
            <Part part={part} />
        )
    )
}

const Course = ({ courses }) => {
    return (
        courses.map(course => {
            return (
                <div>
                    <Header course={course.name} />
                    <Content parts={course.parts} />
                    <Total sum={course.parts} />
                </div>
            )
        })
    )
}

export default Course;