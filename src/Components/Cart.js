import React, { useContext, useEffect, useState } from 'react'
import { ProvideContext } from './ContextProvider'
import { Navbar } from './Navbar'
import { BsFillHeartFill } from 'react-icons/bs';
import img2 from "../Images/nikeTwo.png"
import { ToastProvider, useToasts } from 'react-toast-notifications';
import emptyCart from "../Images/emptyCart.png"



export const Cart = () => {
  const[data,setData]= useState([])
  const[price,setPrice]  = useState(0)
  const[loading,setLoading] = useState(true)
    const{allValues} = useContext(ProvideContext)
    useEffect(()=>{
      const displayCartData= async()=>{
              try{
                const response = await fetch("/api/user/cart",{
                    method:"GET",
                    headers: {
                      'authorization': localStorage.getItem("encodedToken")
                    }
                })
                const{cart} = await response.json()
                if(response.ok){
                  console.log("Cart response-->"+JSON.stringify(response))
                  setData(cart)
                  let sum=0;
                  for(var i=0;i<cart.length;i++)sum+=Number(cart[i].price)
                setPrice(sum)
                  console.log("loaded-->"+cart)
                  setLoading(false)
                }
          
            }catch(e){
                console.log("Error--->"+e)
            }
      }
      displayCartData()
    },[])

    const removeFromtheCart= async(ele)=>{
      console.log("Inside")
     try{
      const response = await fetch(`/api/user/cart/${ele.id}`,{
        method:"DELETE",
        headers: {
          'authorization': localStorage.getItem("encodedToken")
        }
      })

      // const{data} = await response.json();
     
      if(response.ok){
        console.log("cart-->"+JSON.stringify(response))
        allValues.cart.removeFromCart(ele)
        data.splice(data.indexOf(ele))
        price=price-Number(ele.price)
        console.log("data-->"+data)
      }
     }catch(e){
        console.log("Error"+e)
     }

    }


    const addToWishList= async(ele)=>{
      console.log("Inside wishlist")
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

        }
    }catch(e){
        console.log("Error--->"+e)
    }
   
    }


  return (
    <div style={{ background: "linear-gradient(to bottom right, #E3F0FF, #FAFCFF)"}}>
        <Navbar/>
        <h4>My Cart</h4>
        <div id='cartParent'>
          {

            loading?
            ( <div className="loader-container">
            <div className="spinner"></div>
          </div>)
            :
            ( <div className='productCardParent'>
            {

                data.length==0?
                (
                  <div style={{backgroundColor:"white"}}>
                      <img src={emptyCart} className='emptyCart' />
                    </div>
                )
                :
                <div className='addToCartCard'>
                  {data.map(ele=>
<div className='cartBox'> 
    <img src={ele.img} />
    <h5>{ele.name}</h5>
    <div className='secondBox'><span className='plus'>+</span>1<span className='plus'>-</span></div>
    <div className='thirdBox'><h5 >₹{ele.price}</h5>{allValues.wishList.values.includes(ele)?"":<span style={{cursor:"pointer"}} onClick={()=>addToWishList(ele)}>Add to WishList</span>}<span onClick={()=>removeFromtheCart(ele)} style={{cursor:"pointer"}}>Remove From cart</span></div>
  </div>

                  )
              

                  }
      <div style={{display:"flex",justifyContent:"space-between",borderTop:"2px solid grey",padding:"10px"}}>
        <h3>Total</h3>
        <h3>₹{price}</h3>
      </div>
      <button style={{fontWeight:"bold",border:"none", width:"200px", margin:"auto", padding:"10px", color:"teal"}}>Checkout</button>
                  </div>
            }   
              </div>)

          }
           
        </div>
    </div>
  )
}
