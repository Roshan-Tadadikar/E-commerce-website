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
  const{allValues} = useContext(ProvideContext)
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
            case "insert_filter":
              console.log("filters present===>"+state.filterDataWrt)
            return {...state,filterDataWrt:state.filterDataWrt.includes(action.payload)
              ?
              (state.filterDataWrt.filter(ele=>ele!=action.payload && ele!="All").length==0?["All"]: state.filterDataWrt.filter(ele=>ele!=action.payload && ele!="All")) 
              :[...state.filterDataWrt.filter(item=>item!="All"),action.payload]}
             
            case "filter":
              return {...state,products:filterData(state.unAlteredData, state.filterDataWrt)}
              case "search_filter":
              return {...state,products:filterBySearch(state.unAlteredData, allValues.search.val)}
              case "inser_all_filter":
                console.log("called fro clear all")
                return {...state,filterDataWrt:["All"]}
          default:
            return {state}
      }
       
    }

    const filterData=(data1,data2)=>{
      console.log("data1===>"+JSON.stringify(data1));
      console.log("data2==>"+data2)
      let data=[]

       if(data2!=undefined && data2.length==1 && data2[0]=="All"){
        data=data1;
    }else{
      for(var i=0;i<data1.length;i++){
        for(var j=0;j<data2.length;j++){
          if(!isNaN(data2[j]) && Number(data2[j])==Number(data1[i].star)){
           if(data2.length>1 && data1[i].categoryName==data2[j]){
            data=[...data,data1[i]]
            break;
           }else{
            data=[...data,data1[i]]
            break;
           }
          }else if(data1[i].categoryName==data2[j]){
            data=[...data,data1[i]]
            break;
          }
        }
      }
    }

      console.log("filtered data==>"+data)
      return data;
    }


    const filterBySearch=(arr, val)=>{
      if(val.length==0)return arr;
      else{
      let newArr=[];
      for(var i=0;i<arr.length;i++){
        if(arr[i].categoryName.includes(val)){
          newArr=[...newArr,arr[i]];
        }
      } 
      console.log("filtered array bys earch==>"+JSON.stringify(newArr))
  
      return newArr}
    }
  

    const Filters={
      "1":"All",
      "2":"Nike",
      "3":"Puma",
      "4":"Adidas",
      "5":"Converse",
      "6":"4",
      "7":"3",
      "8":"2"
    }


 


    
    const clear=()=>{
      console.log("Inside clear function")
      dispatch({type:"inser_all_filter"})
      dispatch({type:"filter"})
      const radio = document.getElementsByName("price");
        for(var i=0;i<radio.length;i++){
          radio[i].checked=false
        }
      document.getElementById("range").value=2000
      dispatch({type:"ACTIONS.PRICE_RANGE", price:2000})

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

  const[state,dispatch] = useReducer(handleMultipleStates, {categories:{}, products:{},price:3000,unAlteredData:{},defaultFilter:"All", filterDataWrt:[]})

  useEffect(()=>{ 
    const handleHomePageData= async()=>{
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

  
  const InsertIntoForFilter=(val)=>{
    const value = Filters[val]
    console.log("values===>"+value)
   dispatch({type:"insert_filter", payload:value})
   dispatch({type:"filter"})
  }

  useEffect(()=>{
    if(location.state?.company!=null)dispatch({type:"insert_filter", payload:location.state.company})
    else dispatch({type:"insert_filter", payload:"All"})
  },[])



  useEffect(()=>{
    dispatch({type:"search_filter"})
  }, [allValues.search.val])


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
                <label className='labelStyle' onClick={()=>InsertIntoForFilter(1)}>
                <input  type='checkbox'   name='company' checked={state.filterDataWrt.length===0?false:(state.filterDataWrt.includes("All")?true:false)} id="All"  />All</label>
               
                <label className='labelStyle' onClick={()=>InsertIntoForFilter(2)}>
                <input  type='checkbox' name="Nike" checked={state.filterDataWrt.length===0?false:(state.filterDataWrt.includes("Nike")?true:false)} />Nike
                </label>
                <label className='labelStyle' onClick={()=>InsertIntoForFilter(3)}>
                <input  type='checkbox' name="Puma" checked={state.filterDataWrt.length===0?false:(state.filterDataWrt.includes("Puma")?true:false)} />Puma
                </label>
                <label className='labelStyle' onClick={()=>InsertIntoForFilter(4)}>
                <input  type='checkbox' name="Adidas" checked={state.filterDataWrt.length===0?false:(state.filterDataWrt.includes("Adidas")?true:false)} />Adidas
                </label>
                <label className='labelStyle' onClick={()=>InsertIntoForFilter(5)}>
                <input  type='checkbox' name="Converse" checked={state.filterDataWrt.length===0?false:(state.filterDataWrt.includes("Converse")?true:false)} />Converse
                </label>
                
              </div>
              </div>
              <div id="fourthChild">
                <h4 style={{textAlign:"start",paddingLeft:"12px"}}>Rating</h4>
                <div >
                 <label className='labelStyle'><input type='checkbox' name="radio" onClick={()=>InsertIntoForFilter(6)}  checked={state.filterDataWrt.includes("4")}/>4stars and above</label>
                 <label className='labelStyle'><input type='checkbox' name="radio" onClick={()=>InsertIntoForFilter(7)}  checked={state.filterDataWrt.includes("3")}/>3stars and above</label>
                 <label className='labelStyle'><input type='checkbox' name="radio" onClick={()=>InsertIntoForFilter(8)}  checked={state.filterDataWrt.includes("2")}/>2stars and above</label>
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
                <h4 style={{color:"black"}}>Showing All Products({state.products.length})</h4>
                <div className='productCardParent'>
                  {
                    state.products.map(ele=>
                   
                      <div key={ele.id} className='prodCard'>
                      <Link to="/individualPage" style={{textDecoration:"none", color:"black"}} state={{value:ele}}>
                        <img src={ele.img} className='prodImg'/>
                        </Link>
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
