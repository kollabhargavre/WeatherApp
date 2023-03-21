import React, { useEffect } from 'react'
import api from '../api/Post'

const WeatherData = (search) => {

  const getData = async()=>{
    let response = await api.get("/data/", {
      "location": search
    }, {headers:{
      "content-type":"application/json"
    }})

    .catch(err=>console.log(err))
    let data = response.data;
   
    console.log("weatherdata",data);
  }

  useEffect(()=>{
    getData()
  },[])


  return (
    <div>
      This is WeatherData
    </div>
  )
}

export default WeatherData
