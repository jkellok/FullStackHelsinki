const Course = ({course}) => {

  const Name = ({ name }) => <h3>{name}</h3>

  const Part = ({ part }) =>
    <p>
      {part.name} {part.exercises}
    </p>

  const Total = ({ parts }) => {
    const total = parts.reduce((s, p) => {
      console.log('in total, s:', s, 'in total p', p.exercises)
      return s + p.exercises // accumulator + obj property
    }, 0) // initial value of 0
    // first time called: (0, {exercises: 10}), returns 0 + 10 = 10
    // second time: (10, {exercises: 7}), returns 10 + 7 = 17
    // third time: (17, {exercises: 14}), returns 17 + 14 = 31
    // and so on
    return (
      <strong>
        total of {total} exercises
      </strong>
    )
  }


  const Content = ({ parts }) =>
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </div>

    return (
      <div>
        <Name name={course.name}/>
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
}

export default Course