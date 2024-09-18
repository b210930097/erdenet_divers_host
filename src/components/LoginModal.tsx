import React, { useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
} from '@mui/material'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../config/firebase'

interface Props {
  open: boolean
  onClose: () => void
}

export const LoginModal: React.FC<Props> = ({ open, onClose }) => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      onClose()
    } catch (error) {
      setError('Error: ' + error)
    } finally {
      setLoading(false)
    }
  }

  const handleSwitchMode = () => {
    setIsSignUp(!isSignUp)
    setEmail('')
    setPassword('')
    setError('')
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isSignUp ? 'Sign Up' : 'Login'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSwitchMode} color="primary">
          {isSignUp
            ? 'Already have an account? Login'
            : 'Create an account? Sign Up'}
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={loading}
        >
          {loading
            ? isSignUp
              ? 'Signing up...'
              : 'Login...'
            : isSignUp
              ? 'Sign Up'
              : 'Login'}
        </Button>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}
