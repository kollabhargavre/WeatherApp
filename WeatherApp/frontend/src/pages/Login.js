import { Card } from '@mui/material'
import React, { useContext } from 'react'
import { Link} from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'

const Login = () => {
  const {loginUser,loginMessage} = useContext(AuthContext)

  
  return (
    <div className='container'> 
    <center>
    <Card className='form' >
      {loginMessage && <p>{loginMessage}</p>}
      <form onSubmit={loginUser}>
        <div className='form-div'>
          <input type="email" placeholder="email" name="email" required/>
        </div>
        <div className='form-div'>
          <input type="password" placeholder='Password' name="password" required/>
        </div>
        <div className='form-div'>
          <button type="submit">Login</button>
        </div>

      </form>
      <p>Don't have an account? Register <Link to="/register">here</Link></p>
    </Card>
    </center>

    </div>
  )
}

export default Login
