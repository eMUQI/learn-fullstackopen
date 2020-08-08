import React, { useState } from 'react'

const Person = ({ person }) => {
  return (
    <tr>
      <td>{person.name}</td><td>{person.number}</td>
    </tr>
  )
}

const Numbers = ({ persons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {persons.map(person => <Person key={person.name} person={person} />)}
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [serachName, setSearchName] = useState('')
  const [personToShow, setPersonToShow] = useState(persons)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const updatePersonToShow = (persons,filterWord) => {
    const personOdject = persons.filter(person => person.name.toLowerCase().indexOf(filterWord.toLowerCase()) !== -1
    )
    console.log("in update,",personOdject)
    setPersonToShow(personOdject)
  }

  const handlSearchChange = (event) => {
    setSearchName(event.target.value)
    updatePersonToShow(persons,event.target.value)
    // const personOdject = event.target.value === ''
    //   ? persons
    //   : persons.filter(person => person.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1
    //   )
    // setPersonToShow(personOdject)

    console.log("t", event.target.value)
    console.log("sn", serachName)
    // console.log("po", personOdject)
    console.log("p2s", personToShow)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)

    if (names.indexOf(newName) === -1) {
      const personObject = [{ name: newName, number: newNumber }]
      setPersons(persons.concat(personObject))
      updatePersonToShow(persons.concat(personObject),serachName)
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
      <div>filter shown with <input value={serachName} onChange={handlSearchChange} /></div>

      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button type="submit">add</button></div>
      </form>

      <Numbers persons={personToShow} />
    </div>
  )
}

export default App