import React, { createContext, useContext, useReducer, useState } from 'react'


export const ProvideContext = createContext();

const ContextProvider = ({children}) => {
  const handleContextData=(state,action)=>{
      switch(action.type){
          case "ACTIONS.ADDTOCART":
            return {...state,cartValues:[...state.cartValues,action.cartValues]}
            case "ACTIONS.ADDTOWISHLIST":
              return {...state,wishListValues:[...state.wishListValues,action.wishListValues]}
              case "ACTIONS.REMOVEFROMCART":
              return {...state,cartValues:state.cartValues.splice(state.cartValues.indexOf(action.cartItem))}
              case "ACTIONS.REMOVEFROMWISHLISTS":
              return {...state,wishListValues:state.wishListValues.splice(state.wishListValues.indexOf(action.listItem))}
              default:
                return {state}
      }
  }





    const[state,dispatch] = useReducer(handleContextData,{ cartValues:[], wishListValues:[]})


    const [isUserLoggedIn,setUserLogin] = useState(false);
    const[isLoading,setLoading] = useState(true)

    const handleUserLogin=()=>{
         setUserLogin(!isUserLoggedIn)
    }

    const addToCart=(ele)=>{
      dispatch({type:"ACTIONS.ADDTOCART",cartValues:ele})
    }

    const addToWishList=(ele)=>{
      dispatch({type:"ACTIONS.ADDTOWISHLIST", wishListValues:ele})
    }

    const removeFromCart=(ele)=>{
      dispatch({type:"ACTIONS.REMOVEFROMCART", cartItem:ele})
    }

    const removeFromWishList=(ele)=>{
      dispatch({type:"ACTIONS.REMOVEFROMWISHLISTS", listItem:ele})
    }


    const allValues={
      authentication:{
        isUserLoggedIn: isUserLoggedIn,
        handleUserLogin:handleUserLogin,
        isLoading:isLoading,
        setLoading:setLoading 
      },
      cart:{
        values:state.cartValues,
        addToCart:addToCart,
        removeFromCart:removeFromCart
      },
      wishList:{
        values:state.wishListValues,
        addToWishList:addToWishList,
        removeFromWishList:removeFromWishList
    },
    user:{

    }
  }
  return (
    <ProvideContext.Provider value={{allValues}}>{children}</ProvideContext.Provider>
  )
}

export default ContextProvider