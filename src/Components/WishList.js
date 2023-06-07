import React, { useContext, useEffect, useState } from 'react'
import { Navbar } from './Navbar'
import { ProvideContext } from './ContextProvider';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { BsFillHeartFill } from 'react-icons/bs';
import { BsHeart } from 'react-icons/bs';


const WishList = () => {
   
    const[data,setData] =useState([])
    const[Loading,setLoading] = useState(true);
    const{allValues} = useContext(ProvideContext)
    useEffect(()=>{
        const displayWishListData= async()=>{
                try{
                  const response = await fetch("/api/user/wishlist",{
                      method:"GET",
                      headers: {
                        'authorization': localStorage.getItem("encodedToken")
                      }
                  })
                  const{wishlist} = await response.json()
                  if(response.ok){
                    console.log("wishlist response-->"+JSON.stringify(response))
                    setData(wishlist)
                    setLoading(false)
                  }
            
              }catch(e){
                  console.log("Error--->"+e)
              }
        }
        displayWishListData()
      },[])


      const removeFromWishList= async(ele)=>{
        try{
          const response = await fetch(`/api/user/wishlist/${ele.id}`,{
              method:"DELETE",
              headers: {
                'authorization': localStorage.getItem("encodedToken")
              },
          })
    
    
    
          if(response.ok){
            console.log("Response  -->"+ JSON.stringify(response))
            allValues.wishList.removeFromWishList(ele)
            data.splice(data.indexOf(ele))
            toast.success('Successfully toasted!')
          }
      }catch(e){
          console.log("Error--->"+e)
      }
     
      }

      

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



  return (
    <div>
        
        <Navbar/>
        <div>
        <h4>My Cart</h4>
        <div className='productCardParent'>
        {
            Loading?
            (
                <div className="loader-container">
            <div className="spinner"></div>
          </div>)
            
            :
            (

                data.length==0?
                (
                    <h1 className='emptyWishList'>
                          Oops! There's noting in your wishList
                        </h1>
                )
                :
                    (
                        
                data.map(ele=>
                    <div key={ele.id} className='prodCard'>
                      <img src={ele.img} className='prodImg'/>
                      <div className='miniCard'>
                      <h5>{ele.categoryName}</h5>
                      <h4>{ele.name}</h4>
                      <h5>₹{ele.price}</h5>
                      <div style={{display:"flex"}}>
                        {
                          allValues.cart.values.includes(ele)?
                          (
                            <button className='prodButton'><Link to="/cart" style={{textDecoration:"none",color:"white"}}>Go to cart</Link></button>
                          )
                          :
                          (
                            <button className='prodButton' onClick={()=>{
                              addToCart(ele)
                             }}>Add to cart</button>
                          )
                        }
                  
                          <button className='prodButton' onClick={()=>{
                            removeFromWishList(ele)
                           }}><BsFillHeartFill color='red'/></button>
                        </div>
                    
                      </div>
                      </div>
                    )
            )

            )
        }
        </div>

</div>
    </div>
  )
}

export default WishList