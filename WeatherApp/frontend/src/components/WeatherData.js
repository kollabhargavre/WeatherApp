import { Card } from '@mui/material'
import React, { useEffect, useState } from 'react'
import api from '../api/Post'

const WeatherData = ({entry}) => {

  // const getData = async()=>{
  //   let response = await api.get("/data/", {
  //     "location": search
  //   }, {headers:{
  //     "content-type":"application/json"
  //   }})

  //   .catch(err=>console.log(err))
  //   let data = response.data;
   
  //   console.log("weatherdata",data);
  // }

  // useEffect(()=>{
  //   getData()
  // },[])

  
  const [data,setData]=useState(null)
  const getData = async(e)=>{
      let response =  await api.get(`https://api.openweathermap.org/data/2.5/weather?lat=${entry.lat}&lon=${entry.lon}&appid=50a73d682d0b9ded8a3e07a3342ec8c4
      `)
      .catch(err=>console.log(err))
      if(response && response.status===200){
          
          setData(response.data)
          
      }
  }

  useEffect(()=>{
      getData();     
  },[])

  
  return (
    <div>
      {data && <Card className="item">
        <ul style={{display:"flex",listStyle:"none"}}>
          <li>
          <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}/>
          </li>
          <li style={{paddingLeft:"40px"}}>
            <p>{entry.name}, {entry.state} {entry.country}   <strong>{data.weather[0].description}</strong></p>
            <p>temperature from {Math.round(data.main.temp_min)} to {Math.round(data.main.temp_max)}, wind {data.wind.speed}m/s humidity {data.main.humidity} pressure {data.main.pressure}</p>
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
