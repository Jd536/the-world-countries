import React, { useContext } from 'react'
import { motion } from 'framer-motion'

// will old all the countries when the page loads

import Card from '../../../card'
import Search from '../../../Search'
import Dropdown from '../../../Search/DropDown'
import './index.scss'

import { LayoutContext } from '../..'

const Home = () => {
  let { filteredCountries } = useContext(LayoutContext)
  let countries = filteredCountries.data

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }
  // console.log(countries)
  return (
    <main className="homePage__container">
      <div className="homePage__header-container">
        <div className="homepage__search">
          <Search />
          <Dropdown />
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          className="homepage__country-cards"
        >
          {countries.length > 0 ? (
            countries.map((country, index) => {
              return (
                <Card
                  key={`${country.area}_${country.capital}`}
                  country={country}
                />
              )
            })
          ) : (
            <div className="homePage__container">
              <p>No countries found</p>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  )
}

export default Home
