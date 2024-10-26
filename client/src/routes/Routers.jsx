import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes'
import Login from '../pages/Login'
import Landing from '../pages/Landing'
import Signup from '../pages/Signup'
import Home from '../components/Home'
import FreeTravelCarbonCalculator from '../components/FreeTravelCarbonCalculator'
import EcoAccommodation from '../components/EcoAccommodations'
import Donation from '../components/Donation'
import Itinerary from '../components/Itinerary'
import PaymentSuccess from '@/components/PaymentSuccess'
import PaymentCancel from '@/components/PaymentCancel'


const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/success' element={<PaymentSuccess/>}/>
        <Route path= '/cancel' element={<PaymentCancel/>}/>
        <Route path="/" element={<Home />} />
            <Route path="/FreeTravelCarbonCalculator" element={<FreeTravelCarbonCalculator />} />
            <Route path="/EcoAccommodations" element={<EcoAccommodation />} />
            <Route path="/itinerary" element={<Itinerary />} />
            <Route path="/donation" element={<Donation />} />

    </Routes>
  )
}

export default Routers