import React, { useEffect, useState } from 'react'
import { Grid, Typography, Paper, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import {
  db,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from '../config/firebase'
import { format } from 'date-fns'

interface UserEvent {
  userId: string
  email: string
  event: 'Бүртгүүлсэн' | 'Нэвтэрсэн'
  timestamp: Date
}

const groupEventsByEmail = (events: UserEvent[]) => {
  return events.reduce(
    (acc, event) => {
      if (!acc[event.email]) {
        acc[event.email] = event
      } else {
        if (event.timestamp > acc[event.email].timestamp) {
          acc[event.email] = event
        }
      }
      return acc
    },
    {} as Record<string, UserEvent>,
  )
}

export const Users: React.FC = () => {
  const [groupedEvents, setGroupedEvents] = useState<Record<string, UserEvent>>(
    {},
  )
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  useEffect(() => {
    const q = query(
      collection(db, 'userInfo'),
      orderBy('timestamp', 'desc'),
      limit(6),
    )

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const events = querySnapshot.docs.map((doc) => {
          const data = doc.data()
          let timestamp: Date

          if (data.timestamp instanceof Date) {
            timestamp = data.timestamp
          } else if (
            data.timestamp &&
            typeof data.timestamp.toDate === 'function'
          ) {
            timestamp = data.timestamp.toDate()
          } else {
            timestamp = new Date(data.timestamp)
          }

          return {
            ...data,
            timestamp,
          } as UserEvent
        })

        const grouped = groupEventsByEmail(events)
        setGroupedEvents(grouped)
        setLoading(false)
      },
      (error) => {
        console.error('Error fetching user events:', error)
        setLoading(false)
      },
    )

    return () => unsubscribe()
  }, [])

  const handleItemClick = (email: string) => {
    navigate(`/graphic/${email}`)
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Жолооч нар</h1>
      <p>Сүүлд нэвтэрсэн жолооч нар</p>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <CircularProgress />
          <Typography>Уншиж байна...</Typography>
        </div>
      ) : Object.keys(groupedEvents).length === 0 ? (
        <Typography variant="h6" style={{ textAlign: 'center', width: '100%' }}>
          {'Хоосон байна.'}
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {Object.entries(groupedEvents).map(([email, event], index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                style={{
                  padding: '20px',
                  marginBottom: '10px',
                  cursor: 'pointer',
                }}
                onClick={() => handleItemClick(email)}
              >
                <Typography variant="h6">{`Э-мэйл:`}</Typography>
                <Typography variant="h6">{email}</Typography>
                <Typography>{`Төрөл: ${event.event}`}</Typography>
                <Typography>{`Хугацаа: ${format(event.timestamp, 'yyyy.MM.dd HH:mm')}`}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  )
}
