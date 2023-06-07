import "./App.css";
import Mockman from "mockman-js";
import {Routes,Route} from "react-router-dom"
import { Login } from "./Components/Login";
import { ProvideContext } from "./Components/ContextProvider";
import { useContext } from "react";
import RequiresAuth from "./Components/RequiresAuth";
import { Home } from "./Components/Home";
import { Product } from "./Components/Product";
import { Cart } from "./Components/Cart";
import toast, { Toaster } from 'react-hot-toast';
import WishList from "./Components/WishList";
import Signup from "./Components/Signup";


function App() {
  const{allValues} = useContext(ProvideContext)

  return (
    <div className="App">

     <Routes>
           <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mockman" element={<Mockman/>} />
            <Route path="/" element={<Home/>} />
            <Route path="/product" element={<Product />}/>
            <Route path="/cart" element={<RequiresAuth >{<Cart/>} </RequiresAuth>} />
            <Route path="/wishList" element={<RequiresAuth >{<WishList/>}</RequiresAuth>} />
        </Routes>
    </div>
  );
}

export default App;
