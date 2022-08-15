import { useState } from 'react'

const People = ({ people }) => {
  return (
    people.map(person => {
      return (
        <p>{person.name} {person.number}</p>
      )
    })
  )
}

const AddPerson = ({ persons, setPersons, setPeopleDisplay }) => {
  const [newPerson, setNewPerson] = useState(
    {
      name: "",
      number: ""
    }
  )

  const addPerson = (event) => {
    event.preventDefault()
    console.log()
    if (checkNameExists(newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
      setPeopleDisplay(persons)
    }
    setNewPerson(
      {
        name: "",
        number: ""
      }
    )
  }

  const checkNameExists = (name) => {
    return ((persons.filter(person => person.name.toLowerCase() === name.toLowerCase())).length > 0)
  }

  const handleNameChange = (event) => {
    setNewPerson({
      name: event.target.value,
      number: newPerson.number
    })
  }

  const handleNumberChange = (event) => {
    setNewPerson({
      name: newPerson.name,
      number: event.target.value
    })
  }

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newPerson.name} onChange={handleNameChange} />
        number: <input value={newPerson.number} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Search = ({ persons, setPeopleDisplay }) => {
  const [searchBar, setSearchBar] = useState('')

  const handlePeopleSearch = (event) => {
    setSearchBar(event.target.value)
    setPeopleDisplay(searchPerson(searchBar))
  }

  const searchPerson = (name) => {
    return (persons.filter(person => person.name.toLowerCase().includes(name.toLowerCase())))
  }
  return (
    <input value={searchBar} onChange={handlePeopleSearch} />
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [peopleDisplay, setPeopleDisplay] = useState(persons)

  return (
    <div>
      <h2>Phonebook</h2>
      <h2>Search</h2>
      <Search persons={persons} setPeopleDisplay={setPeopleDisplay} />
      <h2>Add Person</h2>
      <AddPerson persons={persons} setPerson={setPersons} setPeopleDisplay={setPeopleDisplay} />
      <h2>Numbers</h2>
      <People people={peopleDisplay} />
    </div>
  )
}

export default App