import React from 'react'
import { useParams } from 'react-router-dom'

export const Graphic: React.FC = () => {
  const { email } = useParams<{ email: string }>()

  return (
    <div style={{ padding: '20px' }}>
      <h1>Graphic Page</h1>
      <p>Details for email: {email}</p>
    </div>
  )
}
