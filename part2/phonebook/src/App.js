import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({ person }) => {
  return (
    <tr>
      <td>{person.name}</td><td>{person.number}</td>
    </tr>
  )
}

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>name: <input value={newName} onChange={handleNameChange} /></div>
      <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Filter = ({ serachName, handlSearchChange }) => {
  return (
    <div>filter shown with <input value={serachName} onChange={handlSearchChange} /></div>
  )
}

const Numbers = ({ persons }) => {
  return (
    <div>
      <h3>Numbers</h3>
      <table>
        <tbody>
          {persons.map(person => <Person key={person.name} person={person} />)}
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setPersonToShow(response.data)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [serachName, setSearchName] = useState('')
  const [personToShow, setPersonToShow] = useState([])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const updatePersonToShow = (persons, filterWord) => {
    const personOdject = persons.filter(person => person.name.toLowerCase().indexOf(filterWord.toLowerCase()) !== -1
    )
    setPersonToShow(personOdject)
  }

  const handlSearchChange = (event) => {
    setSearchName(event.target.value)
    updatePersonToShow(persons, event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)

    if (names.indexOf(newName) === -1) {
      const personObject = [{ name: newName, number: newNumber }]
      setPersons(persons.concat(personObject))
      updatePersonToShow(persons.concat(personObject), serachName)
    }
    else {
      alert(`${newName} is already added to phonebook`)
    }

    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter serachName={serachName} handlSearchChange={handlSearchChange} />

      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <Numbers persons={personToShow} />
    </div>
  )
}

export default App