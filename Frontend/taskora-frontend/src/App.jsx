import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import VerifyEmail from './pages/auth/Verification'
import { Toaster } from 'sonner'
import ProtectedRoute from './components/routes/ProtectedRoute'
import CreateTask from './pages/user/CreateTask'

const App = () => {
  const location = useLocation()
  const authRoutes = ['/login', '/register','/verify-email']
  const isAuthPage = authRoutes.includes(location.pathname)
  return (
    <div>
      {!isAuthPage && <Navbar/>}
       <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/register' element={<Register/>}/>
         <Route path='/verify-email' element={<VerifyEmail/>}/>
         <Route path='/tasks/create' element={ 
          <ProtectedRoute >
              <CreateTask/>
          </ProtectedRoute>
         }/>
       </Routes>

       {!isAuthPage && <Footer/>}

       <Toaster richColors/>
    </div>
  )
}

export default App