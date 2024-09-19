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
import { auth, logUserEvent } from '../config/firebase'

export const LoginModal: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      let userCredential
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        )
        await logUserEvent(userCredential.user.uid, email, 'signUp')
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password)
        await logUserEvent(userCredential.user.uid, email, 'login')
      }
      onClose()
    } catch (error) {
      setError(
        'Error: ' + (error instanceof Error ? error.message : 'Unknown error'),
      )
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
              : 'Logging in...'
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
