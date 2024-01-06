import { useEffect, useState } from 'react'
import Notification from './components/Notification'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personServices from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [personsSearch, setPersonsSearch] = useState([])
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(0)

  useEffect(() => {
    personServices
      .getAll()
      .then(response => {
        setPersons(response)
        setPersonsSearch(response)
      })
    }, [])


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }


  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }


  const handleNewSearch = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
    setPersonsSearch(persons.filter((person) => 
      person.name.toUpperCase().includes(event.target.value.toUpperCase())
    ))
  }


  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons[persons.length-1].id + 1
    }

    for(let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          personServices
            .update(persons[i].id, personObject)
            .then(response =>{
              const newPersons = persons.map(person => person.name !== newName ? person :{...person, number:newNumber})
              setPersons(newPersons)
              setPersonsSearch(newPersons)
            })
        } 
        return;
      }
    }

    personServices
      .create(personObject)
      .then(response => {
        const newPersons = persons.concat(response)
        setPersons(newPersons)
        setPersonsSearch(newPersons)
        setMessage(
          `Added ${newName}`
        )
        setIsError(0)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const removePerson = ( id ) => {
    if (window.confirm("Are you sure you want to delete?")) {
      personServices
        .remove(id)
        .then( response => {
          const newPersons = persons.filter(person => person.id != id)
          setPersons(newPersons)
          setPersonsSearch(newPersons)
        })
        .catch( (error) => { 
          setIsError(1)
          setMessage(
            `Information of ${
              persons.find(person => person.id === id).name
            } has already been removed from the server`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Notification
        message={message}
        error={isError}
      />

      <Filter 
        newSearch={newSearch} 
        handleNewSearch={handleNewSearch}
      />

      <h3>Add a New</h3>

      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons 
        persons={personsSearch} 
        removePerson={removePerson}
      />

    </div>
  )
}

export default App
