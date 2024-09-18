import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Dashboard, Settings, Users } from '../pages'
import { Navbar, Sidebar } from '../components'

const App: React.FC = () => {
  const handleMenuClick = () => {
    console.log('Menu clicked!')
  }

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Navbar title="My Dashboard" onMenuClick={handleMenuClick} />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
