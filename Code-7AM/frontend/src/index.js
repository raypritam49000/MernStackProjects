import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';

import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { IntlProvider } from 'react-redux-multilingual'
import translate from './constants/translations'
import store from './store/index'
import { getAllProducts } from './actions/index'

import Layout from './components/layout'
import Home from './components/home/index'
import AboutUs from './components/pages/about-us'
import ContactUs from './components/pages/contact-us'
import FAQ from './components/pages/faq'
import PageNotFound from './components/pages/404'
import Login from './components/pages/login'
import Register from './components/pages/register'

import Cart from './components/cart'
import Compare from './components/compare'
import Wishlist from './components/wishlist'

import Checkout from './components/checkout'
import Success from './components/checkout/success'

import ProductDetails from './components/products/index'
import Collection from './components/collection'



class Root extends Component {
  render() {
    store.dispatch(getAllProducts());
    return (
      <Provider store={store}>
        <IntlProvider translations={translate} locale='en' >
          <Router>
            <Layout>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path='/pages/about-us' element={<AboutUs />} />
                <Route path='/pages/contact-us' element={<ContactUs />} />
                <Route path='/pages/faq' element={<FAQ />} />
                <Route path='/pages/404' element={<PageNotFound />} />
                <Route path='/pages/login' element={<Login />} />
                <Route path='/pages/register' element={<Register />} />

                <Route path='/cart' element={<Cart />} />
                <Route path='/compare' element={<Compare />} />
                <Route path='/wishlist' element={<Wishlist />} />

                <Route path='/checkout' element={<Checkout />} />
                <Route path='/order-success' element={<Success />} />

                <Route path='/products/details/:id' element={<ProductDetails />} />
                <Route path='/left-sidebar/collection/:category' element={<Collection />} />
                
              </Routes>
            </Layout>
          </Router>
        </IntlProvider>
      </Provider>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
