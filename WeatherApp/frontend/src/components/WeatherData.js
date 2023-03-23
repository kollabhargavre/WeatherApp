import { Card } from '@mui/material'
import React, { useEffect, useState } from 'react'
import api from '../api/Post'

const WeatherData = ({entry}) => {


  const [data,setData]=useState(null)
  const [loading,setLoading] = useState(false)
  const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayInAWeek = new Date().getDay();

  const getData = async()=>{
     let response = await api.get(`/data?lat=${entry.lat}&lon=${entry.lon}`)
     .catch(err=>console.log(err))
    if(response && response.status===200){
      setData(response.data)
     
    }
    if(loading){
      setLoading(false)
    }
  }

  
  

  useEffect(()=>{
    getData()
},[])
  
  
  



  

  
  return (
    <div>
      {data && <Card className="item">
        <p>Todays Weather {WEEK_DAYS[dayInAWeek]} - {entry.name}, {entry.state} {entry.country}</p>
        <ul style={{display:"flex",listStyle:"none"}}>
          <li>
          <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}/>
          </li>
          <li style={{paddingLeft:"40px"}}>
            
            <p>feels like {data.main.temp}°K   <strong>{data.weather[0].description}</strong>  clouds  {data.clouds.all}%</p>
            <table>
              <tr>
                <td>Temperature</td>
                <td>Wind</td>
                <td>Humidity</td>
                <td>Pressure</td>
              </tr>
              <tr>
                <td>{Math.round(data.main.temp_min)} to {Math.round(data.main.temp_max)}</td>
                <td>wind {data.wind.speed}m/s</td>
                <td>humidity {data.main.humidity}%</td>
                <td>pressure {data.main.pressure}hPa</td>
              </tr>
            </table>
            {/* <p>temperature from {Math.round(data.main.temp_min)} to {Math.round(data.main.temp_max)}, wind {data.wind.speed}m/s humidity {data.main.humidity}% pressure {data.main.pressure}hPa</p> */}
            <p>Geo coords [{entry.lat},{entry.lon}]</p>
            
          </li>
        </ul>
        <br></br>
      </Card>}
      {!data && <p>Loading</p>}
      
    </div>

  )
}

export default WeatherData
