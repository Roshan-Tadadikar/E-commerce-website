import React, { useContext } from 'react'
import { Navbar } from './Navbar.js'
import "../App.js"
import "../Styles/style.css"
import { Main } from './Main.js'
import { ProvideContext } from './ContextProvider.js'
import { ToastProvider, useToasts } from 'react-toast-notifications';


export const Home = () => {
  const{allValues} = useContext(ProvideContext)
  console.log("All vlaues-->"+allValues.authentication.isLoading)
  return (
    <div>
  
      <div>
      <Main />
      </div>
    </div>
  )
}
