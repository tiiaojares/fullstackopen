import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import personService from './services/persons';

//tehtävät 3.19-3.21


// filteröinti
const Filter = (props) => {
  if (props === null || undefined) {
    return null;
  }
  return (
  <div className="filterColumn">
    <p className="column3"> Filter shown with </p>
    <div className="column4">
      <input
        value={props.filter}
        onChange={props.filterWith}
      />
    </div>
  </div>
)}

 // yhteystietojen listaus filteröinnin mukaan
 const ShowNumbers = ({persons, filter, deleteInformation}) => {
  console.log("persons: ", persons)
  const numbers = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));
  return numbers.map(p => 
  <div className="numberRow" key={p.id}>
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
        <p className="column1"> name: </p> 
        <div className="column2">
          <input
            value={props.newName}
            onChange={props.handleSetName} 
          />
        </div>
      </div>
      <div>
        <p className="column1"> number: </p>
        <div className="column2">
          <input 
            value={props.newNumber}
            onChange={props.handleSetNumber}
          />
        </div>
      </div>
    </div>
  )
}


const Notification = ({ successMessage, errorMessage }) => {
  if (successMessage === null && errorMessage === null) {
    return null;
  }
  if (successMessage !== null) {
    return (
      <div className="successInfo">
        {successMessage}
      </div>
    )
  }
  return (
    <div className="errorInfo">
      {errorMessage}
    </div>
  )
}

const App = () => {
  
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // haetaan personit ja sijoitetaan ne tilaan
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        console.log("response: ", response)
        setPersons(response);
      })
  }, [])

  const handleSetName = (event) => {
    setNewName(event.target.value);
  }

  const handleSetNumber = (event) => {
    setNewNumber(event.target.value);
  }


  // evet.preventDefault() estää lomakkeen lähettämisen ennen nimen tallennusta 'persons' tauluun
  // ilman metodia sivu latautuu heti uudelleen ja nimilista katoaa
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
            setSuccessMessage(`${name}'s number has been replaced`);
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
        }
      
    } else {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('');
          setNewNumber('');
          setSuccessMessage(`Added new person to the phonebook: ${personObject.name}`);
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000);
        })
        .catch(error => {
          setErrorMessage(error.response.data.error);
          console.log(error.response.data.error);
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000);
        })
    }
  }

  // poistaa henkilön tiedot listalta
  const deleteInformation = deletePerson => {
    if (window.confirm(`Delete ${deletePerson.name}?`)) {
      console.log("poistetaan henkilö: ", deletePerson);
      personService
        .deletePerson(deletePerson.id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== deletePerson.id))
          setSuccessMessage(`Deleted ${deletePerson.name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(`the person ${deletePerson.name} was already deleted from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000);
          setPersons(persons.filter(person => person.id !== deletePerson.id))
        })
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
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
      <Filter 
        filter={filter}
        filterWith={filterWith}
      />
      <div>
        <h3>Numbers</h3>
        <ShowNumbers persons={persons} filter={filter} deleteInformation={deleteInformation}/>
      </div>
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