import React, { useContext, useEffect, useState } from 'react'
import api from '../api/Post'
import AuthContext from '../contexts/AuthContext'

import Item from './Item'

const Favourites = () => {


  const {favourites,setFavourites} = useContext(AuthContext)
  const {entry,setEntry} = useContext(AuthContext)

    const {authTokens,user} = useContext(AuthContext)
    const getFavourites = async() =>{
        let response = await api.get('/favourites/',{
            headers:{
                "Content-type":"application/json",
                "Authorization":"Bearer "+String(authTokens.access)
            }
        })
        .catch(err=>console.log(err))
        if(response && response.status===200){
            setFavourites(response.data)
        }
    }
    useEffect(()=>{
        getFavourites()
    },[])
  return (
    <div>
      {favourites.length>0?<>
      {favourites.map((item,index)=>(
        <Item key={index} item={item} entry={entry} setEntry={setEntry}/>
      ))}
      </>
      :<p>Your favuorites appear here</p> }
    </div>
  )
}

export default Favourites
