
import React, { useContext, useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs';
import { RiShoppingCart2Line } from 'react-icons/ri';
import { BsHeart } from 'react-icons/bs';
import {BiUser} from "react-icons/bi"
import img from "../Images/sneakers.png"
import { ProvideContext } from './ContextProvider';
import { Link } from 'react-router-dom';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import { useLocation, useNavigate } from "react-router-dom"



export const Navbar = () => {
  const{allValues} = useContext(ProvideContext)

  const[navbar,setNavbar] = useState(false);
  const handleNavbar=()=>{
    if(window.scrollY>50){
        setNavbar(true);
    }else{
      setNavbar(false)
    }
  }

  let navigate = useNavigate(); 
  const goToProduct=()=>{
    navigate("/product")
  }


  useEffect(()=>{
    window.addEventListener('scroll', handleNavbar)
  })
  return (
    <div id="parent" className={navbar?"scrolled":""}>
       <Link style={{textDecoration:"none", color:"black"}} to="/"><li style={{fontSize:"1rem"}}>SNEAKERS</li></Link>
        <div id='newchild'>
         <li ><input style={{width:"80px", borderRadius:"20px", paddingLeft:"10px"}} placeholder='search' onClick={goToProduct} id="search" /></li>
        <Link style={{textDecoration:"none", color:"black"}} to="/product"> EXPLORE</Link>
        <Link style={{textDecoration:"none", color:"black"}} to="/login"> <li><BiUser size={'15px'}  /></li></Link>
        <Link style={{textDecoration:"none", color:"black"}} to="/cart"><li><RiShoppingCart2Line size={'15px'} /><sup style={{color:"red"}}>{Object.keys(allValues.cart.values).length>0?Object.keys(allValues.cart.values).length:""}</sup></li></Link>
        <Link style={{textDecoration:"none", color:"black"}} to="/wishList"><li><BsHeart size={'15px'} /><sup style={{color:"red"}}>{Object.keys(allValues.wishList.values).length>0?Object.keys(allValues.wishList.values).length:""}</sup></li></Link>
        </div>
    </div>
  )
}
