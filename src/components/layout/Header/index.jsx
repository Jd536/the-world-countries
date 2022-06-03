import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

import './index.scss'

import { ThemeContext } from '../../../App'

const Header = () => {
  let navigate = useNavigate()

  const { handleThemeModeClick, darkMode } = useContext(ThemeContext)

  const backToHomepage = () => {
    navigate('/')
  }

  return (
    <header className={darkMode ? 'header header-dark' : 'header'}>
      <div
        className={
          darkMode
            ? 'header__container header__container-dark'
            : 'header__container'
        }
        onClick={backToHomepage}
      >
        <h1 className="header-brand">Where in the world?</h1>
      </div>

      <div
        className="theme-trigger-container theme-trigger-button"
        onClick={handleThemeModeClick}
      >
        {!darkMode ? (
          <button>
            <FontAwesomeIcon icon={faMoon} className="dark-mode-icon" /> Dark
            Mode
          </button>
        ) : (
          <button className="light-button">
            <FontAwesomeIcon icon={faSun} className="light-mode-icon" /> Light
            Mode
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
