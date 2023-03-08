import React from 'react'
import { Link } from 'react-router-dom'

function LogoImage(props) {
  return (
    <Link to={`${process.env.PUBLIC_URL}/`} >
      <img alt='Logo' className='img-fluid' src={`${process.env.PUBLIC_URL}/assets/images/icon/${props.logo}`} />
    </Link>
  )
}

export default LogoImage;