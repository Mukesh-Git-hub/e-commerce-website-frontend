import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Registration from './src/Registration'
import LoginPage from './src/LoginPage'
const AppRoutes = () => {
  return (
  <Routes>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/register' element={<Registration/>}/>
  </Routes>
  )
}

export default AppRoutes;
