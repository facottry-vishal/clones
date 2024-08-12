import React from 'react'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import { Link } from 'react-router-dom' 

const Header = (props) => {
  const navigate = useNavigate()
  
  return (
   <HeaderContainer>
     <div className='logo'>
      <img src='https://res.cloudinary.com/ehizeex-shop/image/upload/v1668265433/NetflixApp/2560px-Netflix_2015_logo.svg_rbicwl_knwp6f.png'
      alt='no internet connection'
      />
     </div>
     
     
     
   </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    .logo{
     img{
      height: 3rem;
      cursor: pointer;
     }
    }
  
`

export default Header