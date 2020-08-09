import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Filter = ({ countries, countryFilter, setCoutryFilter, countriesToShow, updateCountriesToShow, isToMany }) => {

  console.log("inF", countries)
  console.log("inF2S", countriesToShow)

  const handleFilterChange = (event) => {
    setCoutryFilter(event.target.value)
    updateCountriesToShow(countries, event.target.value)
  }

  return (
    <div>
      find countries <input value={countryFilter} onChange={handleFilterChange} />
      {countriesToShow.length === 1 ? <></> :
        isToMany
          ? <p>To many matches, specify another filter</p>
          : countriesToShow.map(country => <FilterResult key={country.name} countryName={country.name} updateCountriesToShow={updateCountriesToShow} countriesToShow={countriesToShow} />)}
    </div>
  )
}

const FilterResult = ({ countryName, updateCountriesToShow, countriesToShow }) => {
  const handleShowClick = () => {
    updateCountriesToShow(countriesToShow, countryName)
  }

  return (
    <p>{countryName}<button onClick={handleShowClick}>show</button></p>
  )
}

const Country = ({ countriesToShow }) => {
  return (
    countriesToShow.length === 1
      ?
      <div>
        <h2>{countriesToShow[0].name}</h2>
        <p>capital {countriesToShow[0].capital}</p>
        <p>population {countriesToShow[0].population}</p>
        <h3>language</h3>
        <ul>
          {countriesToShow[0].languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={countriesToShow[0].flag} alt={countriesToShow[0].name + "'s flag"} />
      </div>
      : <></>
  )
}

const App = () => {
  const [countries, setCoutries] = useState([])
  const [countryFilter, setCoutryFilter] = useState("")
  const [countriesToShow, setCoutriesToShow] = useState([])
  const [isToMany, setIsToMany] = useState(true)

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        console.log(response)
        console.log(response.data)
        setCoutries(response.data)
        setCoutriesToShow(response.data)
      })
  }, [])

  const updateCountriesToShow = (countries, countryFilter) => {
    const countriesObject = countries.filter(country => country.name.toLowerCase().indexOf(countryFilter.toLowerCase()) !== -1)
    setIsToMany(countriesObject.length > 10 ? true : false)
    setCoutriesToShow(countriesObject)
  }


  return (
    <div>
      <Filter
        countries={countries}
        countryFilter={countryFilter}
        setCoutryFilter={setCoutryFilter}
        countriesToShow={countriesToShow}
        setCoutriesToShow={setCoutriesToShow}
        updateCountriesToShow={updateCountriesToShow}
        isToMany={isToMany}
        setIsToMany={setIsToMany}
      />
      <Country countriesToShow={countriesToShow} />
    </div>
  )
}

export default App;
