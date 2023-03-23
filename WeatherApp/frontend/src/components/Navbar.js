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
      
      

      let response = await api.get(`/city/${e.target.searchbar.value}`)
      .catch(err=>console.log(err))
      if(response && response.status===200){
       
        setResults(response.data)
        navigate("/results")
      }
      else{
        setResults(null)
        navigate('/results')
      }

    }
    
  return (
    <div className="nav-bar">
      <p>Search for your City</p>
      <form onSubmit={handleSubmit} className="nav-bar form">
        <input type="text" className='searchbar' name="searchbar"  value={search} onChange={(e)=>setSearch(e.target.value)}/>
        
      </form>
      {/* <input type="button" value={"%c"}/>
      <input type="button" value={"%dd"}/> */}
      <p style={{marginRight:"20px"}}><Link to="/favourites/">Favourites</Link></p>
      {user?<p onClick={logoutUser}>Logout</p>:<p><Link to="/login">Login</Link></p>}
    </div>
  )
}

export default Navbar
