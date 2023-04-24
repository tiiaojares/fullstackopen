import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import personService from './services/persons';

//tehtävät 2.12-2.15


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
 const ShowNumbers = ({persons, filter, deleteInformation}) => {
  const numbers = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));
  return numbers.map(p => 
  <div key={p.id}>
    <button className="deleteButton" onClick={() => deleteInformation(p)}>delete</button> 
    <p> {p.name} {p.number} </p>
  </div>
  );
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
    personService
      .getAll()
      .then(response => {
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
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = { name: newName, number: newNumber };
    console.log('new Person: ', personObject);
    const findPerson = persons.find(person => person.name === personObject.name);
    if (findPerson) {
      const id = findPerson.id;
      const name = findPerson.name;
      if (window.confirm(`${name} is already added to phonebook, replace the old number with a new one?`)) {
          personService
            .update(id, personObject)
            .then(response => {
              setPersons(persons.map(person => person.id !== id ? person : response.data))
            })
        }
      
    } else {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('');
          setNewNumber('');
        })
    }
  }

  // poistaa henkilön tiedot listalta
  const deleteInformation = deletePerson => {
    if (window.confirm(`Delete ${deletePerson.name}?`)) {
      console.log("poistetaan henkilö: ", deletePerson);
      personService
        .deletePerson(deletePerson.id)
        .then(setPersons(persons.filter(person => person.id !== deletePerson.id)))
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
      <ShowNumbers persons={persons} filter={filter} deleteInformation={deleteInformation}/>
      <form onSubmit={addPerson}>
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