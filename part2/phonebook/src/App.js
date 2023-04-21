import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleSetName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  // evet.preventDefault() estää lomakkeen lähettämisen ennen nimen tallennusta 'persons' tauluun
  // ilman metosia sivu latautuu heti uudelleen ja nimilista katoaa
  const addName = (event) => {
    event.preventDefault();
    const personObject = { name: newName };
    setPersons(persons.concat(personObject));
    setNewName('');
  }

  const listOfNumbers = persons.map(p => <p key={p.name}> {p.name} </p>) 

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleSetName} 
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {listOfNumbers}
    </div>
  )
}

export default App