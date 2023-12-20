const Persons = ( {persons, removePerson} ) => persons.map((person) => 
    <div key={person.id}>
        <p>{person.name} {person.number}</p>
        <button onClick={() => removePerson(person.id)}>delete</button>
    </div>
)

export default Persons