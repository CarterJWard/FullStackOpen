import { useState, useEffect } from 'react'
import personService from './services/persons.js'
import './App.css'

const Notification = ({ message }) => {
  console.log(message == null)
  if (message == null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const People = ({ people }) => {
  const deletePerson = (event) => {
    if (window.confirm('Delete this person From the phonebook?')) {
      personService
        .remove(event.target.value)
        .then(response => console.log(response))
    }

  }
  return (
    people.map(person => {
      return (
        <>
          <p>{person.name} {person.number}</p><button onClick={deletePerson} value={person.id}>delete</button>
        </>
      )
    })
  )
}

const AddPerson = ({ persons, setPersons, setPeopleDisplay, setMessage }) => {
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
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find(person => person.name === newPerson.name)
        personService
          .update(newPerson, personToUpdate.id)
          .then(reponse => console.log(reponse))
      }
    } else {
      setPersons(persons.concat(newPerson))
      setPeopleDisplay(persons.concat(newPerson))
      personService
        .create(newPerson)
        .then(response => console.log(response))
        .then(() => {
          setMessage(`Added ${newPerson.name} successfully`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
    setNewPerson(
      {
        name: "",
        number: ""
      }
    )
  }

  const checkNameExists = (name) => {
    return ((persons.find(person => person.name === name)) != null)
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
        <button type="submit">Add Person</button>
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
  const [persons, setPersons] = useState([])
  const [errorMessage, setErrorMessage] = useState()
  const [peopleDisplay, setPeopleDisplay] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        response = response.data
        setPersons(response)
        setPeopleDisplay(response)
      })
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <h2>Search</h2>
      <Search persons={persons} setPeopleDisplay={setPeopleDisplay} />
      <h2>Add Person</h2>
      <AddPerson persons={persons} setPersons={setPersons} setPeopleDisplay={setPeopleDisplay} setMessage={setErrorMessage} />
      <h2>Numbers</h2>
      <People people={peopleDisplay} />
    </div>
  )
}

export default App