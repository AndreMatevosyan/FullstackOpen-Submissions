import { useEffect, useState } from 'react'
import axios from 'axios'
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
    for(let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        alert(`${newName} is already added to phonebook`)
        return;
      }
    }
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    personServices
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response))
        setPersonsSearch(persons.concat(response))
      })

  }


  return (
    <div>
      <h2>Phonebook</h2>

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

      <Persons persons={personsSearch}/>

    </div>
  )
}

export default App