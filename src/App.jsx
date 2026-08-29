import { useState } from 'react'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { NewProduct } from './pages/NewProduct'
import { Dashboard } from './pages/DashBoard'
import { Dying } from './pages/Dying'
import { Shzira } from './pages/Shzira'
import { SearchPlus } from './pages/SearchPlus'
import { Stats } from './pages/Stats'
import { AdminPermissions } from './pages/AdminPermissions'
import { Orders } from './pages/Orders'

function App() {

  return (
    <>
      <Router>
        <section className='full-Page'>
          <AppHeader />
          <Routes>
            <Route path='/login' Component={Login} />
            <Route path='/new' Component={NewProduct} />
            <Route path='/search' Component={SearchPlus} />
            <Route path='/dying' Component={Dying} />
            <Route path='/shzira' Component={Shzira} />
            <Route path='/dashboard' Component={Dashboard} />
            <Route path='/stats' Component={Stats} />
            <Route path='/orders' Component={Orders} />
            <Route path='/admin/permissions' Component={AdminPermissions} />
            <Route path='/' Component={Home} />
          </Routes>
        </section>
      </Router>
    </>
  )
}

export default App
