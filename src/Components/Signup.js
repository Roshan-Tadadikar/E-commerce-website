import "../Styles/style.css"
import React, { useContext, useReducer } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom';
import { Navbar } from "./Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const handleReduce=(state,actions)=>{
        switch(actions.type){
            case "email":
                return {...state,username:actions.username}
            case "password":
                return {...state,password:actions.password}
                case "cpassword":
                  return {...state,cpassword:actions.password}
                case "firstName":
                    return {...state,firstName:actions.firstName}
                    case "lastName":
                        return {...state,lastName:actions.lastName}
            default:
             return {state}
        }
    }

    const[state,dispatch] = useReducer(handleReduce, {firstName:"",lastName:"",username:"", password:"",cpassword:""})
    const navigate = useNavigate()
    const authenticateLogin= async(e)=>{
      e.preventDefault()
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
          if(encodedToken!=undefined){
            navigate("/login")
            notify()
          }
          else{
            window.alert("Wrong credentials")
          }
        }catch(e){
            console.log("Error--->"+e)
        }
    }

    const notify = () => toast.success("Account Created!");

  return (
  <div>
    {/* // <div id="outerForm">
    // <div class="content">
    //  <div class="text">Singn Up Form</div>
    //  <form action="#">
    //    <div class="field">
    //      <span class="fas fa-us er">Email</span>
    //      <input type="text"  id="email"  onChange={(e)=>{   dispatch({type:"firstName", firstName:e.target.value}) }}/> 
         
    //    </div>
    //    <div class="field">
    //      <span class="fas fa-lock">FirstName</span>
    //      <input type="password" id="fname" onChange={(e)=>{   dispatch({type:"lastName", lastName:e.target.value}) }}/>
       
    //    </div>
    //    <div class="field">
    //      <span class="fas fa-lock">LastName</span>
    //      <input type="password" id="lname"  onChange={(e)=>{   dispatch({type:"email", email:e.target.value}) }}/>
       
    //    </div>
    //    <div class="field">
    //      <span class="fas fa-lock">Password</span>
    //      <input type="password" id="pass" onChange={(e)=>{   dispatch({type:"password", password:e.target.value}) }}/>
       
    //    </div>
    //    <div class="field">
    //      <span class="fas fa-lock">Confirm Password</span>
    //      <input type="password" id="cpass" onChange={(e)=>{   dispatch({type:"password", password:e.target.value}) }}/>
       
    //    </div>
    //    <div class="forgot-pass"><a href="#">Forgot Password?</a></div>
    //    <button onClick={(event)=>authenticateLogin(event)} id="loginBtn">Sign up</button>
    //  </form>
    // </div>
    // </div> */}
    <Navbar/>
    <div className="container" style={{padding:"1rem"}}>
    <div class="signup-form">
    <h2>Create an Account</h2>
    <form action="#">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required onChange={(e)=>{   dispatch({type:"email", email:e.target.value}) }} />
      </div>
      <div class="form-group">
        <label for="firstname">First Name</label>
        <input type="text" id="firstname" name="firstname" required onChange={(e)=>{   dispatch({type:"firstName", firstName:e.target.value}) }} />
      </div>
      <div class="form-group">
        <label for="lastname">Last Name</label>
        <input type="text" id="lastname" name="lastname" required  onChange={(e)=>{   dispatch({type:"lastName", lastName:e.target.value}) }}/>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required onChange={(e)=>{   dispatch({type:"password", password:e.target.value}) }}  />
      </div>
      <div class="form-group">
        <label for="confirm_password">Confirm Password</label>
        <input type="password" id="confirm_password" name="confirm_password" required  onChange={(e)=>{   dispatch({type:"cpassword", cpassword:e.target.value}) }}/>
      </div>
      <div class="form-group">
       <button onClick={(e)=>authenticateLogin(e)}> Submit</button>
      </div>
    </form>
  </div>
  </div>
  <ToastContainer/>
  </div>
  )
}

export default Signup