import { Card } from '@mui/material'
import React, { useEffect, useState } from 'react'
import api from '../api/Post'

const WeatherData = ({entry}) => {


  const [data,setData]=useState(null)
  const [loading,setLoading] = useState(false)

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
        <ul style={{display:"flex",listStyle:"none"}}>
          <li>
          <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}/>
          </li>
          <li style={{paddingLeft:"40px"}}>
            <p>{entry.name}, {entry.state} {entry.country}</p>
            <strong>{data.weather[0].description}</strong> feels like {data.main.temp}°K  clouds  {data.clouds.all}%
            <p>temperature from {Math.round(data.main.temp_min)} to {Math.round(data.main.temp_max)}, wind {data.wind.speed}m/s humidity {data.main.humidity}% pressure {data.main.pressure}hPa</p>
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
