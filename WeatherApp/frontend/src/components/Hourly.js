import { Card } from '@mui/material'
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
    
  }

  useEffect(()=>{
    getHourly();
  },[])

  return (
    <Card>
      This is Hourly forecast
    </Card>
  )
}

export default Hourly
