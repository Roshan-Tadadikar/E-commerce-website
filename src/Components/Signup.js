import "../Styles/style.css"
import React, { useContext, useReducer } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom';

const Signup = () => {
    const handleReduce=(state,actions)=>{
        switch(actions.type){
            case "email":
                return {...state,username:actions.username}
            case "password":
                return {...state,password:actions.password}
                case "firstName":
                    return {...state,firstName:actions.firstName}
                    case "lastName":
                        return {...state,lastName:actions.lastName}
            default:
             return {state}
        }
    }

    const[state,dispatch] = useReducer(handleReduce, {firstName:"",lastName:"",username:"", password:""})
    const navigate = useNavigate()
    const authenticateLogin= async(e)=>{
        console.log("values-->"+state.username)
        const cred={
            "email":state.email,
            "password":state.password,
            "someUserAttribute1":state.firstName,
            "someUserAttribute2":state.lastName
        }
        e.preventDefault();
        console.log("cred-->"+JSON.stringify(cred)
        )
        try{
            const response = await fetch("/api/auth/signup",{
                method:"POST",
                body:JSON.stringify(cred)
            })

          const{encodedToken} = await response.json();
          localStorage.setItem("encodedToken",encodedToken)
          if(encodedToken!=undefined){
            navigate("/login")
          }
          else{
            window.alert("Wrong credentials")
          }
        }catch(e){
            console.log("Error--->"+e)
        }
    }
  return (
  
    <div id="outerForm">
    <div class="content">
     <div class="text">Login Form</div>
     <form action="#">
       <div class="field">
         <span class="fas fa-user"></span>
         <input type="text"  id="pass"  onChange={(e)=>{   dispatch({type:"firstName", firstName:e.target.value}) }}/> 
         
       </div>
       <div class="field">
         <span class="fas fa-lock"></span>
         <input type="password" id="email" onChange={(e)=>{   dispatch({type:"lastName", lastName:e.target.value}) }}/>
       
       </div>
       <div class="field">
         <span class="fas fa-lock"></span>
         <input type="password" id="email"  onChange={(e)=>{   dispatch({type:"email", email:e.target.value}) }}/>
       
       </div>
       <div class="field">
         <span class="fas fa-lock"></span>
         <input type="password" id="pass" onChange={(e)=>{   dispatch({type:"password", password:e.target.value}) }}/>
       
       </div>
       <div class="forgot-pass"><a href="#">Forgot Password?</a></div>
       <button onClick={(event)=>authenticateLogin(event)} id="loginBtn">Sign up</button>
     </form>
    </div>
    </div>
  )
}

export default Signup