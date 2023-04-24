import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';

//tehtävät 2.11

// filteröinti
const Filter = (props) => {
return (
  <div>
    Filter shown with
    <input
      value={props.filter}
      onChange={props.filterWith}
    />
  </div>
)}

 // yhteystietojen listaus filteröinnin mukaan
 const ShowNumbers = ({persons, filter}) => {
  const numbers = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));
  return numbers.map(p => <p key={p.name}> {p.name} {p.number} </p>);
}

// luodaan uusi yhteystieto
const PersonForm = (props) => {
  return (
    <div>
      <div>
        name: 
        <input 
          value={props.newName}
          onChange={props.handleSetName} 
        />
      </div>
      <div>
        number:
        <input 
          value={props.newNumber}
          onChange={props.handleSetNumber}
        />
      </div>
    </div>
  )
}

const App = () => {
  
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  // haetaan personit ja sijoitetaan ne tilaan
  useEffect(() => {
    console.log('effect');
    axios
      .get('http://localhost:3001/persons').then(response => {
        console.log('promise fulfilled');
        setPersons(response.data);
      })
  }, [])

  const handleSetName = (event) => {
    setNewName(event.target.value);
  }

  const handleSetNumber = (event) => {
    setNewNumber(event.target.value);
  }

  // evet.preventDefault() estää lomakkeen lähettämisen ennen nimen tallennusta 'persons' tauluun
  // ilman metosia sivu latautuu heti uudelleen ja nimilista katoaa
  const addName = (event) => {
    event.preventDefault();
    const personObject = { name: newName, number: newNumber };
    console.log('new Person: ', personObject);
    if (persons.find(person => person.name == personObject.name)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
    }
  }

  const filterWith = (event) => {
    setFilter(event.target.value);
  }

  const style={
    marginLeft: '30px',
  }

  return (
    <div style={style}>
      <h2>Phonebook</h2>
      <Filter 
        filter={filter}
        filterWith={filterWith}
      />
      <h3>Numbers</h3>
      <ShowNumbers persons={persons} filter={filter}/>
      <form onSubmit={addName}>
        <div>
          <h4> Add a new </h4>
          <PersonForm 
            newName={newName}
            handleSetName={handleSetName}
            newNumber={newNumber}
            handleSetNumber={handleSetNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default App