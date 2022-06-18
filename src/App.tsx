import React from 'react'
import './App.scss'
import { BrowserRouter as Router, Routes, Route , Navigate} from 'react-router-dom'
import {DefaultLayout, RequireAuth} from './Components/'
import { publicRoutes, privateRoutes } from './Routes/Router'
import {useStore} from './Hooks'
// import console from 'console'

const App = () => {
  const [state] = useStore()
  return (
    <div >
      <Router>
        <Routes>
            {publicRoutes.map((route, index) => { 
                const Layout = route.layout || DefaultLayout 
                const Page = route.component
                return(
                  <Route key={index} path={route.path} element={
                    <Layout>
                      {state.user && route.path === 'login' ? <Navigate to={'/product'}/>: <Page/> }
                    </Layout>}
                  />
                )
            })}
            <Route element={<RequireAuth to='/login'/>}>
              {privateRoutes.map((route, index) => {
                    const Layout = route.layout || DefaultLayout 
                    const Page = route.component
                return (
                  <Route key={index} path={route.path} element={
                    <Layout>
                      <Page/>
                    </Layout>}
                  />
                )
              })}
            </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App