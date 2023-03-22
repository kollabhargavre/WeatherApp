import { Card } from '@mui/material'
import React, { useEffect, useState } from 'react'
import api from '../api/Post'
import DayWeather from './DayWeather';


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

        const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const dayInAWeek = new Date().getDay();
        const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));
        
        const [data,setData]=useState(null)
        const getData = async(e)=>{
            let response =  await api.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${entry.lat}&lon=${entry.lon}&exclude=current,minutely,hourly,alerts&appid=43a977d7984d9afc13b6dedb2d94400b
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
        <div>
              {data && <>
              <p>Forcast for next 5 days</p>
                {data.daily.slice(0,5).map((item,index)=>(
                  <DayWeather key={index} item={item} day={forecastDays[index]}/>
                    
                ))}
              </>}
           
        </div>
      )
    }


export default FiveDay
