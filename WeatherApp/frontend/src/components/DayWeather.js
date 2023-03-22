import { Card } from '@mui/material'
import React, { useState } from 'react'

const DayWeather = ({item,day}) => {
    let [expand,setExpand] = useState(false)

    const handleClick = ()=>{
        if(expand){
            setExpand(false)
        }else{
            setExpand(true)
        }
    }
    
  return (
    <div>
      <Card>
      <ul style={{listStyle:"none",display:"flex"}}>
                <label  className="label day">{day}</label>
                <label className="label description">{item.weather[0].description}</label>
                <img src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}/>
                <label className="label min-max">{Math.round(item.temp.max)}°C /{Math.round(item.temp.min)}°C</label>  
                <label className="label">{expand?<button  onClick={handleClick}>Close</button>:<button onClick={handleClick}>Expand</button>}</label>
                
        </ul>
        {expand && <>
            <ul style={{display:"flex",listStyle:"none",fontWeight:"5"}}>
                    <li>Windspeed : {item.wind_speed}m/s</li>
                    <li>Pressure : {item.pressure}hPa</li>
                    <li>Humidity : {item.humidity}%</li>
            </ul>
            <table style={{fontWeight:"5"}}>
                <thead>
                    <th></th>
                    <th>Morning</th>
                    <th>AfterNoon</th>
                    <th>Evening</th>
                    <th>Night</th>
                </thead>
                <tbody>
                    <tr>
                        <td>Temperature</td>
                        <td>{Math.round(item.temp.morn)}</td>
                        <td>{Math.round(item.temp.day)}</td>
                        <td>{Math.round(item.temp.eve)}</td>
                        <td>{Math.round(item.temp.night)}</td>
                    </tr>
                </tbody>
            </table>
        </>}         
      </Card>
    </div>
  )
}

export default DayWeather
