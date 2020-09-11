import React, { useState, useEffect } from 'react';
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Filter = ({ countries, countryFilter, setCountryFilter, countriesToShow, updateCountriesToShow, isToMany }) => {

  // console.log("inF", countries)
  // console.log("inF2S", countriesToShow)

  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value)
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
        <p><strong>capital</strong> {countriesToShow[0].capital}</p>
        <p><strong>population</strong> {countriesToShow[0].population}</p>
        <h3>Spoken language</h3>
        <ul>
          {countriesToShow[0].languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={countriesToShow[0].flag} alt={countriesToShow[0].name + "'s flag"} />
        < Weather cityName={countriesToShow[0].capital} />
      </div>
      : <></>
  )
}

const Weather = ({ cityName }) => {
  const [temperature, setTemperature] = useState()
  const [windDegree, setWindDegree] = useState()
  const [windSpeed, setWindSpeed] = useState()
  const [statusIcon, setstatusIcon] = useState()


  useEffect(() => {
    axios
      .get("http://api.weatherstack.com/current?access_key=" + api_key + "&query=" + cityName)
      .then(response => {
        console.log("api.weatherstack.com respone\n", response)
        console.log(response.data)
        console.log("ax", cityName)
        setTemperature(response.data.current.temperature)
        setWindDegree(response.data.current.wind_degree)
        setWindSpeed(response.data.current.wind_speed)
        setstatusIcon(response.data.current.weather_icons)
      })
  })

  return (
    <div>
      <h3>Weather in {cityName}</h3>
      <img src={statusIcon} alt=""/>
      <p><strong>temperature:</strong>{temperature} Celsius</p>
      <p><strong>wind:</strong>{windSpeed} mph direction {windDegree}</p>
    </div>
  )
}

const App = () => {
  const [countries, setCoutries] = useState([])
  const [countryFilter, setCountryFilter] = useState("")
  const [countriesToShow, setCoutriesToShow] = useState([])
  const [isToMany, setIsToMany] = useState(true)

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        console.log("restcountries.eu response", response)
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
        setCountryFilter={setCountryFilter}
        countriesToShow={countriesToShow}
        setCoutriesToShow={setCoutriesToShow}
        updateCountriesToShow={updateCountriesToShow}
        isToMany={isToMany}
        setIsToMany={setIsToMany}
      />
      <Country countriesToShow={countriesToShow} />
      {/* <Weather cityName="Landon" /> */}
    </div>
  )
}

export default App;
