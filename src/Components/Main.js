import React, { useContext, useEffect, useReducer, useState } from 'react'
import img from "../Images/nikeOne.png"
import img2 from "../Images/nikeTwo.png"
import { json } from 'react-router-dom'
import { ProvideContext } from './ContextProvider'
import { Navbar } from './Navbar'
import { Link } from 'react-router-dom'
import { ToastProvider, useToasts } from 'react-toast-notifications';

export const Main = () => {
  const[catData, setData] = useState(null)
  const{allValues} = useContext(ProvideContext)
  useEffect(()=>{ 
    const handleHomePageData= async()=>{
      try{
        const response = await fetch("/api/categories")
        if(response.status===200){
          console.log("SuccessFull!");
         const data = await response.json();
          setData(data.categories)
          allValues.authentication.setLoading(false)
          console.log(data.categories)
          // setData(await response.categories)
        }
      }catch(e){
        console.log("Error-->"+e)
      }
    }
    setTimeout(()=>{
      handleHomePageData()
    },1000)
  },[])
  console.log("allvalues-->"+allValues.authentication.isLoading)
  return (
    <div>
    {
       catData===null?
       (
         <div className="loader-container">
            <div className="spinner"></div>
          </div>)
      :
      (
        <div>
   <Navbar/>
    <div id="mainComponent">
        <div id='mainComponentChild'>
            <div> <img src={img}/></div>
        <div className='card'>
            <h3>Nike Dunk</h3>
            <p>Created for the hardwood but taken to the streets, the '80s b-ball icon returns with perfectly shined overlays and classic team colours. With its iconic hoops design, the Nike Dunk Low channels '80s vintage back onto the streets.</p>
           </div>
        </div>
    </div>
    <div id='secondChild'>
        <h1>SHOP BY DIFFERENT COMPANIES</h1>  
        <div id='categories'>
          {
            allValues.authentication.isLoading?"Loading":
            catData.map(ele=><Link to="/product" style={{textDecoration:"none"}} state={{company:ele.categoryName}}><div key={ele.id} className='catCard' >
              <div> <img src={ele.img} /></div>
              <div>
              <h3>{ele.categoryName}</h3>
              <p>{ele.description}</p>
              </div>
            </div>
            </Link>)
          }
        </div>
        </div>
        </div>
      )
}
         
    </div>
  )
}
