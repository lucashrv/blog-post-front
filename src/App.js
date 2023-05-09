import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import NavbarComponent from './components/Navbar'
import axios from 'axios'

const App = () => {
  return (
    <div>
      <NavbarComponent />
      <Container style={{ width: '80%' }}>
        <Outlet />
      </Container>
    </div>
  )
}

export default App