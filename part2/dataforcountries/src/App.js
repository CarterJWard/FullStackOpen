import { useState, useEffect } from 'react';
import axios from 'axios';

const CountryList = ({ countries, search }) => {
  if (countries.length === 1) {
    return (<SingleCountry country={countries[0]} />)
  }
  if (countries.length < 10) {
    return (
      countries.map(country => {
        return (
          <>
            <p>{country.name.common}</p> <button onClick={search} value={country.name.common}>Show</button>
          </>
        )
      })
    )
  } else {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
}

const SingleCountry = ({ country }) => {
  console.log(country)
  return (
    <div className='SingleCountry'>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      {
        Object.values(country.languages).map((lang, index) => {
          return (
            <li>{lang}</li>
          )
        })
      }
      {country.flag}
    </div>
  )
}

function App() {
  const [searchCriteria, setSearchCriteria] = useState('')
  const [countries, setCountries] = useState('')
  const [listing, setListing] = useState([])
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    setSearchCriteria(event.target.value)
    setListing(countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <div>
      <p>Find Countries</p>
      <input value={searchCriteria} onChange={handleSearch} />
      <CountryList countries={listing} search={handleSearch} />
    </div>
  );
}

export default App;
