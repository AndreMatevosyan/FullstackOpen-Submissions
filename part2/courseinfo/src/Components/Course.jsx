const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ parts }) => {
  const sum = parts.reduce((s, p) => s + p.exercises, 0)
  return ( 
    <p> 
      <strong>
        Number of exercises {sum}
      </strong>
    </p>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => parts.map((part) => <Part part={part} key={part.id}/>)


const Course = ({ courses }) => courses.map((course) =>
  <div key={course.id}>
    <Header 
      course={course.name}
    />
    <Content 
      parts={course.parts}
    />
    <Total 
      parts={course.parts}
    />
  </div>
)

export default Course