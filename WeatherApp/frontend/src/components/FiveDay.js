import React, { useEffect } from 'react'
import api from '../api/Post'


const FiveDay = ({search}) => {

  const getfivedays = async()=>{
    let response = await api.get("fivedays/", {
      headers:{
        "Content-type":"application/json"
      }
    })
    .catch(err=>console.log(err))
    if(response && response.status===200){
      console.log('fivedays',response.data);
    }
  }

  useEffect(()=>{
    getfivedays();
  },[])
  return (
    <div>
      This is five day forecast
    </div>
  )
}


export default FiveDay
