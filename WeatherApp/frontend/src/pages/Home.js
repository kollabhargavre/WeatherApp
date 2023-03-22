import { Card } from '@mui/material'
import React from 'react'
import FiveDay from '../components/FiveDay'
import Hourly from '../components/Hourly'
import Map from '../components/Map'

import WeatherData from '../components/WeatherData'


const Home = ({entry,setEntry}) => {

  
  return (
    <div>
      This is Home Page    
      <Card style={{alignItems:"center",display:"flex"}}>
        <WeatherData entry={entry}/>
        {/* <Map entry={entry}/> */}
        {/* <Hourly entry={entry}/> */}
        <FiveDay entry={entry}/>
      </Card>
    </div>
  )
}

export default Home
