import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Navbar } from './Navbar'
import { ProvideContext } from './ContextProvider'
import { BsHeart } from 'react-icons/bs';
import { json, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BsFillHeartFill } from 'react-icons/bs';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';


export const Product = () => {
  const[loading,setLoading] = useState(true)
    const handleMultipleStates=(state,action)=>{
      switch(action.type){
        case "ACTIONS.DEFAULT_FILTER":
          return {...state,defaultFilter:action.defaultFilter}
        case "ACTIONS.SHOW_CATEGORIES":
          return {...state,categories:action.categories}
          case "ACTIONS.SHOW_PRODUCTS":
            return {...state,products:action.products}
          case "ACTIONS.UNALTERED_DATA":
            return {...state,unAlteredData:action.unAlteredData}
            case "ACTIONS.PRICE_RANGE":
            return {...state,price:action.price}
          default:
            return {state}
      }
       
    }


  //  document.querySelector("#search").addEventListener('change',(e)=>{
  //   console.log("INside")
  //   dispatch({type:"ACTIONS.SHOW_PRODUCTS", products:state.unAlteredData.filter(ele=>ele==e.target.value)})
  //  })

    const handleOnclickEvent=(filter,data)=>{
      console.log("filter-->"+filter)
      dispatch({type:"ACTIONS.DEFAULT_FILTER",defaultFilter:filter})
      dispatch({type:"ACTIONS.SHOW_PRODUCTS",products:data})
    }

    const filterProductsWithRatings=(star)=>{
      console.log("Star-->"+star)
      console.log("Current Filter-->"+state.defaultFilter)
        if(state.defaultFilter==='All'){
          console.log("All filter")
          dispatch({type:"ACTIONS.SHOW_PRODUCTS", products:state.unAlteredData.filter(ele=>(star==4)?(ele.star>=star):(ele.star==star))})
        }else{
          console.log("diff filter")
          if(star==4){
            dispatch({type:"ACTIONS.SHOW_PRODUCTS", products:state.unAlteredData.filter(ele=>(ele.categoryName==state.defaultFilter && ele.star>=4))})
          }else{
            dispatch({type:"ACTIONS.SHOW_PRODUCTS", products:state.unAlteredData.filter(ele=>ele.categoryName==state.defaultFilter && ele.star==star)}) 
          }
         }
    }

    // const SortAccordingly=(action)=>{
    //   console.log("Inside")
    //  if(action==1){
    //     dispatch({
    //       type:"ACTIONS.SHOW_PRODUCTS",
    //       products:(state.defaultFilter==='All'?(state.unAlteredData.sort((x,y)=>x.price-y.price)):(state.unAlteredData.filter(ele=>ele.categoryName==state.defaultFilter).sort((x,y)=>x.price-y.price)))
    //     })
    //  }else{
    //   dispatch({
    //     type:"ACTIONS.SHOW_PRODUCTS",
    //     products:(state.defaultFilter==='All'?(state.unAlteredData.sort((x,y)=>y.price-x.price)):(state.unAlteredData.filter(ele=>ele.categoryName==state.defaultFilter).sort((x,y)=>y.price-x.price)))
    //   })
    //  }
    // }
    
    const clear=()=>{
      console.log("Clear")
        document.getElementById("All").checked=true
    }

    const SortAccordingly=(action)=>{
     if(action==1){
        dispatch({
          type:"ACTIONS.SHOW_PRODUCTS",
          products:state.products.sort((x,y)=>x.price-y.price)
        })
     }else{
      dispatch({
        type:"ACTIONS.SHOW_PRODUCTS",
        products:state.products.sort((x,y)=>y.price-x.price)
      })
     }
    }

    const FilterAccordingToThePrice=(price)=>{
      dispatch({ type:"ACTIONS.PRICE_RANGE",price:price})
      dispatch({
        type:"ACTIONS.SHOW_PRODUCTS",
        products:
        (state.defaultFilter=='All'?
        (state.unAlteredData.filter(ele=>Number(ele.price)<=Number(price)))
        :
        (state.unAlteredData.filter(ele=>ele.categoryName==state.defaultFilter && Number(ele.price)<=Number(price))))
      })
    }

  const[state,dispatch] = useReducer(handleMultipleStates, {categories:{}, products:{},price:3000,unAlteredData:{},defaultFilter:"All"})
  const{allValues} = useContext(ProvideContext)
  useEffect(()=>{ 
    const handleHomePageData= async()=>{
      // try{
      //   const Catresponse = await fetch("/api/categories")
      //   const ProdResponse = await fetch("/api/products")
      //   if(Catresponse.status===200){
      //     console.log("Fetched Categories Successfully!");
      //        const data = await Catresponse.json();
      //    dispatch({type:"ACTIONS.SHOW_CATEGORIES", categories:data.categories})
           
      //     // setData(await response.categories)
      //   }
      //   if(ProdResponse.status===200){
      //     console.log("Fetched Products Succesfully!")
      //     const data =  await ProdResponse.json()
      //     dispatch({type:"ACTIONS.SHOW_PRODUCTS", products:data.products})
      //     dispatch({type:"ACTIONS.UNALTERED_DATA", unAlteredData:data.products})
      //   }

      //   Promise.all([Catresponse,ProdResponse]).then(()=>{
      //     setLoading(false)
      //   })
      // }catch(e){
      //   console.log("Error-->"+e)
      // }

      Promise.all([axios.get("/api/categories"), axios.get("/api/products")]).
      then(([response1, response2])=>{
        console.log("response1-->"+JSON.stringify(response1))
        console.log("response2-->"+JSON.stringify(response2))
        dispatch({type:"ACTIONS.SHOW_CATEGORIES", categories:response1.data.categories})
        dispatch({type:"ACTIONS.SHOW_PRODUCTS", products:response2.data.products})
        dispatch({type:"ACTIONS.UNALTERED_DATA", unAlteredData:response2.data.products})
        setLoading(false)
      }).catch(error=>{
        console.log("Error file fethcing"+error)
      })

    }
    setTimeout(()=>{
      handleHomePageData()
    },1000)
  },[])

  const location = useLocation();

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


  return (
   loading?
    (
      <div className="loader-container">
         <div className="spinner"></div>
       </div>)
       :
      (
    <div style={{backgroundColor:"#DDE6ED",  overflow: "scroll"}}>
     
        <Navbar/>
        <div id="MainParent">
        <div id='navbarParent'>
             <div id='navFirstChild'>
              <h4>Filter</h4>
              <h4 style={{borderBottom:"0.5px solid black"}} onClick={()=>clear()}>Clear</h4>
              </div>
              <div id='secondChild'>
              <h4 style={{textAlign:"start"}}>Price</h4>
              <span>{state.price}</span>
              <input type='range' min='2000' max='50000'  id="range" onInput={(event)=>FilterAccordingToThePrice(event.target.value)}/>
              </div>
              <div id='thirdChild'>
                <h4 style={{textAlign:"start"}}>Companies</h4>
                <div>
                <label className='labelStyle'><input type='radio'   name='company' checked={location.state===null?"checked":""} onClick={()=>{handleOnclickEvent("All",state.unAlteredData)}} id="All" />All</label>
                {
                state.categories.map(ele=> <label className='labelStyle' onClick={()=>{handleOnclickEvent(ele.categoryName,state.unAlteredData.filter(items=>items.categoryName===ele.categoryName))}}><input key={ele.id} type='radio' name="company" checked={location.state===null?"":(location.state.categoryName===ele.categoryName?"checked":"")} />{ele.categoryName}</label>)
                }
             
              </div>
              </div>
              <div id="fourthChild">
                <h4 style={{textAlign:"start",paddingLeft:"12px"}}>Rating</h4>
                <div >
                 <label className='labelStyle'><input type='radio' name="radio" onClick={()=>filterProductsWithRatings(4)}/>4stars and above</label>
                 <label className='labelStyle'><input type='radio' name="radio" onClick={()=>filterProductsWithRatings(3)}/>3stars and above</label>
                 <label className='labelStyle'><input type='radio' name="radio" onClick={()=>filterProductsWithRatings(2)}/>2stars and above</label>
                </div>
              </div>
              <div >
                <h4 style={{textAlign:"start",paddingLeft:"12px"}}>Sort By</h4>
                <div style={{padding:"5px"}}>
                 <label className='labelStyle' onClick={()=>{SortAccordingly(1)}}><input type='radio' name="price" />Price-Low to High</label>
                 <label className='labelStyle' onClick={()=>{SortAccordingly(0)}}><input type='radio' name="price" />Price-High to Low</label>
                </div>
              </div>
              </div>

              <div id="ParentTwo">
                <h4 style={{color:"black"}}>Showing All Products</h4>
                <div className='productCardParent'>
                  {
                    state.products.map(ele=>
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
                      
                        {

                          allValues.wishList.values.includes(ele)?
                          (
                            <button className='prodButton' onClick={()=>{
                              removeFromWishList(ele)
                             }}><BsFillHeartFill color='red'/></button>
                          )
                          :
                          (
                            <button className='prodButton' onClick={()=>{
                            addToWishList(ele)
                             }}><BsHeart backgroundColor='white'/></button>
                          )
                          

                        }
                          </div>
                      
                        </div>
                        </div>
                      )
                  }
                </div>
              </div>
        </div>
        
    </div>
      )
  )
}
