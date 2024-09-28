import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {
  db,
  onSnapshot,
  collection,
  query,
  orderBy,
  limit,
} from '../config/firebase'
import { format } from 'date-fns'
import { CircularProgress, Typography } from '@mui/material'

const difficultyToYValue = (className: string) => {
  switch (className) {
    case 'Сэрүүн':
      return 0
    case 'Зүүрмэглэсэн':
      return 1
    case 'Distraction':
      return 2
    default:
      return 0
  }
}

export const Graphic: React.FC = () => {
  const { email } = useParams<{ email: string }>()
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(
      collection(db, 'detections'),
      orderBy('timestamp', 'desc'),
      limit(10),
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedData = snapshot.docs
        .map((doc) => {
          const { className, timestamp, userEmail } = doc.data()
          return {
            timestamp,
            className,
            userEmail,
          }
        })
        .filter((item) => item.userEmail === email)

      setData(fetchedData.reverse())
      setLoading(false)
    })

    return () => unsubscribe()
  }, [email])

  const transformedData = data.map((item) => ({
    ...item,
    className: difficultyToYValue(item.className),
    timestamp: format(new Date(item.timestamp), 'yyyy-MM-dd HH:mm:ss'),
  }))

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <CircularProgress />
        <Typography>Уншиж байна...</Typography>
      </div>
    )
  }

  if (transformedData.length === 0) {
    return <p>Хоосон байна</p>
  }

  return (
    <div style={{ padding: '20px' }}>
      <p>Жолооч: {email}</p>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={transformedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis
            domain={[0, 2]}
            tickFormatter={(value) => {
              switch (value) {
                case 0:
                  return 'Сэрүүн'
                case 1:
                  return 'Зүүрмэглэсэн'
                case 2:
                  return 'Сатаарсан'
                default:
                  return ''
              }
            }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="className"
            name="Төлөв"
            stroke="#8884d8"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
