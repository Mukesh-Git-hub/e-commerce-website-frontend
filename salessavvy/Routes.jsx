import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Registration from './src/Registration'
import LoginPage from './src/LoginPage'
import Footer from './src/Footer'
import Header from './src/Header'
import ProfileDropDown from './src/ProfileDropDown'

const AppRoutes = () => {
  return (
  <Routes>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/register' element={<Registration/>}/>
     <Route path='/footer' element={<Footer/>}/>
      <Route path='/header' element={<Header/>}/>
      <Route path='/profile' element={<ProfileDropDown/>}/>
  </Routes>
  )
}

export default AppRoutes;
