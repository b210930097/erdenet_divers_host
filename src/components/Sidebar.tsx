import React from 'react'
import { Link } from 'react-router-dom'
import { List, ListItem, ListItemText } from '@mui/material'

export const Sidebar: React.FC = () => {
  return (
    <div style={{ width: '250px', background: '#f4f4f4', height: '100vh' }}>
      <List component="nav">
        <ListItem component={Link} to="/">
          <ListItemText primary="Хэрэглэгч" />
        </ListItem>
        <ListItem component={Link} to="/settings">
          <ListItemText primary="Тохиргоо" />
        </ListItem>
        <ListItem component={Link} to="/dashboard">
          <ListItemText primary="Хяналтын самбар" />
        </ListItem>
      </List>
    </div>
  )
}
