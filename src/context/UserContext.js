import {createContext, useState} from 'react'
import axios from 'axios'

export const UserContext = createContext()

export const UserProvider = (props) => {
    const [user, setUser] = useState({
        username: 'jadotripp',
        password: 'testpassword',
        user_id: 1
    })

    const handleLogin = (username, password)=>{
        axios.post('/auth/login', {username, password})
        .then(res=> setUser(res.data))
        .catch(err=>console.log(err))
    }

    const handleRegister = (username, password)=>{
        axios.post('/auth/register', {username, password})
        .then(res => setUser(res.data))
        .catch(err=> console.log(err))
    }
 return (
    // Here we create our provider by saying UserContext.Provider
    // and giving it a value object with all the values we want to pass down on it.
    <UserContext.Provider value={{
      test: 'hello world',
      testTwo: "Something",
      user,
      setUser,
      handleLogin,
      handleRegister
    }}>
      {/* Remember to render the children on your props so our
      App actually shows up! */}
      {props.children}
    </UserContext.Provider>
  )
}