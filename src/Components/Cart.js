import React, { useContext, useEffect, useState } from 'react'
import { ProvideContext } from './ContextProvider'
import { Navbar } from './Navbar'
import { BsFillHeartFill } from 'react-icons/bs';
import img2 from "../Images/nikeTwo.png"
import { ToastProvider, useToasts } from 'react-toast-notifications';
import emptyCart from "../Images/emptyCart.png"
import { json } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const Cart = () => {
  const newaddress = [
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
  const[data,setData]= useState([])
  const[address,setAddress] = useState(newaddress)
  const[price,setPrice]  = useState(0)
  const[loading,setLoading] = useState(true)
 const[hashMap, setMap] = useState({})
 const[modal,setModal] = useState(false)
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
                console.log("cart========>"+JSON.stringify(cart))
                if(response.ok){
                      setData(cart)
                      let sum=0;
                      console.log("cart==>"+JSON.stringify(cart))
                      for(var i=0;i<cart.length;i++){
                        sum+=Number(cart[i].price)
                      }
                    setPrice(sum)
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


    const getKeyLength = (key) => {
      // Check if the key exists in the object
      if (hashMap.hasOwnProperty(key)) {
        const value = hashMap[key];
        return value.length; // Get the length of the value
      }
      return 0; // If key doesn't exist, return 0 or handle it accordingly
    };

    const handleQtyChangeInc=(id,newprice)=>{
      setPrice(Number(price)+Number(newprice))
      const Index = data.findIndex(index=>index._id==id);
      data[Index].qty=data[Index].qty+1
      setData(data)
      console.log("updated====================>"+JSON.stringify(data))
    }

    const handleQtyChangeDec=(id,newprice)=>{
      setPrice(Number(price)-Number(newprice))
      const Index = data.findIndex(index=>index._id==id);
      data[Index].qty=data[Index].qty-1
      if(data[Index].qty==0){
        setData(data.filter(ele=>ele._id!=id))
      }else{
      setData(data)
      }
      console.log("updated====================>"+JSON.stringify(data))
    }

    const notify = () => toast.success(`Order placed Sucessfully`);
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
    <div className='secondBox'>
      <span className='plus' onClick={()=>{
      handleQtyChangeInc(ele._id,ele.price);
    }}>+</span>{ele.qty}<span className='plus'
    onClick={()=>{
      handleQtyChangeDec(ele._id,ele.price);
    }}>-</span></div>
    <div className='thirdBox'>
      <h5 >₹{ele.price}</h5>{allValues.wishList.values.includes(ele)?"":<span style={{cursor:"pointer"}} onClick={()=>addToWishList(ele)}>Add to WishList</span>}<span onClick={()=>removeFromtheCart(ele)} style={{cursor:"pointer"}}>Remove From cart</span></div>
  </div>

                  )
              

                  }
      <div style={{display:"flex",justifyContent:"space-between",borderTop:"2px solid grey",padding:"10px"}}>
        <h3>Total</h3>
        <h3>₹{price}</h3>
      </div>
      <button style={{fontWeight:"bold",border:"none", width:"200px", margin:"auto", padding:"10px", color:"teal"}}
      onClick={()=>{
          setModal(true)
      }}
      >Checkout</button>
                  </div>
            }   
{
  modal?
<div class="checkoutmodal">
  <div class="checkoutmodal-content">
    <span class="close-btn" onClick={()=>setModal(false)}>&times;</span>
    <h2>Checkout</h2>
    <div style={{display:"flex",flexDirection:"column",width:"300px"}}>
      {
        address.map(ele=>
          <p style={{display:"flex",flexDirection:"column",boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.2)",backgroundColor:"wheat",cursor:"pointer"}}
          onClick={()=>{
            notify()
            setModal(false)
         }}>
          <h1>{ele.name}</h1>
          <h4>{ele.address}</h4>
    </p>
          )
      }
     
      </div>
  </div>
</div>
:
""
          }
              </div>
              
              
              )

              

          }
           
        </div>
        <ToastContainer />
    </div>
  )
}
