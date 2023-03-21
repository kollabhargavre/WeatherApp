import React, { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'
import api from '../api/Post'
import { useNavigate } from 'react-router-dom'


const Navbar = ({search, setSearch}) => {
    const navigate = useNavigate();
    let {user,logoutUser,results,setResults} = useContext(AuthContext)

    const handleSubmit = async(e)=>{
      e.preventDefault()
      
      let response = await api.get(`http://api.openweathermap.org/geo/1.0/direct?q=${e.target.searchbar.value}&limit=5&appid=43a977d7984d9afc13b6dedb2d94400b`)
      .catch(err=>console.log(err))
      if(response && response.status===200){
       
        setResults(response.data)
        navigate("/results")
      }

    }
    
  return (
    <div className="nav-bar">
      <form onSubmit={handleSubmit} className="nav-bar form">
        <input type="text" name="searchbar" value={search} onChange={(e)=>setSearch(e.target.value)}/>
        <input type="submit" value="Search" />
      </form>
      <input type="button" value={"%c"}/>
      <input type="button" value={"%dd"}/>
      {user?<p onClick={logoutUser}>Logout</p>:<p>Login</p>}
    </div>
  )
}

export default Navbar
