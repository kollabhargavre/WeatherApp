import { Card } from '@mui/material'
import React, { useEffect, useState } from 'react'
import api from '../api/Post'


const FiveDay = ({entry}) => {

  // const getfivedays = async()=>{
  //   let response = await api.get("fivedays/", {
  //     headers:{
  //       "Content-type":"application/json"
  //     }
  //   })
  //   .catch(err=>console.log(err))
  //   if(response && response.status===200){
  //     console.log('fivedays',response.data);
  //   }
  // }

  // useEffect(()=>{
  //   getfivedays();
  // },[])


        
        const [data,setData]=useState(null)
        const getData = async(e)=>{
            let response =  await api.get(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${entry.lat}&lon=${entry.lon}&cnt=5&appid=43a977d7984d9afc13b6dedb2d94400b
            `)
            .catch(err=>console.log(err))
            if(response && response.status===200){
                console.log("fivesays",response.data)
                setData(response.data)
            }
        }

        useEffect(()=>{
            getData();     
        },[])


        






      return (
        <Card>
          This is five day forecast
        </Card>
      )
    }


export default FiveDay
