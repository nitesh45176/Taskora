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
import RunnerTasks from './pages/runner/RunnerTasks'
import RunnerActiveTask from './pages/runner/RunnerActiveTask'
import MyTasks from './pages/user/MyTasks'

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
         <Route path='/runner/tasks' element={<RunnerTasks/>}/>
         <Route path='/runner/active-task' element={<RunnerActiveTask/>}/>
         <Route path="/my-tasks" element={<MyTasks />} />

       </Routes>

       {!isAuthPage && <Footer/>}

       <Toaster richColors/>
    </div>
  )
}

export default App