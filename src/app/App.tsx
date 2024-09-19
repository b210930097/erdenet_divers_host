import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Dashboard, Settings, Users, Graphic } from '../pages'
import { Navbar, Sidebar } from '../components'

const App: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true)

  const handleMenuClick = () => {
    setSidebarOpen((prev) => !prev)
  }

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {isSidebarOpen && <Sidebar />}
        <div style={{ flex: 1 }}>
          <Navbar title="My Dashboard" onMenuClick={handleMenuClick} />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/graphic/:email" element={<Graphic />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
