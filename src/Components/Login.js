import "../Styles/style.css"
import React, { useContext, useReducer } from 'react'
import {ReactComponent as Image} from "../Images/authentication.svg"
import { Navbar } from "./Navbar"
import { ProvideContext } from "./ContextProvider"
import { useLocation, useNavigate } from "react-router-dom"
import loginPageImage from "../Images/loginPage.png"
import { ToastProvider, useToasts } from 'react-toast-notifications';
import { Link } from 'react-router-dom';



export const Login = () => {
    const location = useLocation()
    const navigate = useNavigate()
const{allValues} = useContext(ProvideContext)

console.log("isUserLoggedIn?==>"+allValues.authentication.isUserLoggedIn)
    const handleReduce=(state,actions)=>{
        switch(actions.type){
            case "username":
                return {...state,username:actions.username}
            case "password":
                return {...state,password:actions.password}
            default:
             return {state}
        }
    }

    const login= async()=>{
      console.log("Inside login")
      const cred={
        "email":"adarshbalika@gmail.com",
        "password":"adarshbalika"
    }
      console.log("values-->"+state.username)
      document.querySelector("#email").innerText=cred.email
      document.querySelector("#pass").innerText=cred.password
     
      console.log("cred-->"+JSON.stringify(cred)
      )
      try{
          const response = await fetch("/api/auth/login",{
              method:"POST",
              body:JSON.stringify(cred)
          })

        const{encodedToken} = await response.json();
        localStorage.setItem("encodedToken",encodedToken)
        if(encodedToken!=undefined){
          allValues.authentication.handleUserLogin()
          console.log("location-->"+JSON.stringify(location))
          console.log("Isuer logged in?"+allValues.authentication.isUserLoggedIn)
          navigate(location?.state?.from?.pathname)
        }
      }catch(e){
          console.log("Error--->"+e)
      }
    }


    const[state,dispatch] = useReducer(handleReduce, {username:"", password:""})

    

        const authenticateLogin= async(e)=>{
            console.log("values-->"+state.username)
            const cred={
                "email":state.username,
                "password":state.password
            }
            e.preventDefault();
            console.log("cred-->"+JSON.stringify(cred)
            )
            try{
                const response = await fetch("/api/auth/login",{
                    method:"POST",
                    body:JSON.stringify(cred)
                })

              const{encodedToken} = await response.json();
              localStorage.setItem("encodedToken",encodedToken)
              if(encodedToken!=undefined){
                allValues.authentication.handleUserLogin()
                console.log("location-->"+JSON.stringify(location))
                console.log("Isuer logged in?"+allValues.authentication.isUserLoggedIn)
                navigate(location?.state?.from?.pathname)
              }
              else{
                window.alert("Wrong credentials")
              }
            }catch(e){
                console.log("Error--->"+e)
            }
        }
    

        const LogOut=()=>{
            allValues.authentication.handleUserLogin()
        }


  return (
    <div id="loginPage" >
        <Navbar/>
      {/* <div id="outerForm" >
        <form id="loginContainer">
            <div className="fields">
            <lable>Enter your email*</lable><br/>
            <input  onChange={(e)=>{   dispatch({type:"username", payload:e.target.value}) }}/>
            </div>
            <div className="fields">
            <lable>Enter your password *</lable><br/>
            <input  onChange={(e)=>{   dispatch({type:"password", payload:e.target.value}) }} />
            </div>
            <button onClick={authenticateLogin}>Login</button>
            <button onClick={authenticateLogin}>Login as Guest</button>
        </form>
        </div> */}
{
    allValues.authentication.isUserLoggedIn?
    (
        <div className="alreadyLoggedIn">
            <div>
            <img src={loginPageImage}/>
            </div>
            <div>
            <h1>You're LoggedIn, get Access to your oders, wishList and to your Cart!</h1>
            <button onClick={LogOut}>Logout</button>
            </div>
            </div>
    )
    :
    (

        <div id="outerForm">
<div class="content">
 <div class="text">Login Form</div>
 <form action="#">
   <div class="field">
     <span class="fas fa-user"></span>
     <input type="text"  id="email"  onChange={(e)=>{   dispatch({type:"username", username:e.target.value}) }}/> 
     
   </div>
   <div class="field">
     <span class="fas fa-lock"></span>
     <input type="password" id="pass" onChange={(e)=>{   dispatch({type:"password", password:e.target.value}) }}/>
   
   </div>
   <div class="forgot-pass"><a href="#">Forgot Password?</a></div>
   <button onClick={(event)=>authenticateLogin(event)} id="loginBtn">Sign in</button>
   <button onClick={login} id="loginBtn">test user</button>
   <div class="signup">Not a member?
     <Link to="/signup"><a href="#">signup now</a></Link>
   </div>
 </form>
</div>
</div>
    )
}


        
    </div>
  )
}
