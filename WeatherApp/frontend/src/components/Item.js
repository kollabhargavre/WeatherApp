import { Card } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/Post'

const Item = ({item}) => {
    const [data,setData]=useState(null)
    const getData = async(e)=>{
        let response =  await api.get(`https://api.openweathermap.org/data/2.5/weather?lat=${item.lat}&lon=${item.lon}&appid=43a977d7984d9afc13b6dedb2d94400b`)
        .catch(err=>console.log(err))
        if(response && response.status===200){
            
            setData(response.data)
        }
    }

    useEffect(()=>{
        getData();
        console.log(data)
               
    },[])

  return (
    <div>
      {data && <Card className="item">
        
        <p><Link>{item.name}, {item.state}</Link><strong>{data.weather[0].description}</strong></p>
        <p>temperature from {data.main.temp_min} to {data.main.temp_max}, wind {data.wind.speed}m/s humidity {data.main.humidity} pressure {data.main.pressure}</p>
        <p>Geo coords [{item.lat},{item.lon}]</p>
        <br></br>
      </Card>}
      {!data && <p>Loading</p>}
      
    </div>
  )
}

export default Item
