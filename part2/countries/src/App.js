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

  let oneCountry;
  if (list.length == 1) {
      oneCountry = list[0]
  } else if (selectedCountry) {
      oneCountry = selectedCountry
  } else {
    return list.map(c => 
      <div key={c.name.official}>
        <p className="countries"> {c.name.common} </p>
        <button onClick={() => select(c)} > show </button>
      </div>
    )
  }

  const languageKeys = Object.keys(oneCountry.languages)
  const language = languageKeys.map(l => 
    <li key={l}> {oneCountry.languages[l]} </li>
  )

  return (
    <div key={oneCountry.name.common}>
      <p id="countryName"> {oneCountry.name.common} </p>
      <p> Capital: {oneCountry.capital[0]} </p>
      <p> Area: {oneCountry.area} </p>
      <p> Languages: {language} </p>
      <img src={oneCountry.flags.png}  />
      <div>
        <Weather country={oneCountry} />
      </div>
      <button onClick={() => showAll()}> return </button>
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
