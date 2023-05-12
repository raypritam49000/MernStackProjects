// import React, { Component } from 'react'
// import Layout from './_components/layout'
// import { BrowserRouter } from 'react-router-dom'

// export default class App extends Component {
//     render() {
//         return (
//             <BrowserRouter>
//                 <Layout />
//             </BrowserRouter>
//         )
//     }
// }



import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './_components/auth/login';
import { PrivateRoute } from './_privateRoute/privateRoute';
import Dashboard from './_components/dashboard/dashboard';
import Size from './_components/masters/size';
import Tag from './_components/masters/tag';
import Color from './_components/masters/color';
import UserType from './_components/masters/usertype';
import BrandLogo from './_components/masters/brandlogo';
import Category from './_components/masters/category';

import AddUser from './_components/users/add-user';
import ListUser from './_components/users/list-user';
import Reports from './_components/reports/reports';
import Invoice from './_components/invoice/invoice';
import AddProduct from './_components/products/physical/add-product';
import ProductList from './_components/products/physical/product-list';
import Profile from './_components/settings/profile';
import Orders from './_components/sales/orders';
import Transactions from './_components/sales/transactions';


export default class App extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/auth/login' element={<Login />} />

                    <Route path="/" element={<PrivateRoute />}>
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/masters/size' element={<Size />} />
                        <Route path='/masters/tag' element={<Tag />} />
                        <Route path='/masters/usertype' element={<UserType />} />
                        <Route path='/masters/color' element={<Color />} />
                        <Route path='/masters/brandlogo' element={<BrandLogo />} />
                        <Route path='/masters/category' element={<Category />} />

                        <Route path='/users/add-user' element={<AddUser />} />
                        <Route path='/users/list-user' element={<ListUser />} />

                        <Route path='/settings/profile' element={<Profile />} />

                        <Route path='/products/physical/add-product' element={<AddProduct />} />
                        <Route path='products/physical/product-list' element={<ProductList />} />
                        <Route path='/sales/orders' element={<Orders />} />
                        <Route path='/sales/transactions' element={<Transactions />} />
                        <Route path='/invoice' element={<Invoice />} />
                        <Route path='/reports' element={<Reports />} />
                    </Route>

                    <Route path="*" element={<Login />} />
                </Routes>
            </Router>
        )
    }
}
