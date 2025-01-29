// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Face from './pages/Face'
import Lips from './pages/Lips'
import Eyes from './pages/Eyes'
import Tools from './pages/Tools'
import About from './pages/About'
import Product from './pages/Product'
import Cart from './pages/Cart'
import LoginPopup from './components/LoginPopup'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Navbar from './components/Navbar'
import NotificationPopup from './components/NotificationPopup'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='w-full'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/face" element={<Face/>}/>
        <Route path='/eyes' element={<Eyes/>}/>
        <Route path='/lips' element={<Lips/>}/>
        <Route path='/tools & makeup sets' element={<Tools/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/product/:productId' element={<Product/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginPopup/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/place-order' element={<PlaceOrder/>}/>
        <Route path='/notifications' element={<NotificationPopup/>}/> 
        </Routes>    
        <Footer />  
    </div>
  )
}

export default App
