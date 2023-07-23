import React from 'react'
import { useContext } from 'react'
import { ProvideContext } from './ContextProvider'
import { Login } from './Login'
import { Home } from './Home'
import { Navigate, useLocation } from 'react-router-dom'

const RequiresAuth = ({children}) => {

  const location = useLocation()
    const{allValues} = useContext(ProvideContext)
  console.log("here in requiresAuth  "+allValues.authentication.isUserLoggedIn)
  return  localStorage.getItem("encodedToken")==undefined?<Navigate to="/login" state={{from:location}}/>:children
  
}

export default RequiresAuth