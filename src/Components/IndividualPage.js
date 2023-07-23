import { useLocation } from 'react-router-dom'
import { Navbar } from './Navbar';
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { ProvideContext } from './ContextProvider'
import { BsHeart } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { BsFillHeartFill } from 'react-icons/bs';

import toast, { Toaster } from 'react-hot-toast';
const IndividualPage = () => {
    const location = useLocation();
    const value = location?.state?.value
    console.log("value==>"+JSON.stringify(value))
    const{allValues} = useContext(ProvideContext)

    const addToCart= async(ele)=>{
        const product={
          "product":ele
      }
        try{
          const response = await fetch("/api/user/cart",{
              method:"POST",
              headers: {
                'authorization': localStorage.getItem("encodedToken")
              },
              body:JSON.stringify(product)
          })
    
          if(response.ok){
            console.log("Response  -->"+ JSON.stringify(response))
            allValues.cart.addToCart(ele)
            toast.success('Successfully toasted!')
          }
      }catch(e){
          console.log("Error--->"+e)
      }
     
      }
 
      
      const removeFromWishList= async(ele)=>{
        try{
          const response = await fetch(`/api/user/wishlist/${ele.id}`,{
              method:"DELETE",
              headers: {
                'authorization': localStorage.getItem("encodedToken")
              },
          })
    
          const{data} = await response.json()
    
          if(response.ok){
            console.log("Response  -->"+ JSON.stringify(data))
            allValues.wishList.removeFromWishList(ele)
            toast.success('Successfully toasted!')
          }
      }catch(e){
          console.log("Error--->"+e)
      }
     
      }


      
  const addToWishList= async(ele)=>{
    const product={
      "product":ele
  }
    try{
      const response = await fetch("/api/user/wishlist",{
          method:"POST",
          headers: {
            'authorization': localStorage.getItem("encodedToken")
          },
          body:JSON.stringify(product)
      })

    
      if(response.ok){
        console.log("Response  -->"+ JSON.stringify(response))
        allValues.wishList.addToWishList(ele)
        toast.success('Successfully toasted!')
      }
  }catch(e){
      console.log("Error--->"+e)
  }
 
  }
  return (
    <div>
        <Navbar/>
        <div className='ipPage'>
        <div key={value.id} className='prodCard'>
                        <img src={value.img} className='prodImg'/>
                        <div className='miniCard'>
                        <h5>{value.categoryName}</h5>
                        <h4>{value.name}</h4>
                        <h5>₹{value.price}</h5>
                        <div style={{display:"flex"}}>
                          {
                            allValues.cart.values.includes(value)?
                            (
                              <button className='prodButton'><Link to="/cart" style={{textDecoration:"none",color:"white"}}>Go to cart</Link></button>
                            )
                            :
                            (
                              <button className='prodButton' onClick={()=>{
                                addToCart(value)
                               }}>Add to cart</button>
                            )
                          }
                      
                        {

                          allValues.wishList.values.includes(value)?
                          (
                            <button className='prodButton' onClick={()=>{
                              removeFromWishList(value)
                             }}><BsFillHeartFill color='red'/></button>
                          )
                          :
                          (
                            <button className='prodButton' onClick={()=>{
                            addToWishList(value)
                             }}><BsHeart backgroundColor='white'/></button>
                          )
                          

                        }
                          </div>
                      
                        </div>
                        </div>
                        </div>
    </div>
  )
}

export default IndividualPage