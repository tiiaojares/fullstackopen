import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Weather } from './Weather'


//tehtävä 2.18-2.20


const ShowCountries = ({countries, filter }) => {
  const [selectedCountry, setCountry] = useState(null);
  const list = countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))
  console.log(list.length)

  const select = (country) => {
    setCountry(country)
  }

  const showAll = () => {
    setCountry(null);
  }


  if (list.length > 10) {
    return <p className="italicText"> Too many matches, specify another filter </p>
  }

  if (list.length == 0) {
    return <p className="italicText"> No matches </p>
  }

  if (list.length == 1) {
    const country = list[0];
    const flagUrl = country.flags.png;
    const languageKeys = Object.keys(country.languages)
    const language = languageKeys.map(l => 
      <li key={l}> {country.languages[l]} </li>
    )
    return list.map( c =>
      <div key={c.name.common}>
        <p id="countryName"> {c.name.common} </p>
        <p> Capital: {c.capital[0]} </p>
        <p> Area: {c.area} </p>
        <p> Languages: {language} </p>
        <img id="flagImg" src={flagUrl} />
        <div>
        <Weather country={c} />
        </div>
      </div>
    )
  }

  if (selectedCountry) {
    const languageKeys = Object.keys(selectedCountry.languages)
    const language = languageKeys.map(l => 
      <li> {selectedCountry.languages[l]} </li>
    )
    return (
      <div key={selectedCountry.name.common}>
      <p id="countryName"> {selectedCountry.name.common} </p>
        <p> Capital: {selectedCountry.capital[0]} </p>
        <p> Area: {selectedCountry.area} </p>
        <p> languages:  </p>
        <img src={selectedCountry.flags.png}  />
        <div>
          <Weather country={selectedCountry} />
        </div>
        
        <button onClick={() => showAll()}> return </button>
    </div>
    )}

  return list.map(c => 
    <div key={c.name.official}>
      <p> {c.name.common} </p>
      <button onClick={() => select(c)} > show </button>
    </div>
  )
}

function App() {
  const[countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
    
  }, []);

  const filterWith = (event) => {
    setFilter(event.target.value);
    console.log("filter: ", event.target.value)
  }

 
  return (
    <>
      <div className="App">
        <h2> Find countries: </h2>
        <input type="text" value={filter} onChange={filterWith} />
      </div>
      <div>
        <ShowCountries countries={countries} filter={filter} />
      </div>
    </>
  );
}

export default App;
