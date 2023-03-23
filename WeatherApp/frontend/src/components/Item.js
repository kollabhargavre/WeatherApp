import { Card } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/Post'

const Item = ({item,entry,setEntry}) => {

    const navigate = useNavigate();



    const [data,setData]=useState(null)
    const [loading,setLoading] = useState(true)
    // const getData = async(e)=>{
    //     let response =  await api.get(`https://api.openweathermap.org/data/2.5/weather?lat=${item.lat}&lon=${item.lon}&appid=50a73d682d0b9ded8a3e07a3342ec8c4
    //     `)
    //     .catch(err=>console.log(err))
    //     if(response && response.status===200){
            
    //         setData(response.data)
           
            
    //     }
    // }

    const getData = async(e)=>{

      
      let response = await api.get(`/data?lat=${item.lat}&lon=${item.lon}`)
      .catch(err=>console.log(err))
      if(response && response.status===200){
        
        setData(response.data)
      }
      if(loading){
        setLoading(false)
      }
    }

    useEffect(()=>{
      if(loading){
          getData();
      }
      let tenminutes = 10*60*1000;
      let interval = setInterval(()=>{
          if(data){
              getData();
          }
      },tenminutes)
      return ()=>clearInterval(interval)
  },[loading])

    const handleClick=()=>{
      
      setEntry(item);


      navigate('/entry')
    }

  return (
    <div>
      {data && <Card className="item">
        <ul style={{display:"flex",listStyle:"none"}}>
          <li>
            <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}/>
          </li> 
          <li style={{paddingLeft:"40px"}}>
          <p onClick={(e)=>handleClick()}>{item.name}, {item.state} {item.country}    <strong>{data.weather[0].description}</strong></p>
          <p>temperature from {data.main.temp_min} to {data.main.temp_max}, wind {data.wind.speed}m/s humidity {data.main.humidity} pressure {data.main.pressure}</p>
          <p>Geo coords [{item.lat},{item.lon}]</p>
          </li>
        </ul>
        <br></br>
      </Card>}
      {!data && <p>Loading</p>}
      
    </div>
  )
}

export default Item
