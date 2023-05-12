import React, { Component } from 'react'
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ColleactioBanner from './widgets/colleaction-banner';
import HomeSlider from './widgets/home-slider';
import LogoBlock from './widgets/logo-block';
import ParallaxBanner from './widgets/parallax-banner';
import SpecialProducts from './widgets/special-products';
import TopCollection from './widgets/top-collection';

export default class Home extends Component {
  render() {
    return (
      <>
        <Helmet>
          <meta charSet='utf-8' />
          <title>Sahosoft Mall | Home</title>
          <meta name='description' content='Sahosoft Mall | Login' />
        </Helmet>

        <HomeSlider />
        <ColleactioBanner />
        <TopCollection type="" />
        <ParallaxBanner />
        <SpecialProducts />
        <LogoBlock />
        <ToastContainer />
      </>
    )
  }
}
