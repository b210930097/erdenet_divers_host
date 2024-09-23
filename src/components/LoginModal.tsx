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
        await logUserEvent(userCredential.user.uid, email, 'Бүртгүүлсэн')
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password)
        await logUserEvent(userCredential.user.uid, email, 'Нэвтэрсэн')
      }
      handleClose()
    } catch (error) {
      setError(
        'Алдаа гарлаа: ' +
          (error instanceof Error
            ? 'Э-мэйл хаяг эсвэл нууц үг буруу байна.'
            : 'Дахин оролдоно уу'),
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

  const handleClose = () => {
    setEmail('')
    setPassword('')
    setError('')
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{isSignUp ? 'Бүртгүүлэх' : 'Нэвтрэх'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Э-мэйл хаяг"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Нууц үг"
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
          {isSignUp ? 'Надад бүртгэл байгаа' : 'Бүртгэл үүсгэх?'}
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={loading}
        >
          {loading
            ? isSignUp
              ? 'Бүртгүүлэх...'
              : 'Нэвтрэх...'
            : isSignUp
              ? 'Бүртгүүлэх'
              : 'Нэвтрэх'}
        </Button>
        <Button onClick={handleClose} color="primary">
          {'Буцах'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
