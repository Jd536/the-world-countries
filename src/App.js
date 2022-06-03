import React, { useState, createContext } from 'react'
import './App.scss'
import Layout from './components/layout'

//create a reducer function

export const ThemeContext = createContext()

function App() {
  //filtered data is the data that's passed to the main container

  const [darkMode, setDarkMode] = useState(false)
  const handleThemeModeClick = (e) => {
    e.preventDefault()
    setDarkMode(!darkMode)
  }

  return (
    <ThemeContext.Provider value={{ darkMode, handleThemeModeClick }}>
      <div className="App">
        <Layout />
      </div>
    </ThemeContext.Provider>
  )
}

export default App
