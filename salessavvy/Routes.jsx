import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Registration from './src/Registration'

const AppRoutes = () => {
  return (
  <Routes>
    <Route path='/register' element={<Registration/>}/>
  </Routes>
  )
}

export default AppRoutes;
