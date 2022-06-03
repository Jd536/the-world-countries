import React, { useContext, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

import './index.scss'
import { Link, useSearchParams } from 'react-router-dom'
import { ThemeContext } from '../../../App'
import { LayoutContext } from '../../layout'

const Dropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const { darkMode } = useContext(ThemeContext)
  const { dispatchFilteredCountries } = useContext(LayoutContext)
  let [searchParams] = useSearchParams()

  const handleDropDownClick = region => {
    // let region = searchParams.get('region')
    let data = JSON.parse(localStorage.getItem('COUNTRIES_ALL'))
    let filteredList
    if (region === 'all') {
      dispatchFilteredCountries({ type: 'SEARCH', payload: data })
    } else {
      filteredList = data.filter(country => country.region === region)

      dispatchFilteredCountries({ type: 'SEARCH', payload: filteredList })
    }
  }

  const handleDropdownVisibility = e => {
    e.stopPropagation()
    setShowDropdown(!showDropdown)
  }

  return (
    <div
      className={
        darkMode
          ? 'dropdown-container dropdown-container-dark'
          : 'dropdown-container '
      }
    >
      <button
        className={
          darkMode ? 'dropdown-button dropdown-button-dark' : 'dropdown-button'
        }
        onClick={handleDropdownVisibility}
      >
        Filter By Region{' '}
        <FontAwesomeIcon icon={showDropdown ? faChevronDown : faChevronUp} />
      </button>
      {showDropdown ? (
        <ul
          onClick={handleDropdownVisibility}
          className={
            darkMode
              ? 'dropdown__regions dropdown__regions-dark'
              : 'dropdown__regions'
          }
        >
          <li
            className="dropdown__regions-item"
            onClick={() => {
              handleDropDownClick('Africa')
            }}
          >
            <Link to="/country?region=africa">Africa</Link>
          </li>
          <li
            className="dropdown__regions-item"
            onClick={() => {
              handleDropDownClick('Americas')
            }}
          >
            <Link to="/country?region=america">Americas</Link>
          </li>
          <li
            className="dropdown__regions-item"
            onClick={() => {
              handleDropDownClick('Asia')
            }}
          >
            <Link to="/country?region=asia">Asia</Link>
          </li>
          <li
            className="dropdown__regions-item"
            onClick={() => {
              handleDropDownClick('Europe')
            }}
          >
            <Link to="/country?region=europe">Europe</Link>
          </li>
          <li
            className="dropdown__regions-item"
            onClick={() => {
              handleDropDownClick('Oceania')
            }}
          >
            <Link to="/country?region=oceania">Oceania</Link>
          </li>
          <li
            className="dropdown__regions-item"
            onClick={() => {
              handleDropDownClick('all')
            }}
          >
            <Link to="/country?region=oceania">All countries</Link>
          </li>
        </ul>
      ) : (
        ''
      )}
    </div>
  )
}

export default Dropdown
