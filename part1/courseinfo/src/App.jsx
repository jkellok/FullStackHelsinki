// renders headings
// function has a parameter which receives an object props
// object field rendered inside
const Header = (props) => {
  console.log('header props ', props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

// renders content and exercises
const Content = (props) => {
  console.log('content props ', props)
  console.log('parts first element ', props.parts[0])
  return (
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  )
}

const Part = (props) => {
  console.log('part props ', props)
  return (
    <div>
      <p>{props.part.name} {props.part.exercises}</p>
    </div>
  )
}

// renders total number of exercises
const Total = (props) => {
  console.log('total props ', props)
  return (
    <div>
      <p>
        Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
      </p>
    </div>
  )
}

// const-definitions and rendering components
// pass data into components
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
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App