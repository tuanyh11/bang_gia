
import Product from '../Pages/Product/Product'
import Productact from '../Pages/Productact/Productact' 
import Users from '../Pages/Users/Users' 
import Usersact from '../Pages/Usersact/Usersact' 
import Login from '../Pages/Login/Login' 
import Logout from '../Pages/Logout/Logout' 
import {LoginLayout} from '../Components/'

export const publicRoutes = [
  {path: '/', component: Product, layout: null},
  {path: 'login', component: Login, layout: LoginLayout},
  {path: 'product', component: Product, layout: null}
]

export const privateRoutes = [
  {path: 'createproduct', component: Productact, layout: null},
  {path: 'updateproduct/:id', component: Productact, layout: null},
  {path: 'updateuser/:id', component: Usersact, layout: null},
  {path: 'createuser', component: Usersact, layout: null},
  {path: 'users', component: Users, layout: null},
  {path: 'logout', component: Logout, layout: null},
] 