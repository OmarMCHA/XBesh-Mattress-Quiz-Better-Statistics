import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import styled from 'styled-components'

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`

const Main = styled.main`
  flex: 1;
  padding: 4rem 0; /* Increased padding from 2rem to 4rem */
`

function Layout() {
  return (
    <LayoutContainer>
      <Header />
      <Main>
        <div className="container">
          <Outlet />
        </div>
      </Main>
      <Footer />
    </LayoutContainer>
  )
}

export default Layout
