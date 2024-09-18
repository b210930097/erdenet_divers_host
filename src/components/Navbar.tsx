import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { LoginModal } from './LoginModal'
import { auth } from '../config/firebase'
import { signOut, onAuthStateChanged } from 'firebase/auth'

interface Props {
  title: string
  onMenuClick: () => void
}

export const Navbar: React.FC<Props> = ({ title, onMenuClick }) => {
  const [isLoginModalOpen, setLoginModalOpen] = useState<boolean>(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  const handleLoginClick = () => {
    setLoginModalOpen(true)
  }

  const handleCloseLoginModal = () => {
    setLoginModalOpen(false)
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error signing out: ', error)
    }
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {user ? (
            <>
              <Typography variant="body1" sx={{ mr: 2 }}>
                {user.email}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Log Out
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={handleLoginClick}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <LoginModal open={isLoginModalOpen} onClose={handleCloseLoginModal} />
    </>
  )
}
