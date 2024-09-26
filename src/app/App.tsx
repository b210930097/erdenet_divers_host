import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Settings, Users, Graphic } from '../pages'
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
          <Navbar title="Жолоочийн туслах" onMenuClick={handleMenuClick} />
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/charts" element={<Graphic />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
