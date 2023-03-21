import { Card } from '@mui/material'
import React from 'react'
import FiveDay from '../components/FiveDay'
import Hourly from '../components/Hourly'
import Map from '../components/Map'

import WeatherData from '../components/WeatherData'


const Home = ({search,setSearch}) => {
    
    
  return (
    <div>
      This is Home Page    
      <Card>
        <WeatherData search={search}/>
        <Map/>
        <Hourly search={search}/>
        <FiveDay search={search}/>
      </Card>
    </div>
  )
}

export default Home
