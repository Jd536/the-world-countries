import React, { usestate, useContext, useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import './index.scss'

import { LayoutContext } from '../layout'
import { ThemeContext } from '../../App'

const Search = () => {
  const { rawData, dispatchFilteredCountries } = useContext(LayoutContext)
  const { darkMode } = useContext(ThemeContext)
  const countries = rawData

  const [inputValue, setInputValue] = useState('')

  //Update the input value when user types in the input field
  const handleInputChange = e => {
    setInputValue(e.target.value.toLowerCase())
  }

  // update the data when user types - when the input value changes.
  useEffect(() => {
    let data = countries.filter(country =>
      country.name.toLowerCase().includes(inputValue)
    )
    dispatchFilteredCountries({ type: 'SEARCH', payload: data })
    // console.log(data)
  }, [inputValue])

  return (
    <form className={darkMode ? 'search search-dark' : 'search '}>
      <div
        className={
          darkMode ? 'input-container input-container-dark' : 'input-container'
        }
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input
          onChange={handleInputChange}
          type="text"
          className={
            darkMode ? 'search-input search-input-dark' : 'search-input'
          }
          placeholder="Search for a country..."
          value={inputValue}
        />
      </div>
    </form>
  )
}

export default Search
