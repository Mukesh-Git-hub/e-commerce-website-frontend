import React from 'react'
import { Routes,Route } from 'react-router-dom'
import LoginPage from "./LoginPage";
import Registration from "./Registration";
import Header from "./Header";
import Footer from "./Footer";
import ProfileDropDown from "./ProfileDropDown";


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
