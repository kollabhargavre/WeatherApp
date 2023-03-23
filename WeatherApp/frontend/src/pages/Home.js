import { Card } from '@mui/material'
import React from 'react'
import FiveDay from '../components/FiveDay'
import Hourly from '../components/Hourly'
import Map from '../components/Map'

import WeatherData from '../components/WeatherData'


const Home = ({entry,setEntry}) => {

  
  return (
    <div>
      <Card style={{alignItems:"center",display:"flex"}}>
        <table style={{width:"100%"}}>
          <tr>
            <td ><WeatherData entry={entry}/></td>
            <td ><FiveDay entry={entry}/></td>
          </tr>
        </table>
      </Card>
    </div>
  )
}

export default Home
