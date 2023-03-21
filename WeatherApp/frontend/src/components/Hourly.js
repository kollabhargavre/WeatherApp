import React, { useEffect } from 'react'
import api from '../api/Post'

const Hourly = ({search}) => {

  const getHourly = async()=>{
    let resposne = await api.get("/hourly/",{
      "location":search
    },{
      headers:{
        "content-type":"application./json"
      }
    })
    .catch(err=>console.log(err))
    let data = resposne.data
    console.log("hourlydata",data)
  }

  useEffect(()=>{
    getHourly();
  },[])

  return (
    <div>
      This is Hourly forecast
    </div>
  )
}

export default Hourly
