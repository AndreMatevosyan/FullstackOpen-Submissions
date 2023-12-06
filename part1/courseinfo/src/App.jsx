const Header = props => {
  return (
    <h1>
      {props.title}
    </h1>
  )
}

const Part = props => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Total = props => {
  return (
    <p>
      Number of exercises {props.total}
    </p>
  )
}

const Content = ({info}) => {
  return (
    <div>
      <Part part={info[0].name} exercises={info[0].exercises}/>
      <Part part={info[1].name} exercises={info[1].exercises}/>
      <Part part={info[2].name} exercises={info[2].exercises}/>
    </div>
  )
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

  const total = props => {
    let sum = 0;
    for (let i = 0; i < props.length; i++) {
      sum += props[i].exercises;
    }
    return sum;
  }

  return (
    <div>
      <Header title={course.name}/>
      <Content info={course.parts}/>
      <Total total={total(course.parts)}/>
    </div>
  )
}

export default App
