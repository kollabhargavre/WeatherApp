import React, { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'
import api from '../api/Post'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


const Navbar = ({search, setSearch}) => {
    const navigate = useNavigate();
    let {user,logoutUser,results,setResults} = useContext(AuthContext)

    const handleSubmit = async(e)=>{
      e.preventDefault()
      
      // let response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${e.target.searchbar.value}&limit=5&appid=f3bdfcd643f1f02863931c331b601c8c

      // `)
      // .catch(err=>console.log(err))
      // if(response && response.status===200){
       
      //   //setResults(response.data)
      //   console.log("response",response.data)
      //   //navigate("/results")
      // }

      let response = await api.get(`/city/${e.target.searchbar.value}`)
      .catch(err=>console.log(err))
      if(response && response.status===200){
       
        setResults(response.data)
        navigate("/results")
      }
      else{
        setResults(null)
      }

    }
    
  return (
    <div className="nav-bar">
      <form onSubmit={handleSubmit} className="nav-bar form">
        <input type="text" name="searchbar" value={search} onChange={(e)=>setSearch(e.target.value)}/>
        <input type="submit" value="Search" />
      </form>
      {/* <input type="button" value={"%c"}/>
      <input type="button" value={"%dd"}/> */}
      {user?<p onClick={logoutUser}>Logout</p>:<p><Link to="/login">Login</Link></p>}
    </div>
  )
}

export default Navbar
