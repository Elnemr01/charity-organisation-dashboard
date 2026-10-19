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
import DonationDetails from './pages/donations/DonationDetails'
import FamilyExpense from './pages/familyExpense/FamilyExpense'
import EditFamilyExpense from './pages/familyExpense/EditFamilyExpense'
import CharityExpenseList from './pages/charityExpense/CharityExpenseList'
import AddCharityExpense from './pages/charityExpense/AddCharityExpense'
import CharityExpenseDetails from './pages/charityExpense/CharityExpenseDetails'
import NotFound from './pages/not-found/NotFound'
import EditFamilyInfo from './pages/families/familyInfo/EditFamilyInfo'
import FamilyDetails from './pages/families/familyInfo/FamilyDetails'
import AddFamily from './pages/families/familyInfo/AddFamily'
import AddRequiredItem from './pages/families/familyInfo/AddRequiredItem'
import Families from './pages/families/familyInfo/Families'
import Cases from './pages/families/cases/Cases'
import CaseDetails from './pages/families/cases/CaseDetails'
import AddCaseToFamily from './pages/families/cases/AddCaseToFamily'
import AddFamilyFinancialBudget from './pages/families/financialBudget/AddFamilyFinancialBudget'

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
          <Route path='/donations/:id' element={<DonationDetails/>}/>

          <Route path='/doners' element={<Doners/>}/>
          <Route path='/doners/add' element={<AddDoner/>}/>
          <Route path='/doners/:id' element={<DonerDetails/>}/>

          <Route path='/family-expense' element={<FamilyExpense/>}/>
          <Route path='/family-expense/edit/:id' element={<EditFamilyExpense/>}/>

          <Route path='/charity-expense' element={<CharityExpenseList/>}/>
          <Route path='/charity-expense/add' element={<AddCharityExpense/>}/>
          <Route path='/charity-expense/:id' element={<CharityExpenseDetails/>}/>

          <Route path='/families' element={<Families/>}/>
          <Route path='/families/:id' element={<FamilyDetails/>}/>
          <Route path='/families/add' element={<AddFamily/>}/>
          <Route path='/families/edit' element={<EditFamilyInfo/>}/>
          <Route path='/families/required-items/add' element={<AddRequiredItem/>}/>
          
          <Route path='/cases' element={<Cases/>}/>
          <Route path='/cases/:id' element={<CaseDetails/>}/>
          <Route path='/cases/add' element={<AddCaseToFamily/>}/>

          <Route path='/financial-budget/add' element={<AddFamilyFinancialBudget/>}/>
          
          <Route path='*' element={<NotFound/>}/>

        </Route>
      </Routes>
    </div>
  )
}

export default App
