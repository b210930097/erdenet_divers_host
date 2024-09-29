import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
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
    case 'Сатаарсан':
      return 0
    case 'Сэрүүн':
      return 1
    case 'Зүүрмэглэсэн':
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
    <div style={{ flex: 1, height: '80vh', padding: 20 }}>
      <p>Жолооч: {email}</p>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={transformedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis padding={{ left: 90 }} dataKey="timestamp" />
          <YAxis
            padding={{ top: 10 }}
            domain={[0, 2]}
            tick={({ x, y, payload }) => {
              let label
              switch (payload.value) {
                case 0:
                  label = 'Сатаарсан'
                  break
                case 1:
                  label = 'Сэрүүн'
                  break
                case 2:
                  label = 'Зүүрмэглэсэн'
                  break
                default:
                  label = ''
              }

              return (
                <g transform={`translate(${x + 10},${y})`}>
                  <text x={0} y={0} dy={4} textAnchor="center" fill="#666">
                    {label}
                  </text>
                </g>
              )
            }}
          />

          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="className"
            name="Төлөв"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
