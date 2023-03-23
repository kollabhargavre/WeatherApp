import { Card } from '@mui/material'
import React from 'react'
import FiveDay from '../components/FiveDay'


import WeatherData from '../components/WeatherData'


const Home = ({entry}) => {

  
  return (
    <div>
      <Card style={{alignItems:"center",display:"flex"}}>
        <table style={{width:"100%", height:"100%"}}>
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
