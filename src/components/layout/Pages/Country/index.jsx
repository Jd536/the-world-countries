/*SAVE THE RAW DATA IN THE BROWSER MEMORY SO AN NE API REQUEST IS NOT MADE EVERYTIME THE USER RELOAD THE PAGE UNLESS THE PAGE WAS CLOSED OR BROWSER RELOADED*/

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import './index.scss'

import { LayoutContext } from '../..'
import { ThemeContext } from '../../../../App'

const Country = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState('true')
  const { darkMode } = useContext(ThemeContext)
  const { rawData, setRawData, filteredCountries, getCountryDetails } =
    useContext(LayoutContext)

  const params = useParams()
  let location = useLocation()

  // const [id, setId] = useState(params.id)
  const id = location.pathname.split('/').pop()

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const handleBackClick = () => {
    navigate(-1)

    getCountryDetails(
      params.id,
      JSON.parse(localStorage.getItem('COUNTRIES_ALL'))
    )
  }

  useEffect(() => {
    let savedData = JSON.parse(localStorage.getItem('COUNTRIES_ALL'))
    const delayer = setTimeout(() => {
      setLoading(false)
      getCountryDetails(id, savedData)
    }, 100)
    return () => clearTimeout(delayer)
  }, [id])

  if (loading) {
    return (
      <motion.div className="country">
        <button
          className={darkMode ? 'btn-back btn-back-dark' : 'btn-back'}
          onClick={handleBackClick}
        >
          {' '}
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
        <p>Loading country....</p>
      </motion.div>
    )
  }
  return (
    <motion.div
      className="country"
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 2 }}
    >
      <button
        className={darkMode ? 'btn-back btn-back-dark' : 'btn-back'}
        onClick={handleBackClick}
      >
        {' '}
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>
      {console.log(filteredCountries.countryData[0])}

      <div className="country__content">
        <div className="flag-container">
          <img
            src={filteredCountries.countryData[0][0].flags.svg}
            alt=""
            className="country-flag"
          />
        </div>
        <div className="country__details-container">
          <h1 className="country-name">
            {filteredCountries.countryData[0][0].name}
          </h1>
          <div className="country__details">
            <div className="country__details-left">
              <p className="country__detail">
                Native Name:{' '}
                <span>{filteredCountries.countryData[0][0].nativeName}</span>
              </p>
              <p className="country__detail">
                Population:{' '}
                <span>{filteredCountries.countryData[0][0].population}</span>
              </p>
              <p className="country__detail">
                Region:{' '}
                <span>{filteredCountries.countryData[0][0].region}</span>
              </p>
              <p className="country__detail">
                Sub Region:{' '}
                <span>{filteredCountries.countryData[0][0].subregion}</span>
              </p>
              <p className="country__detail">
                Capital:{' '}
                <span>{filteredCountries.countryData[0][0].capital}e</span>
              </p>
            </div>
            <div className="country__details-right">
              <p className="country__detail">
                Top Level Domain:{' '}
                <span>
                  {filteredCountries.countryData[0][0].topLevelDomain[0]}
                </span>
              </p>
              <p className="country__detail">
                Currency:{' '}
                <span>
                  {filteredCountries.countryData[0][0].currencies[0].code}
                </span>
              </p>
              <p className="country__detail">
                Languages:
                {filteredCountries.countryData[0][0].languages.map(
                  (language) => (
                    <span> {language.name}</span>
                  )
                )}
              </p>
            </div>
          </div>
          <div className="country__border-countries">
            {console.log(filteredCountries.countryData[1])}
            <p>Border Countries: </p>
            <div className="borders">
              {filteredCountries.countryData[1].map((border) => (
                <button
                  className={
                    darkMode ? 'btn-country btn-country-dark' : 'btn-country'
                  }
                  key={border[0].alpha3Code}
                  onClick={() => {
                    navigate(
                      `/country/${border[0].numericCode}`,
                      getCountryDetails(border[0].numericCode, rawData)
                    )
                  }}
                >
                  {border[0].name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Country
