import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import './index.scss'

import { LayoutContext } from '../layout'
import { ThemeContext } from '../../App'

const Card = ({ country }) => {
  const { getCountryDetails, rawData, filteredCountries } = useContext(
    LayoutContext
  )

  const { darkMode } = useContext(ThemeContext)
  let navigate = useNavigate()

  const ShowCountryDetails = () => {
    navigate(
      `/country/${country.numericCode}`
      // getCountryDetails(country.numericCode, rawData)
    )
  }

  return (
    <div
      className={darkMode ? 'card__container dark-card' : 'card__container'}
      onClick={ShowCountryDetails}
    >
      <div className="card__flad-container">
        <img src={country.flags.png} alt="" className=" x country flag" />
      </div>
      <div className="card__details-container">
        <h1 className="card-name">{country.name}</h1>
        <div className="card__details">
          <p className="card__details-content">
            Population: <span>{country.population}</span>
          </p>
          <p className="card__details-content">
            Region: <span>{country.region}</span>
          </p>
          <p className="card__details-content">
            Capital: <span>{country.capital}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Card
