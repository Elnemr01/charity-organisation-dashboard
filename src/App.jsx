import { Route, Routes } from 'react-router'
import InverseProtected from './protectedRoute/InverseProtected'
import Login from './pages/login/Login'
import DashboardRoutes from './protectedRoute/DashboardRoutes'
import Home from './pages/home/Home'
import { Toaster } from 'react-hot-toast'
import Categories from './pages/categories/Categories'
import Money from './pages/banks/money/Money'
import Products from './pages/banks/products/Products'
import Transfer from './pages/banks/money/Transfer'
import ConvertUnit from './pages/banks/products/ConvertUnit'
import Donations from './pages/donations/Donations'
import AddDonation from './pages/donations/AddDonation'
import Doners from './pages/doners/Doners'
import AddDoner from './pages/doners/AddDoner'
import DonerDetails from './pages/doners/DonerDetails'

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

          <Route path='/categories' element={<Categories/>}/>

          <Route path='/banks/money' element={<Money/>}/>
          <Route path='/banks/money/transfer' element={<Transfer/>}/>

          <Route path='/banks/products' element={<Products/>}/>
          <Route path='/banks/products/convert-unit/:id' element={<ConvertUnit/>}/>
          
          <Route path='/donations' element={<Donations/>}/>
          <Route path='/donations/add' element={<AddDonation/>}/>

          <Route path='/doners' element={<Doners/>}/>
          <Route path='/doners/add' element={<AddDoner/>}/>
          <Route path='/doners/:id' element={<DonerDetails/>}/>

        </Route>
      </Routes>
    </div>
  )
}

export default App
