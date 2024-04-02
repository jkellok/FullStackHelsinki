import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-123456',
      id: 1 },
    { name: 'Ada Lovelace',
      number: '39-44-5323523',
      id: 2 },
    { name: 'Dan Abramov',
      number: '12-43-234345',
      id: 3 },
    { name: 'Mary Poppendieck',
      number: '39-23-6423122',
      id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

  const addPerson = (event) => {
    event.preventDefault()

    function nameExists() {
      // some() iterative method, return true if (at least) one element passes the test
      const nameExists = (person) => person.name === newName
      console.log("nameExists result", persons.some(nameExists))
      return persons.some(nameExists)
    }
    // if newName exists already in persons, alert
    if (nameExists() === true) {
      console.log("name exists")
      alert(`${newName} is already added to phonebook`)
    }
    // if newName doesn't exist in persons, add it
    else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
        }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      // update filteredPersons too and empty search input
      // otherwise adding a person does not update filtered persons and would not be rendered
      setSearchValue('')
      setFilteredPersons(persons.concat(personObject))
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearchValue(event.target.value)
    // searchValue lags one character behind so using event.target.value better for filtering
    console.log("searchvalue", searchValue)
    // return Object.values(person).join('').toLowerCase().incl... to search by every property
    const filtering = persons.filter(person => {
      if (event.target.value === "") return persons // if search empty, return all persons
      return person.name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setFilteredPersons(filtering)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter searchValue={searchValue} handleSearchChange={handleSearchChange} />
      <h2>Add a new person</h2>
        <PersonForm addPerson={addPerson} searchValue={searchValue} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <div>
        {filteredPersons.map(person =>
          <Person key={person.id} person={person.name} number={person.number} />
          )}
      </div>
    </div>
  )
}

export default App