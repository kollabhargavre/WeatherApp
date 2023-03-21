import { Card } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/Post'

const Register = () => {

  let navigate = useNavigate()
  let [message,setMessage] = useState(null)


  const handleSubmit = async(e)=>{
    console.log("register button clicked")
    e.preventDefault()
    if(e.target.password.value!==e.target.Confirmpassword.value){
      setMessage("Passwords Not matching Retry!!")
      return
    }
    let response = await api.post("/register/",{
      "username":e.target.username.value,
      "email":e.target.email.value,
      "password":e.target.password.value
    })
    .catch((err)=>{
      let data = err.response.data;
      setMessage(data);
      return 
    })
    if(message){
      return
    }
    if(response && response.status===200){
      alert("You are registered! Now Login!");
      navigate("/");
    }

  }




  return (
    <div className='container'>
      <center className='middle'>
      <Card className='form' style={{width:"400px"}}>
      <form onSubmit={handleSubmit}>
        <div className='form-div'>
        <input type="email" autoComplete="off" placeholder='email' name="email" required/>
        </div>
        <div className='form-div'>
        <input type="text" autoComplete="off" placeholder="username" name="username" required/>
        </div>
        <div className='form-div'>
        <input type="password" autoComplete="off" placeholder='Password' name="password" required/>
        </div>
        <div className='form-div'>
        <input type="password" autoComplete="off"  placeholder='Confirm Password' name="Confirmpassword" required/>
        </div>
        <div className='form-div'>
        <button type="submit">Register</button>
        </div>
      </form>
      <p>have an account already? Login <Link to="/login">here</Link></p>
    </Card>
      

    </center>
    </div>
    
  )
}

export default Register
