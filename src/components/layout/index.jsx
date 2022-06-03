import React, {
  useReducer,
  useState,
  createContext,
  useEffect,
  useContext,
} from 'react'
import { Routes, Route } from 'react-router-dom'

import { ThemeContext } from '../../App'

import Header from './Header'
import Country from './Pages/Country'
import Home from './Pages/Home/Index'

import './index.scss'

export const LayoutContext = createContext()

const filteredCountriesInitialState = {
  isLoading: true,
  data: [],
  countryData: [],
}

const filteredCountriesReducer = (state, action) => {
  switch (action.type) {
    case 'FETCHED':
      return {
        isLoading: false,
        data: action.payload,
        countryData: [],
        // borders: [],
        // borderCountries: [],
      }
    case 'SEARCH':
      return {
        isLoading: false,
        data: action.payload,
        countryData: [],
        // borders: [],
        // borderCountries: [],
      }
    case 'GET_COUNTRY':
      return {
        isLoading: false,
        data: state.data,
        countryData: action.countryDetails,
      }

    default:
      return { isLoading: true, data: [] }
  }
}

const Layout = () => {
  const { darkMode } = useContext(ThemeContext)
  const [rawData, setRawData] = useState([])
  const [compactData, setCompactData] = useState([])
  const [id, setId] = useState('')
  const [filteredCountries, dispatchFilteredCountries] = useReducer(
    filteredCountriesReducer,
    filteredCountriesInitialState
  )

  //  RETURNS A AN ARRAY OF OBJECTS THAT CONTAIN THE COUNTRY NAME, NUMERICCODE AND ALPHAC2CODE
  const getCompactData = (data) => {
    let countries = data.map((country) => {
      return {
        name: country.name,
        numericCode: country.numericCode,
        alpha3Code: country.alpha3Code,
      }
    })
    localStorage.setItem('COMPACTDATA', JSON.stringify(countries))
    setCompactData(countries)
  }

  // RETURN SINGLE COUNTRY DETAILS
  const getCountryDetails = (id, data) => {
    let countryDetails = data.filter((country) => country.numericCode === id)

    let borders = countryDetails[0].borders
      ? countryDetails[0].borders.map((e) => {
          // console.log(e)
          // console.log(JSON.parse(localStorage.getItem('COMPACTDATA')))
          return JSON.parse(localStorage.getItem('COMPACTDATA')).filter(
            (data) => {
              return data.alpha3Code === e
            }
          )
        })
      : []
    console.log(borders)
    dispatchFilteredCountries({
      type: 'GET_COUNTRY',
      countryDetails: [countryDetails, borders],
    })
  }

  useEffect(() => {
    let localData = localStorage.getItem('COUNTRIES_ALL')
    if (localData != null) {
      setRawData(JSON.parse(localData))
      dispatchFilteredCountries({
        type: 'FETCHED',
        payload: JSON.parse(localData),
      })
    } else {
      fetch('https://restcountries.com/v2/all')
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error(
              `Error connecting to the API: Error ${response.status}`
            )
          }
        })
        .then((data) => {
          localStorage.setItem('COUNTRIES_ALL', JSON.stringify(data))
          setRawData(data)
          dispatchFilteredCountries({ type: 'FETCHED', payload: data })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

  useEffect(() => {
    getCompactData(JSON.parse(localStorage.getItem('COUNTRIES_ALL')))
  }, [])

  return (
    <LayoutContext.Provider
      value={{
        filteredCountries,
        rawData,
        setRawData,
        setId,
        id,
        getCountryDetails,
        dispatchFilteredCountries,
      }}
    >
      <div
        className={
          darkMode ? 'container-main container-main-dark' : 'container-main'
        }
      >
        <Header />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/country" element={<Home />} />
            <Route path="/country/:id" element={<Country />} />
          </Route>
        </Routes>
      </div>
    </LayoutContext.Provider>
  )
}

export default Layout

// use reducer to manipulate the data - search component and the country detail component
