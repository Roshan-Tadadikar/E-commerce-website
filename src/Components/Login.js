import "../Styles/style.css"
import React, { useContext, useReducer, useState } from 'react'
import {ReactComponent as Image} from "../Images/authentication.svg"
import { Navbar } from "./Navbar"
import { ProvideContext } from "./ContextProvider"
import { useLocation, useNavigate } from "react-router-dom"
import loginPageImage from "../Images/loginPage.png"
import { ToastProvider, useToasts } from 'react-toast-notifications';
import { Link } from 'react-router-dom';



export const Login = () => {
  let globalId=-1
  const address = [
    {
      id:1,
      name:"Ronak",
      address:"stuart hill, Panjim , Goa"
    },{
      id:2,
      name:"Rahul",
      address:"Near Airport, Mopa, Goa"
    }
  ]
  const[data,setData] = useState(address)
  const[uModal,updateModal ] = useState(false)
  const[modal,setModal] = useState(false)
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

    const login= async(e)=>{
      e.preventDefault()
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
            localStorage.removeItem("encodedToken")
            window.location.reload()
        }

        function getRandomInt(min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        const addAddress=()=>{
          const name = document.getElementById("name").value
          const Address = document.getElementById("address").value
          const id = getRandomInt(4,100)
          setData([...data,{id:id,name:name,address:Address}]);
          setModal(false)
        }

        const editModal=(id)=>{//when clicked on edit
          updateModal(true)
          const newData = data.filter(ele=>ele.id==id);
          document.getElementById("name").value=newData.name;
          document.getElementById("address").value=newData.address;
          globalId=id
        }

        const updateAddress=()=>{
          const name = document.getElementById("name").value
          const Address = document.getElementById("address").value
          setData(data.filter(ele=>ele.id!=globalId))
          setData([...data,{id:globalId,name:name,address:Address}])
          updateModal(false)
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
    localStorage.getItem("encodedToken")!=undefined?
    (
      
      <div style={{display:"flex", padding:"0.5rem", justifyContent:"space-between", flexWrap:"wrap"}}>
       
        <div className="address">
      
          <h1>Address Management</h1>
       {
        data.map(ele=>
          <div className="addChild" key={ele.id}>
          <li style={{display:"flex", flexDirection:"column",justifyContent:"normal"}}>
            <h4>.{ele.name}</h4>
            <p>#{ele.address}</p>
            <div style={{display:"flex", margin:"auto", width:"120px", justifyContent:"space-between"}}>
            <button onClick={()=>setData(data.filter(item=>item.id!=ele.id))}>remove</button>
            <button onClick={()=>{
              updateModal(true)
              editModal(ele.id)}
              }>Edit</button>
            </div>
          </li>
        </div>
        )
       }
       <button className="addressButton" onClick={()=>setModal(true)}>Add Address</button>

        </div>
        {
          modal || uModal?
        <div className="addressModal">
  <label for="fname">Name:</label><br />
  <input type="text" id="name" name="fname"  /><br />
  <label for="lname">Address:</label><br />
  <input type="text" id="address" name="lname" /><br/><br/>
  <p style={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
    {uModal?
  <button onClick={()=>updateAddress()}>Update address</button>
  :
  <button onClick={()=>addAddress()}>Add address</button>
    }
  <button>Add dummy address</button>
  <button onClick={()=>uModal?updateModal(false):setModal(false)}>Close</button>
  </p>
  </div>
  :
  ""
}
        <div className="alreadyLoggedIn">
            <div>
            <img src={loginPageImage}/>
            </div>
            <div>
            <h1>You're LoggedIn, get Access to your oders, wishList and to your Cart!</h1>
            <button onClick={LogOut}>Logout</button>
            </div>
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
   <button onClick={(e)=>login(e)} id="loginBtn">test user</button>
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
