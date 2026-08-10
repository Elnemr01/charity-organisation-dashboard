import './App.css'
import { Route, Routes } from 'react-router'
import InverseProtected from './protectedRoute/InverseProtected'
import Login from './pages/login/Login'
import DashboardRoutes from './protectedRoute/DashboardRoutes'
import Home from './pages/home/Home'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <div className="App " dir='rtl'>
      <Toaster/>
      <Routes>
        {/* login route */}
        <Route path='/login' element={<InverseProtected>
          <Login/>
        </InverseProtected>}/>
        
        {/* main app routes */}
        <Route path='/' element={<DashboardRoutes/>}>
          <Route index element={<Home/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
