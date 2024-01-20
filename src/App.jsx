import { useState, useEffect } from 'react'

import './App.css'
import Map from './components/Map/Map'
import SectionList from './components/SectionList/SectionList'
import Header from './components/Header/Header'

// const fs = require('fs')

// const sections = JSON.parse(fs.readFileSync('./src/assets/data.json', 'utf8'))

const sections = [
  {
    id: 1,
    name: 'Tronçon 1',
    lat: 48.1169233,
    lng: -1.6462295,
    nbOfAccident:3,
    p: 0.8,
  },
  {
    id: 2,
    name: 'Tronçon 2',
    lat: 48.10449555779639,
    lng: -1.6343959291024168,
    p: 0.2,
    nbOfAccident:2,
  },
  {
    id: 3,
    name: 'Tronçon 3',
    lat: 48.09088537944135,
    lng: -1.6609395305184682,
    p: 0.7,
    nbOfAccident:1,
  },
  {
    id: 4,
    name: 'Tronçon 4',
    lat: 49.1169233,
    lng: -1.6462295,
    nbofaccident:3,
    p: 0.8,
    nbOfAccident: 3,
  },
  {
    id: 5,
    name: 'Tronçon 5',
    lat: 47.10449555779639,
    lng: -1.6343959291024168,
    p: 0.2,
    nbOfAccident:1,
  },
  {
    id: 6,
    name: 'Tronçon 6',
    lat: 48.09088537944135,
    lng: -2.6609395305184682,
    p: 0.7,
    nbOfAccident:3
  }
]

const App = () => {
  const [currentSection, setCurrentSection] = useState(sections[0])

  useEffect(() => {
    try {
      const sections = JSON.parse(fs.readFileSync('./src/assets/data.json', 'utf8'));
      // Use the 'sections' variable as needed
      console.log(sections);
    } catch (error) {
      console.error('Error reading or parsing the JSON file:', error.message);
    }
  }, []);

  return (
    <div className='app'>
      <Header />
      <div className='main-page'>
        <SectionList sections={sections} currentSection={currentSection} setCurrentSection={setCurrentSection} />
        <Map sections={sections} currentSection={currentSection} />
      </div>
    </div>
  )
}

export default App
